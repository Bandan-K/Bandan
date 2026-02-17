import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../../lib/services/profile';
import { CATEGORY_STYLES } from './constants';
import { trackEvent } from '../../lib/analytics';

interface SkillModalProps {
    skill: Skill;
    onClose: () => void;
}

const SkillModal = ({ skill, onClose }: SkillModalProps) => {
    const style = CATEGORY_STYLES[skill.category as keyof typeof CATEGORY_STYLES];
    const searchTerms = skill.searchSuffix ? `${skill.name} ${skill.searchSuffix}` : `${skill.name} ${skill.tag}`;
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerms)}`;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 sm:p-6"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-gray-900/90 rounded-2xl p-6 sm:p-8 shadow-2xl max-w-lg w-full border border-gray-700/50 relative overflow-hidden group"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Background Glow */}
                <div className={`absolute -top-32 -right-32 w-64 h-64 opacity-20 rounded-full blur-3xl transition-colors duration-500 ${style.expertiseColor.replace('text', 'bg')}`} />

                <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gray-800/50 ${style.expertiseColor}`}>
                                {style.sectionIcon}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">{skill.name}</h3>
                                <p className={`text-xs uppercase tracking-widest font-bold ${style.expertiseColor}`}>
                                    {style.sectionTitle} • {skill.expertise}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/5 rounded-full transition-colors group/close"
                        >
                            <svg className="w-5 h-5 text-gray-500 group-hover/close:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                        {skill.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <a
                            href={googleSearchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] group/search"
                            onClick={() => trackEvent('skill_search_click', { skill_name: skill.name })}
                        >
                            <img src="/googleIcon.png" alt="Google" className="w-5 h-5 object-contain group-hover:brightness-110" />
                            <span className="font-medium text-white text-sm">Search Tech</span>
                        </a>

                        {skill.docUrl && (
                            <a
                                href={skill.docUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex-1 px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] group/docs bg-opacity-10 hover:bg-opacity-20 border border-opacity-20 ${style.tagBg.split(' ')[0]} ${style.tagBg.split(' ')[2]}`}
                                onClick={() => trackEvent('skill_docs_click', { skill_name: skill.name })}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <span className="font-medium text-white text-sm">Official Docs</span>
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default SkillModal;
