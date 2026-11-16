'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ErrorPageProps {
	/** Big display code, e.g. "404" or "500". */
	code: string;
	/** Small mono label above the title. */
	eyebrow: string;
	title: string;
	message: string;
	/** Terminal-style log lines shown in the faux build console. */
	log: string[];
	/** Action buttons / links. */
	children: React.ReactNode;
}

/** Shared, on-brand layout for 404 / error screens. */
const ErrorPage = ({ code, eyebrow, title, message, log, children }: ErrorPageProps) => {
	const reduceMotion = useReducedMotion();

	return (
		<main
			id="main"
			className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-b from-gray-900 to-gray-800 text-white px-4 pt-28 pb-16"
		>
			<div aria-hidden="true" className="absolute inset-0 z-0">
				<div className="absolute top-0 left-0 w-full h-full bg-radial-[ellipse_at_center] from-blue-500/20 via-transparent to-transparent" />
				<div className="absolute bottom-0 right-0 w-full h-full bg-radial-[ellipse_at_center] from-purple-500/20 via-transparent to-transparent" />
			</div>

			<div className="relative z-10 w-full max-w-3xl text-center">
				<motion.p
					initial={reduceMotion ? false : { opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-blue-400 mb-4"
				>
					{eyebrow}
				</motion.p>

				<motion.div
					aria-hidden="true"
					initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
					animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: [0, -8, 0] }}
					transition={
						reduceMotion
							? undefined
							: {
									opacity: { duration: 0.6 },
									scale: { duration: 0.6 },
									y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
								}
					}
					className="select-none text-[clamp(6rem,24vw,14rem)] leading-none font-bold tracking-tighter bg-linear-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent bg-size-[200%] animate-gradient"
				>
					{code}
				</motion.div>

				<motion.h1
					initial={reduceMotion ? false : { opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.15 }}
					className="mt-2 text-2xl sm:text-4xl font-semibold text-gray-100"
				>
					{title}
				</motion.h1>

				<motion.p
					initial={reduceMotion ? false : { opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.25 }}
					className="mt-4 mx-auto max-w-xl text-base sm:text-lg text-gray-400 leading-relaxed"
				>
					{message}
				</motion.p>

				<motion.div
					initial={reduceMotion ? false : { opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.35 }}
					className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
				>
					{children}
				</motion.div>

				<motion.div
					initial={reduceMotion ? false : { opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
					className="mt-12 mx-auto max-w-md text-left rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden"
				>
					<div className="flex items-center gap-2 px-4 py-2 border-b border-white/10" aria-hidden="true">
						<span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
						<span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
						<span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
						<span className="ml-2 font-mono text-[11px] text-gray-500">build.log</span>
					</div>
					<pre className="px-4 py-3 font-mono text-xs sm:text-[13px] leading-6 text-gray-400 whitespace-pre-wrap break-words">
						{log.map((line, i) => (
							<span key={i} className="block">
								<span className="text-gray-600 select-none">$ </span>
								{line}
							</span>
						))}
					</pre>
				</motion.div>
			</div>
		</main>
	);
};

export const primaryActionClass =
	'inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-medium text-onaccent bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-600 shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400';

export const secondaryActionClass =
	'inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-medium bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400';

export default ErrorPage;
