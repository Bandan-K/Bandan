import React from 'react';

export const CATEGORY_STYLES = {
    core: {
        sectionTitle: 'Core Stack',
        sectionIcon: (
            <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z" />
            </svg>
        ),
        cardBg: 'bg-gray-800/20 hover:border-blue-500/30',
        tagBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        expertiseColor: 'text-blue-400',
    },
    frameworks: {
        sectionTitle: 'Frameworks & Services',
        sectionIcon: (
            <svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,0L3,7L4.63,8.27L12,14L19.36,8.27L21,7L12,0M19.37,10.73L12,16.47L4.62,10.73L3,12L12,19L21,12L19.37,10.73M19.37,15.73L12,21.47L4.62,15.73L3,17L12,24L21,17L19.37,15.73" />
            </svg>
        ),
        cardBg: 'bg-gray-800/30 hover:border-purple-500/50',
        tagBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        expertiseColor: 'text-purple-400',
    },
    tools: {
        sectionTitle: 'Tools & Distribution',
        sectionIcon: (
            <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.7,19L13.6,9.9C14.5,7.6 14,4.9 12.1,3C10.1,1 7.1,0.6 4.7,1.7L9,6L6,9L1.7,4.7C0.6,7.1 1,10.1 3,12.1C4.9,14 7.6,14.5 9.9,13.6L19,22.7L22.7,19Z" />
            </svg>
        ),
        cardBg: 'bg-gray-800/30 hover:border-indigo-500/50',
        tagBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        expertiseColor: 'text-indigo-400',
    }
} as const;

export type CategoryKey = keyof typeof CATEGORY_STYLES;
