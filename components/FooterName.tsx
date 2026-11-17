'use client';

import { useRef } from 'react';

/** The oversized footer name. A brighter blue/purple copy is revealed under the cursor like a spotlight. */
const FooterName = () => {
	const ref = useRef<HTMLDivElement>(null);

	const onMove = (e: React.PointerEvent) => {
		const el = ref.current;
		if (!el || e.pointerType !== 'mouse') return;
		const r = el.getBoundingClientRect();
		el.style.setProperty('--mx', `${e.clientX - r.left}px`);
		el.style.setProperty('--my', `${e.clientY - r.top}px`);
		el.style.setProperty('--spot', '1');
	};

	return (
		<div
			ref={ref}
			aria-hidden="true"
			onPointerMove={onMove}
			onPointerLeave={() => ref.current?.style.setProperty('--spot', '0')}
			className="relative select-none text-center font-bold tracking-tighter leading-none whitespace-nowrap"
			style={{ containerType: 'inline-size' }}
		>
			<div className="text-[length:clamp(2rem,13cqw,10rem)] bg-linear-to-b from-gray-300/40 to-transparent bg-clip-text text-transparent">
				Bandan Mahto
			</div>
			<div
				className="absolute inset-0 text-[length:clamp(2rem,13cqw,10rem)] bg-linear-to-b from-blue-400 via-purple-500 to-transparent bg-clip-text text-transparent transition-opacity duration-500"
				style={{
					opacity: 'var(--spot, 0)',
					maskImage: 'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), #000, transparent 70%)',
					WebkitMaskImage: 'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), #000, transparent 70%)',
				}}
			>
				Bandan Mahto
			</div>
		</div>
	);
};

export default FooterName;
