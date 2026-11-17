'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin gradient bar at the top of the viewport showing page scroll progress. */
const ScrollProgress = () => {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

	return (
		<motion.div
			aria-hidden="true"
			style={{ scaleX }}
			className="fixed top-0 left-0 right-0 z-110 h-0.5 origin-left bg-linear-to-r from-blue-400 via-purple-500 to-pink-500"
		/>
	);
};

export default ScrollProgress;
