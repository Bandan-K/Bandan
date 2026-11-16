'use client';

import { useEffect, useRef } from 'react';

/**
 * Soft spotlight that follows the pointer. Only mounts its listener on devices with a
 * fine pointer and no reduced-motion preference, so touch users pay nothing.
 */
const CursorGlow = () => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!canHover || reduce) return;

		let frame = 0;
		let x = 0;
		let y = 0;
		const onMove = (e: PointerEvent) => {
			x = e.clientX;
			y = e.clientY;
			if (frame) return;
			frame = requestAnimationFrame(() => {
				frame = 0;
				el.style.opacity = '1';
				el.style.transform = `translate3d(${x - 250}px, ${y - 250}px, 0)`;
			});
		};
		const onLeave = () => {
			el.style.opacity = '0';
		};

		window.addEventListener('pointermove', onMove, { passive: true });
		document.documentElement.addEventListener('pointerleave', onLeave);
		return () => {
			window.removeEventListener('pointermove', onMove);
			document.documentElement.removeEventListener('pointerleave', onLeave);
			if (frame) cancelAnimationFrame(frame);
		};
	}, []);

	return (
		<div
			ref={ref}
			aria-hidden="true"
			className="pointer-events-none fixed top-0 left-0 z-1 h-125 w-125 rounded-full opacity-0 transition-opacity duration-500 will-change-transform bg-radial from-blue-500/15 via-purple-500/5 to-transparent blur-2xl"
		/>
	);
};

export default CursorGlow;
