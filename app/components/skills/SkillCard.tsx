import React from 'react';
import { Skill } from '../../lib/services/profile';
import { CATEGORY_STYLES } from './constants';

interface SkillCardProps {
    skill: Skill;
    onClick: (skill: Skill) => void;
}

const SkillCard = ({ skill, onClick }: SkillCardProps) => {
    const style = CATEGORY_STYLES[skill.category as keyof typeof CATEGORY_STYLES];

    return (
        <button
            onClick={() => onClick(skill)}
            className={`group relative text-left w-full backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 transition-all ${style.cardBg} h-full cursor-pointer hover:scale-[1.02] active:scale-[0.98] duration-300`}
        >
            <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
                <div className="flex items-center gap-2 sm:gap-3">
                    <span className="font-semibold text-gray-100">{skill.name}</span>
                    <span className={`px-2 py-0.5 text-[9px] sm:text-[10px] uppercase tracking-wider font-bold rounded-md border ${style.tagBg} whitespace-nowrap`}>
                        {skill.tag}
                    </span>
                </div>
                <span className={`text-xs font-medium transition-colors ${style.expertiseColor} whitespace-nowrap`}>
                    {skill.expertise}
                </span>
            </div>
            {/* Subtle Decorative Background Icon */}
            <div className="absolute -right-2 -bottom-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 z-0">
                <svg className="w-16 h-16 transform rotate-12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z" />
                </svg>
            </div>
        </button>
    );
};

export default SkillCard;
