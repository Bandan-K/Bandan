'use client';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
    resumeUrl: string;
}

const ResumeModal = ({ isOpen, onClose, resumeUrl }: ResumeModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="bg-gray-900/95 rounded-2xl shadow-2xl max-w-4xl w-full h-[85vh] border border-gray-700/50 flex flex-col overflow-hidden relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-gray-700/50 flex items-center justify-between bg-gray-900/50 backdrop-blur-sm relative z-20">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-white font-medium truncate">Resume Preview</h3>
                                    <p className="text-xs text-gray-500 truncate">Bandan_Kumar_Mahto_Resume.pdf</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <a
                                    href={resumeUrl}
                                    download
                                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    <span>Download</span>
                                </a>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-grow bg-[#1a1a1a] overflow-hidden relative group">
                            {/* Decorative glow */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <object
                                data={`${resumeUrl}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                                type="application/pdf"
                                className="w-full h-full"
                            >
                                <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-6">
                                    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center text-gray-500 mb-2">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-white font-medium">Preview not available</p>
                                        <p className="text-sm text-gray-400 max-w-xs mx-auto">
                                            Please use the button below to view or download my resume.
                                        </p>
                                    </div>
                                    <a
                                        href={resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-medium"
                                    >
                                        Open Resume
                                    </a>
                                </div>
                            </object>

                            {/* Mobile indication overlay */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none sm:hidden">
                                <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-[10px] text-gray-400 border border-white/5 uppercase tracking-widest font-semibold">
                                    Tap to scroll preview
                                </div>
                            </div>
                        </div>

                        {/* Footer mobile (Safe fallback button) */}
                        <div className="sm:hidden p-4 border-t border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
                            <a
                                href={resumeUrl}
                                download
                                className="w-full flex items-center justify-center gap-2 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all font-semibold shadow-lg shadow-blue-500/20"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download Resume
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ResumeModal;
