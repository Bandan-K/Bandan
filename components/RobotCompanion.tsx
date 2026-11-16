'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';
import { explain } from '@/lib/jarvis-knowledge';

const W = 84;
const H = 100;
const MARGIN = 8;
const GRAVITY = 0.6; // px per frame² at 60fps
const SLEEP_AFTER_MS = 25000;
const HOVER_DWELL_MS = 380;
const REPEAT_GUARD_MS = 6000;

type Pose = 'idle' | 'wave' | 'spin' | 'jump' | 'dance' | 'sleep' | 'drag' | 'fall';
type Bubble = { title?: string; text: string; extra?: string; side: 'left' | 'right'; below: boolean };

const REACTIONS: { pose: Pose; ms: number; quips: string[] }[] = [
	{ pose: 'wave', ms: 1600, quips: ['At your service. 👋', 'Good to see you!', 'Welcome to the portfolio.'] },
	{ pose: 'jump', ms: 800, quips: ['Boing!', 'Thrusters at 110%.', 'Is this high enough?'] },
	{ pose: 'spin', ms: 900, quips: ['Wheee!', 'Dizzy… but stylish.', 'Running diagnostics. By spinning.'] },
	{ pose: 'dance', ms: 2200, quips: ['Watch these moves 🕺', 'Debugging dance!', 'Shipping to production!'] },
];

const SECTION_QUIPS: Record<string, (act: string) => string> = {
	skills: (act) => `Swift, UIKit, SwiftUI… ${act} a card and I’ll tell you more.`,
	experience: () => 'Years of shipping real apps. Not bad, right?',
	process: () => 'This is how the magic gets built ✨',
	contact: () => 'Psst… go say hi to Bandan! 👋',
};

/** Tiny external stores so saved preferences are hydration-safe. */
const createPref = (key: string) => {
	const event = `${key}-change`;
	return {
		subscribe: (cb: () => void) => {
			window.addEventListener(event, cb);
			window.addEventListener('storage', cb);
			return () => {
				window.removeEventListener(event, cb);
				window.removeEventListener('storage', cb);
			};
		},
		get: () => {
			try {
				return localStorage.getItem(key) === '1';
			} catch {
				return false;
			}
		},
		set: (v: boolean) => {
			try {
				localStorage.setItem(key, v ? '1' : '0');
			} catch {
				/* storage unavailable: preference just won't persist */
			}
			window.dispatchEvent(new Event(event));
		},
	};
};
const hiddenPref = createPref('robot-hidden');
const quietPref = createPref('jarvis-quiet');

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

