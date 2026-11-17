'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
	children: React.ReactNode;
	className?: string;
	/** Seconds to wait before animating; use index * 0.08 to stagger siblings. */
	delay?: number;
	/** Starting offset in px. */
	y?: number;
}

/** Fades, rises and un-blurs its children as they scroll into view (once), Apple-style. */
const Reveal = ({ children, className, delay = 0, y = 48 }: RevealProps) => {
	const reduce = useReducedMotion();
	if (reduce) return <div className={className}>{children}</div>;
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y, scale: 0.97, filter: 'blur(8px)' }}
			whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
			viewport={{ once: true, margin: '0px 0px -12% 0px' }}
			transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
		>
			{children}
		</motion.div>
	);
};

export default Reveal;
