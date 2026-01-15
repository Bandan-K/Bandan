'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactButton = () => {
	const [showDialog, setShowDialog] = useState(false);

	const openDialog = () => setShowDialog(true);
	const closeDialog = () => setShowDialog(false);

	return (
		<>
			<button
				onClick={openDialog}
				className="px-8 py-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full font-medium hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
			>
				<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
					<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
					<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
				</svg>
				Get in Touch
			</button>

			{/* Modal */}
			<AnimatePresence>
				{showDialog && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
						onClick={closeDialog}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							transition={{ type: 'spring', damping: 25, stiffness: 300 }}
							className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl max-w-sm w-full border border-gray-700/50 relative overflow-hidden group"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Decorative background glow */}
							<div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors duration-500" />
							<div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500" />

							<div className="relative z-10 space-y-6">
								<div className="space-y-2 text-center">
									<h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
										Let's Connect
									</h3>
									<p className="text-gray-400 text-sm leading-relaxed">
										Choose your preferred way to start a conversation. I'm looking forward to hearing from you!
									</p>
								</div>

								<div className="flex flex-col gap-3">
									<a
										href="mailto:bandan.kmahto@gmail.com"
										className="group/btn flex items-center justify-between px-5 py-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300"
										onClick={closeDialog}
									>
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover/btn:scale-110 transition-transform">
												<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
												</svg>
											</div>
											<div className="text-left">
												<div className="text-white font-medium">Default Mail App</div>
												<div className="text-xs text-gray-500">System preference</div>
											</div>
										</div>
										<svg className="w-5 h-5 text-gray-600 group-hover/btn:text-blue-400 transform group-hover/btn:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
										</svg>
									</a>

									<a
										href="https://mail.google.com/mail/?view=cm&to=bandan.kmahto@gmail.com"
										target="_blank"
										rel="noopener noreferrer"
										className="group/btn flex items-center justify-between px-5 py-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-red-500/50 transition-all duration-300"
										onClick={closeDialog}
									>
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 group-hover/btn:scale-110 transition-transform">
												<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
													<path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.58l-6.545-4.85v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-1.356 1.478-2.194 2.633-1.493L12 10.53l9.367-6.566c1.155-.701 2.633.137 2.633 1.493z" />
												</svg>
											</div>
											<div className="text-left">
												<div className="text-white font-medium">Gmail</div>
												<div className="text-xs text-gray-500">Open in browser</div>
											</div>
										</div>
										<svg className="w-5 h-5 text-gray-600 group-hover/btn:text-red-400 transform group-hover/btn:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
										</svg>
									</a>
								</div>

								<button
									onClick={closeDialog}
									className="w-full py-3 text-gray-500 hover:text-white text-sm font-medium transition-colors"
								>
									Maybe later
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default ContactButton;