/** Jarvis: a golden hover-bot that lives on screen. Drag, throw and poke him, or hover/tap the page and he explains it. */
const RobotCompanion = () => {
	const pathname = usePathname();
	const hidden = useSyncExternalStore(hiddenPref.subscribe, hiddenPref.get, () => false);
	const quiet = useSyncExternalStore(quietPref.subscribe, quietPref.get, () => false);

	const [pose, setPoseState] = useState<Pose>('idle');
	const [bubble, setBubble] = useState<Bubble | null>(null);

	const boxRef = useRef<HTMLDivElement>(null);
	const pupilsRef = useRef<SVGGElement>(null);
	const poseRef = useRef<Pose>('idle');
	const quietRef = useRef(false);
	const touchRef = useRef(false);
	const p = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
	const drag = useRef({ active: false, offX: 0, offY: 0, startX: 0, startY: 0, lastX: 0, lastT: 0, lastY: 0, vx: 0, vy: 0, moved: false });
	const raf = useRef(0);
	const clicks = useRef(0);
	const reactionIdx = useRef(0);
	const poseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	const bubbleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	const sleepTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	const reduceMotion = useRef(false);

	useEffect(() => {
		quietRef.current = quiet;
	}, [quiet]);

	const setPose = useCallback((next: Pose) => {
		poseRef.current = next;
		setPoseState(next);
	}, []);

	const floorY = () => window.innerHeight - H - MARGIN;
	const maxX = () => window.innerWidth - W - MARGIN;

	const apply = useCallback(() => {
		const el = boxRef.current;
		if (el) el.style.transform = `translate3d(${p.current.x}px, ${p.current.y}px, 0)`;
	}, []);

	const say = useCallback((text: string, ms = 3600, extra?: { title?: string; note?: string }) => {
		const { x, y } = p.current;
		setBubble({
			title: extra?.title,
			text,
			extra: extra?.note,
			side: x > window.innerWidth / 2 ? 'right' : 'left',
			below: y < 150,
		});
		clearTimeout(bubbleTimer.current);
		bubbleTimer.current = setTimeout(() => setBubble(null), ms);
	}, []);

	const resetSleepTimer = useCallback(() => {
		clearTimeout(sleepTimer.current);
		if (poseRef.current === 'sleep') {
			setPose('idle');
			setBubble(null);
		}
		sleepTimer.current = setTimeout(() => {
			if (poseRef.current === 'idle') {
				setPose('sleep');
				say('zzz…', 4000);
			}
		}, SLEEP_AFTER_MS);
	}, [say, setPose]);

	const playPose = useCallback(
		(next: Pose, ms: number) => {
			clearTimeout(poseTimer.current);
			setPose(next);
			poseTimer.current = setTimeout(() => {
				if (poseRef.current === next) setPose('idle');
			}, ms);
		},
		[setPose],
	);

	// Physics loop: only runs while the robot is airborne or sliding.
	const kick = useCallback(() => {
		cancelAnimationFrame(raf.current);
		let last = performance.now();
		const step = (t: number) => {
			const dt = Math.min((t - last) / 16.67, 3);
			last = t;
			const s = p.current;
			s.vy += GRAVITY * dt;
			s.x += s.vx * dt;
			s.y += s.vy * dt;

			if (s.x < 0) {
				s.x = 0;
				s.vx *= -0.6;
			} else if (s.x > maxX()) {
				s.x = maxX();
				s.vx *= -0.6;
			}
			if (s.y < 0) {
				s.y = 0;
				s.vy *= -0.4;
			}
			const floor = floorY();
			if (s.y >= floor) {
				s.y = floor;
				if (Math.abs(s.vy) > 2.5) s.vy *= -0.45;
				else s.vy = 0;
				s.vx *= 0.85;
				if (Math.abs(s.vx) < 0.15) s.vx = 0;
			}
			apply();

			if (s.y >= floor && s.vy === 0 && s.vx === 0) {
				if (poseRef.current === 'fall') setPose('idle');
				return;
			}
			raf.current = requestAnimationFrame(step);
		};
		raf.current = requestAnimationFrame(step);
	}, [apply, setPose]);

	const react = useCallback(() => {
		clicks.current += 1;
		const n = clicks.current;
		const r = REACTIONS[reactionIdx.current++ % REACTIONS.length];
		playPose(r.pose, r.ms);
		if (n === 5) say("Okay, I'm awake. Please stop poking the AI. 😅");
		else if (n === 10) say('Careful, those are gold plates.');
		else if (n === 15) say('🏆 Achievement unlocked: Professional Poker');
		else say(pick(r.quips));
		trackEvent('robot_interaction', { action: 'poke', count: n });
	}, [playPose, say]);

	// Placement, eye tracking, resize, idle sleep, greeting, and hover/tap explanations.
	useEffect(() => {
		if (hidden) return;
		reduceMotion.current = matchMedia('(prefers-reduced-motion: reduce)').matches;
		touchRef.current = matchMedia('(hover: none)').matches;

		p.current = { x: maxX(), y: floorY(), vx: 0, vy: 0 };
		apply();
		if (boxRef.current) boxRef.current.style.opacity = '1';

		let hoverTimer: ReturnType<typeof setTimeout> | undefined;
		let lastEl: Element | null = null;
		let hoverShown = false;
		let lastKey = '';
		let lastAt = 0;

		const describe = (el: Element) => {
			if (quietRef.current || drag.current.active) return;
			const key = el.getAttribute('data-jarvis');
			if (!key) return;
			const now = Date.now();
			if (key === lastKey && now - lastAt < REPEAT_GUARD_MS) return;
			const info = explain(key, el.getAttribute('data-jarvis-text'), el.getAttribute('data-jarvis-title'));
			if (!info) return;
			lastKey = key;
			lastAt = now;
			if (poseRef.current === 'sleep') setPose('idle');
			const len = info.text.length + (info.extra?.length ?? 0);
			say(info.text, clamp(3200 + len * 45, 4500, 14000), { title: info.title, note: info.extra });
			trackEvent('robot_interaction', { action: 'explain', key });
		};

		const targetOf = (e: Event) => {
			const t = e.target as Element | null;
			if (!t || !('closest' in t) || t.closest('[data-robot]')) return null;
			return t.closest('[data-jarvis]');
		};

		const onOver = (e: PointerEvent) => {
			if (e.pointerType !== 'mouse') return;
			clearTimeout(hoverTimer);
			// Moving onto Jarvis himself keeps the bubble so it can be read.
			if ((e.target as Element | null)?.closest?.('[data-robot]')) return;
			const el = targetOf(e);
			if (el && el === lastEl) return;
			// Left the hovered element: dismiss its explanation.
			if (lastEl) {
				lastEl = null;
				lastKey = '';
				if (hoverShown) {
					hoverShown = false;
					clearTimeout(bubbleTimer.current);
					setBubble(null);
				}
			}
			if (!el) return;
			hoverTimer = setTimeout(() => {
				lastEl = el;
				hoverShown = true;
				describe(el);
			}, HOVER_DWELL_MS);
		};

		// Touch devices have no hover, so a tap on something explains it (the tap itself still works).
		const onTap = (e: MouseEvent) => {
			if (!touchRef.current) return;
			const el = targetOf(e);
			if (el) describe(el);
		};

		const onMove = (e: PointerEvent) => {
			resetSleepTimer();
			const el = boxRef.current;
			const pupils = pupilsRef.current;
			if (!el || !pupils || poseRef.current === 'sleep') return;
			const cx = p.current.x + W / 2;
			const cy = p.current.y + 33;
			const dx = e.clientX - cx;
			const dy = e.clientY - cy;
			const dist = Math.hypot(dx, dy) || 1;
			const k = Math.min(dist / 120, 1) * 3.2;
			pupils.style.transform = `translate(${(dx / dist) * k}px, ${(dy / dist) * k}px)`;
		};
		const onActivity = () => resetSleepTimer();
		const onResize = () => {
			p.current.x = clamp(p.current.x, 0, maxX());
			p.current.y = Math.min(p.current.y, floorY());
			apply();
			if (!reduceMotion.current) kick();
		};

		window.addEventListener('pointermove', onMove, { passive: true });
		window.addEventListener('pointerover', onOver, { passive: true });
		window.addEventListener('click', onTap, { passive: true });
		window.addEventListener('scroll', onActivity, { passive: true });
		window.addEventListener('keydown', onActivity);
		window.addEventListener('resize', onResize);
		resetSleepTimer();

		let greeted = false;
		try {
			greeted = sessionStorage.getItem('robot-greeted') === '1';
			sessionStorage.setItem('robot-greeted', '1');
		} catch {
			/* ignore */
		}
		const greet = greeted
			? undefined
			: setTimeout(() => {
					playPose('wave', 1600);
					say(
						touchRef.current
							? 'Tap anything on the page and I’ll explain it. Drag me around, too!'
							: 'Hover over anything and I’ll explain it. Drag, throw or poke me, too!',
						6000,
						{ title: 'Good day. I’m Jarvis' },
					);
				}, 2500);

		return () => {
			window.removeEventListener('pointermove', onMove);
			window.removeEventListener('pointerover', onOver);
			window.removeEventListener('click', onTap);
			window.removeEventListener('scroll', onActivity);
			window.removeEventListener('keydown', onActivity);
			window.removeEventListener('resize', onResize);
			clearTimeout(greet);
			clearTimeout(hoverTimer);
			clearTimeout(sleepTimer.current);
			clearTimeout(poseTimer.current);
			clearTimeout(bubbleTimer.current);
			cancelAnimationFrame(raf.current);
		};
	}, [hidden, apply, kick, playPose, resetSleepTimer, say, setPose]);

	// Comment on each section the first time it scrolls into view (home page only).
	useEffect(() => {
		if (hidden || pathname !== '/') return;
		const seen = new Set<string>();
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					const id = e.target.id;
					if (!e.isIntersecting || seen.has(id) || drag.current.active || quietRef.current) continue;
					seen.add(id);
					if (poseRef.current === 'sleep') setPose('idle');
					say(SECTION_QUIPS[id](touchRef.current ? 'Tap' : 'Hover over'));
					playPose('jump', 800);
				}
			},
			{ threshold: 0.5 },
		);
		for (const id of Object.keys(SECTION_QUIPS)) {
			const el = document.getElementById(id);
			if (el) io.observe(el);
		}
		return () => io.disconnect();
	}, [hidden, pathname, playPose, say, setPose]);

	// Drag + throw
	const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
		e.currentTarget.setPointerCapture(e.pointerId);
		cancelAnimationFrame(raf.current);
		clearTimeout(poseTimer.current);
		const d = drag.current;
		d.active = true;
		d.moved = false;
		d.offX = e.clientX - p.current.x;
		d.offY = e.clientY - p.current.y;
		d.startX = e.clientX;
		d.startY = e.clientY;
		d.lastX = e.clientX;
		d.lastY = e.clientY;
		d.lastT = performance.now();
		d.vx = 0;
		d.vy = 0;
		p.current.vx = 0;
		p.current.vy = 0;
	};

	const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
		const d = drag.current;
		if (!d.active) return;
		if (!d.moved && Math.hypot(e.clientX - d.startX, e.clientY - d.startY) > 5) {
			d.moved = true;
			setPose('drag');
			setBubble(null);
		}
		if (!d.moved) return;
		const now = performance.now();
		const dt = Math.max((now - d.lastT) / 16.67, 0.5);
		d.vx = d.vx * 0.6 + ((e.clientX - d.lastX) / dt) * 0.4;
		d.vy = d.vy * 0.6 + ((e.clientY - d.lastY) / dt) * 0.4;
		d.lastX = e.clientX;
		d.lastY = e.clientY;
		d.lastT = now;
		p.current.x = clamp(e.clientX - d.offX, 0, maxX());
		p.current.y = clamp(e.clientY - d.offY, 0, floorY());
		apply();
	};

	const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
		const d = drag.current;
		if (!d.active) return;
		d.active = false;
		if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
		resetSleepTimer();
		if (!d.moved) {
			react();
			return;
		}
		// Ignore stale velocity if the pointer paused before release.
		const stale = performance.now() - d.lastT > 80;
		if (reduceMotion.current) {
			setPose('idle');
			return;
		}
		p.current.vx = stale ? 0 : clamp(d.vx, -35, 35);
		p.current.vy = stale ? 0 : clamp(d.vy, -35, 35);
		setPose('fall');
		say(pick(['Wheee!', 'Whoa!', 'Put me down gently!', 'I believe I can fly!']), 2200);
		trackEvent('robot_interaction', { action: 'throw' });
		kick();
	};

	const toggleQuiet = () => {
		const next = !quiet;
		quietPref.set(next);
		trackEvent('robot_interaction', { action: next ? 'mute' : 'unmute' });
		if (next) setBubble(null);
		else say(`Commentary on. ${touchRef.current ? 'Tap' : 'Hover over'} anything.`, 2800);
	};

	const happy = pose === 'dance' || pose === 'wave' || pose === 'jump' || pose === 'spin';
	const wide = pose === 'fall' || pose === 'drag';

	if (hidden) {
		return (
			<button
				type="button"
				onClick={() => hiddenPref.set(false)}
				aria-label="Bring back Jarvis"
				className="fixed bottom-3 right-3 z-90 h-10 w-10 rounded-full border border-yellow-500/30 bg-gray-800/80 text-lg backdrop-blur-md opacity-70 hover:opacity-100 transition-opacity"
			>
				🤖
			</button>
		);
	}

	return (
		<div
			ref={boxRef}
			data-robot
			className="group/robot fixed top-0 left-0 z-90 opacity-0 transition-opacity duration-500"
			style={{ width: W, height: H, willChange: 'transform' }}
		>
			<div
				aria-hidden="true"
				className="robot-halo pointer-events-none absolute -inset-4 rounded-full"
				style={{
					background:
						'radial-gradient(closest-side, rgb(var(--blue-400) / 0.3), rgb(var(--purple-400) / 0.12) 60%, transparent)',
				}}
			/>
			{bubble && (
				<div
					role="status"
					className={`robot-pop pointer-events-none absolute w-max max-w-64 rounded-2xl border border-yellow-500/30 bg-gray-800/90 px-3.5 py-2.5 text-xs leading-snug text-white shadow-2xl backdrop-blur-md sm:text-sm ${
						bubble.side === 'right' ? 'right-0' : 'left-0'
					} ${bubble.below ? 'top-full mt-3' : 'bottom-full mb-3'}`}
				>
					{bubble.title && (
						<p className="mb-1 bg-linear-to-r from-yellow-400 to-amber-500 bg-clip-text text-[10px] font-bold uppercase tracking-widest text-transparent">
							{bubble.title}
						</p>
					)}
					<p className="font-medium">{bubble.text}</p>
					{bubble.extra && (
						<p className="mt-1.5 border-t border-white/10 pt-1.5 text-[11px] italic text-purple-300 sm:text-xs">
							{bubble.extra}
						</p>
					)}
					<span
						aria-hidden="true"
						className={`absolute h-2.5 w-2.5 rotate-45 border-yellow-500/30 bg-gray-800 ${bubble.side === 'right' ? 'right-9' : 'left-9'} ${
							bubble.below ? '-top-[5px] border-t border-l' : '-bottom-[5px] border-r border-b'
						}`}
					/>
				</div>
			)}

			<button
				type="button"
				aria-label="Jarvis the robot. Drag, throw or click to play."
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
				onPointerCancel={onPointerUp}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						react();
					}
				}}
				className="block h-full w-full cursor-grab active:cursor-grabbing touch-none select-none rounded-2xl"
			>
				<svg viewBox="0 0 84 100" width={W} height={H} className={`robot robot-${pose} overflow-visible`} aria-hidden="true">
					<defs>
						{/* Gold, lit from the top left so it reads as a rounded, metallic solid */}
						<radialGradient id="rb-gold" cx="0.3" cy="0.2" r="1">
							<stop offset="0" stopColor="#fff7cf" />
							<stop offset="0.22" stopColor="#f9d95c" />
							<stop offset="0.5" stopColor="#d9a21b" />
							<stop offset="0.8" stopColor="#8f5d0c" />
							<stop offset="1" stopColor="#5a3607" />
						</radialGradient>
						<linearGradient id="rb-gold-flat" x1="0.1" y1="0" x2="0.9" y2="1">
							<stop offset="0" stopColor="#fde58a" />
							<stop offset="0.45" stopColor="#d9a21b" />
							<stop offset="1" stopColor="#7a4d0a" />
						</linearGradient>
						<linearGradient id="rb-shade" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0.55" stopColor="#2a1500" stopOpacity="0" />
							<stop offset="1" stopColor="#2a1500" stopOpacity="0.5" />
						</linearGradient>
						<linearGradient id="rb-rim" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0" stopColor="#93c5fd" />
							<stop offset="1" stopColor="#c084fc" />
						</linearGradient>
						<linearGradient id="rb-accent" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0" stopColor="#60a5fa" />
							<stop offset="1" stopColor="#a855f7" />
						</linearGradient>
						<linearGradient id="rb-visor" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0" stopColor="#26215c" />
							<stop offset="0.5" stopColor="#0f1233" />
							<stop offset="1" stopColor="#04051a" />
						</linearGradient>
						<radialGradient id="rb-visor-glow" cx="0.5" cy="1" r="0.9">
							<stop offset="0" stopColor="#8b5cf6" stopOpacity="0.45" />
							<stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
						</radialGradient>
						<linearGradient id="rb-eye" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0" stopColor="#cffafe" />
							<stop offset="1" stopColor="#818cf8" />
						</linearGradient>
						<radialGradient id="rb-orb" cx="0.5" cy="0.5" r="0.5">
							<stop offset="0" stopColor="#ffffff" />
							<stop offset="0.4" stopColor="#67e8f9" />
							<stop offset="1" stopColor="#3b82f6" />
						</radialGradient>
						<radialGradient id="rb-thrust" cx="0.5" cy="0.4" r="0.5">
							<stop offset="0" stopColor="#c7d2fe" stopOpacity="0.95" />
							<stop offset="0.5" stopColor="#818cf8" stopOpacity="0.5" />
							<stop offset="1" stopColor="#a855f7" stopOpacity="0" />
						</radialGradient>
						<linearGradient id="rb-sheen" x1="0" y1="0" x2="1" y2="0">
							<stop offset="0" stopColor="#fff" stopOpacity="0" />
							<stop offset="0.5" stopColor="#fff" stopOpacity="0.7" />
							<stop offset="1" stopColor="#fff" stopOpacity="0" />
						</linearGradient>
						<clipPath id="rb-head-clip">
							<rect x="9" y="7" width="66" height="51" rx="23" />
						</clipPath>
						<filter id="rb-glow" x="-60%" y="-60%" width="220%" height="220%">
							<feGaussianBlur stdDeviation="1.7" result="b" />
							<feMerge>
								<feMergeNode in="b" />
								<feMergeNode in="SourceGraphic" />
							</feMerge>
						</filter>
					</defs>

					<ellipse className="robot-shadow" cx="42" cy="96" rx="18" ry="2.6" fill="#000" opacity="0.25" />

					<g className="robot-body">
						<ellipse className="robot-thrust" cx="42" cy="89" rx="12" ry="8" fill="url(#rb-thrust)" />

						{/* floating arms */}
						<g className="robot-arm-l">
							<rect x="8" y="60" width="9" height="19" rx="4.5" fill="url(#rb-gold-flat)" stroke="url(#rb-rim)" strokeWidth="0.7" />
							<rect x="9.8" y="62.5" width="2" height="9" rx="1" fill="#fff" opacity="0.5" />
							<rect x="8" y="64" width="9" height="2.4" fill="url(#rb-accent)" />
						</g>
						<g className="robot-arm-r">
							<rect x="67" y="60" width="9" height="19" rx="4.5" fill="url(#rb-gold-flat)" stroke="url(#rb-rim)" strokeWidth="0.7" />
							<rect x="68.8" y="62.5" width="2" height="9" rx="1" fill="#fff" opacity="0.5" />
							<rect x="67" y="64" width="9" height="2.4" fill="url(#rb-accent)" />
						</g>

						{/* torso */}
						<path d="M27 62q0-4 5-4h20q5 0 5 4v10q0 13-15 15-15-2-15-15z" fill="url(#rb-gold)" stroke="url(#rb-rim)" strokeWidth="0.7" />
						<path d="M27 62q0-4 5-4h20q5 0 5 4v10q0 13-15 15-15-2-15-15z" fill="url(#rb-shade)" />
						<path d="M31 62q1-2 4-2" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.7" />
						{/* arc reactor */}
						<circle cx="42" cy="70" r="6" fill="#0f1233" stroke="#fde58a" strokeWidth="1.2" />
						<circle className="robot-chest" cx="42" cy="70" r="3.6" fill="url(#rb-orb)" filter="url(#rb-glow)" />

						{/* neck */}
						<rect x="31" y="55" width="22" height="5" rx="2.5" fill="#1b1850" stroke="url(#rb-rim)" strokeWidth="0.7" />

						{/* ear pods */}
						<rect x="4" y="26" width="8" height="17" rx="4" fill="url(#rb-gold-flat)" stroke="url(#rb-rim)" strokeWidth="0.7" />
						<rect x="6.6" y="30" width="2.8" height="9" rx="1.4" fill="url(#rb-accent)" filter="url(#rb-glow)" />
						<rect x="72" y="26" width="8" height="17" rx="4" fill="url(#rb-gold-flat)" stroke="url(#rb-rim)" strokeWidth="0.7" />
						<rect x="74.6" y="30" width="2.8" height="9" rx="1.4" fill="url(#rb-accent)" filter="url(#rb-glow)" />

						{/* head shell: a gradient for form, a shade for depth, a gloss and a moving sheen for life */}
						<rect x="9" y="7" width="66" height="51" rx="23" fill="url(#rb-gold)" stroke="url(#rb-rim)" strokeWidth="0.9" />
						<rect x="9" y="7" width="66" height="51" rx="23" fill="url(#rb-shade)" />
						<path d="M20 13.5q22-7 44 0" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.8" />
						<circle cx="17" cy="17" r="1.6" fill="#fff" opacity="0.85" />
						<g clipPath="url(#rb-head-clip)">
							<rect className="robot-sheen" x="-30" y="0" width="20" height="70" fill="url(#rb-sheen)" />
						</g>

						{/* visor in a recessed gold bezel */}
						<rect x="13.5" y="15.5" width="57" height="37" rx="17.5" fill="#6b430a" opacity="0.55" />
						<rect x="15" y="17" width="54" height="34" rx="16" fill="url(#rb-visor)" stroke="#fde58a" strokeOpacity="0.5" strokeWidth="0.8" />
						<rect x="15" y="17" width="54" height="34" rx="16" fill="url(#rb-visor-glow)" />
						<path d="M23 23q19-6 38 0" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.16" />

						{/* face */}
						{pose === 'sleep' ? (
							<g stroke="#a5b4fc" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#rb-glow)" opacity="0.8">
								<path d="M26 35h10M48 35h10" />
							</g>
						) : happy ? (
							<g stroke="#a5f3fc" strokeWidth="3.2" strokeLinecap="round" fill="none" filter="url(#rb-glow)">
								<path d="M26 37q5-9 10 0M48 37q5-9 10 0" />
							</g>
						) : (
							<g className="robot-eyes" filter="url(#rb-glow)">
								<g ref={pupilsRef} className="robot-pupils" fill="url(#rb-eye)">
									{wide ? (
										<>
											<rect x="26.5" y="24" width="9" height="18" rx="4.5" />
											<rect x="48.5" y="24" width="9" height="18" rx="4.5" />
										</>
									) : (
										<>
											<rect x="27.5" y="26" width="7" height="14" rx="3.5" />
											<rect x="49.5" y="26" width="7" height="14" rx="3.5" />
										</>
									)}
								</g>
							</g>
						)}
						<ellipse cx="22" cy="43" rx="3.4" ry="2" fill="#c084fc" opacity="0.35" />
						<ellipse cx="62" cy="43" rx="3.4" ry="2" fill="#c084fc" opacity="0.35" />
					</g>
					{pose === 'sleep' && (
						<text className="robot-zzz" x="66" y="12" fontSize="11" fontWeight="700" fill="#fde58a">
							z
						</text>
					)}
				</svg>
			</button>

			<button
				type="button"
				onClick={toggleQuiet}
				aria-pressed={!quiet}
				aria-label={quiet ? 'Turn Jarvis commentary on' : 'Turn Jarvis commentary off'}
				title={quiet ? 'Commentary off' : 'Commentary on'}
				className="absolute -top-2 -left-2 h-5 w-5 rounded-full border border-white/10 bg-gray-800 text-[10px] leading-none text-gray-400 opacity-0 transition-opacity hover:text-white focus-visible:opacity-100 group-hover/robot:opacity-100 pointer-coarse:opacity-70"
			>
				{quiet ? '🔕' : '💬'}
			</button>
			<button
				type="button"
				onClick={() => {
					hiddenPref.set(true);
					trackEvent('robot_interaction', { action: 'hide' });
				}}
				aria-label="Hide Jarvis"
				className="absolute -top-2 -right-2 h-5 w-5 rounded-full border border-white/10 bg-gray-800 text-[10px] leading-none text-gray-400 opacity-0 transition-opacity hover:text-white focus-visible:opacity-100 group-hover/robot:opacity-100 pointer-coarse:opacity-70"
			>
				✕
			</button>
		</div>
	);
};

export default RobotCompanion;
