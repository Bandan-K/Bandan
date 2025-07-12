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
						className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
					>
						<motion.div
							initial={{ y: 50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: 50, opacity: 0 }}
							className="bg-gray-800 rounded-xl p-6 shadow-lg max-w-sm w-full space-y-4 text-center"
						>
							<h3 className="text-lg font-semibold text-white">Choose how to email me</h3>
							<p className="text-sm text-gray-400">
								Select your preferred method to send an email.
							</p>

							<div className="flex flex-col gap-2">
								<a
									href="mailto:bandan.kmahto@gmail.com"
									className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
									onClick={closeDialog}
								>
									Use Email App
								</a>
								<a
									href="https://mail.google.com/mail/?view=cm&to=bandan.kmahto@gmail.com"
									target="_blank"
									rel="noopener noreferrer"
									className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
									onClick={closeDialog}
								>
									Open Gmail
								</a>
								<button
									onClick={closeDialog}
									className="px-4 py-2 text-gray-400 hover:text-gray-200 text-sm"
								>
									Cancel
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
