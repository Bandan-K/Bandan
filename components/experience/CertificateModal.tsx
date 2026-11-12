'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Certification } from './data';

interface CertificateModalProps {
	cert: Certification | null;
	onClose: () => void;
}

const isPdf = (file: string) => file.toLowerCase().endsWith('.pdf');

const noopSubscribe = () => () => {};

const CertificateModal = ({ cert, onClose }: CertificateModalProps) => {
	// Only render client-side so we can portal to <body>.
	const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

	useEffect(() => {
		if (!cert) return;
		const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
		document.addEventListener('keydown', onKey);
		// Lock page scroll while the viewer is open.
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = prevOverflow;
		};
	}, [cert, onClose]);

	if (!mounted) return null;

	// Portal to <body> so the modal sits above the fixed nav and later sections,
	// regardless of the stacking context of the section it's used in.
	return createPortal(
		<AnimatePresence>
			{cert && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-200 p-4"
					onClick={onClose}
				>
					<motion.div
						role="dialog"
						aria-modal="true"
						aria-label={cert.name}
						initial={{ scale: 0.95, opacity: 0, y: 20 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.95, opacity: 0, y: 20 }}
						transition={{ type: 'spring', damping: 25, stiffness: 300 }}
						className="bg-gray-900/95 rounded-2xl shadow-2xl max-w-4xl w-full h-[85vh] border border-gray-700/50 flex flex-col overflow-hidden"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="p-4 border-b border-gray-700/50 flex items-center justify-between gap-3">
							<div className="min-w-0">
								<h3 className="text-white font-medium truncate">{cert.name}</h3>
								<p className="text-xs text-gray-500 truncate">
									{[cert.issuer, cert.date].filter(Boolean).join(' · ')}
								</p>
							</div>
							<div className="flex items-center gap-2 shrink-0">
								{cert.verifyUrl && (
									<a
										href={cert.verifyUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="hidden sm:inline-flex px-3 py-2 rounded-lg text-sm font-medium text-blue-400 hover:bg-white/5 transition-colors"
									>
										Verify online ↗
									</a>
								)}
								<a
									href={cert.file}
									target="_blank"
									rel="noopener noreferrer"
									className="px-3 py-2 rounded-lg text-sm font-medium bg-blue-500 hover:bg-blue-600 text-onaccent transition-colors"
								>
									Open
								</a>
								<button
									onClick={onClose}
									aria-label="Close"
									className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
						</div>

						<div className="grow min-h-0 bg-[#1a1a1a] overflow-hidden">
							{isPdf(cert.file) ? (
								<object data={`${cert.file}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`} type="application/pdf" className="w-full h-full">
									<div className="p-8 text-center space-y-4">
										<p className="text-sm text-gray-400">Preview isn&apos;t available in this browser.</p>
										<a
											href={cert.file}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-block px-5 py-2.5 bg-blue-500 text-onaccent rounded-lg font-medium"
										>
											Open certificate
										</a>
									</div>
								</object>
							) : (
								// eslint-disable-next-line @next/next/no-img-element
								<img src={cert.file} alt={`${cert.name} certificate`} className="w-full h-full object-contain" />
							)}
						</div>

						{cert.verifyUrl && (
							<div className="sm:hidden p-3 border-t border-gray-700/50 text-center">
								<a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-400">
									Verify online ↗
								</a>
							</div>
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>,
		document.body
	);
};

export default CertificateModal;
