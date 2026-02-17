import React from 'react';
import { HeroSectionData } from '../../lib/services/profile';

interface HeroStatsProps {
    data: HeroSectionData | null;
    isLoading: boolean;
}

const HeroStats = ({ data, isLoading }: HeroStatsProps) => {
    const stats = [
        {
            label: 'Apps Published',
            value: data?.appsPublished || '**+',
            icon: (
                <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17,1H7A2,2 0 0,0 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3A2,2 0 0,0 17,1M17,19H7V5H17V19M16,13H8V11H16V13M16,9H8V7H16V9M7,24H9V22H7V24M11,24H13V22H11V24M15,24H17V22H15V24" />
                </svg>
            ),
        },
        {
            label: 'Projects Worked On',
            value: data?.projectsWorked || '25+',
            icon: (
                <svg className="w-8 h-8 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.35,10.03C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.03C2.34,8.36 0,10.9 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.03M19,18H6A4,4 0 0,1 2,14C2,11.95 3.53,10.24 5.56,10.03L6.63,9.92L7.13,8.97C8.08,7.14 9.94,6 12,6C14.62,6 16.88,7.86 17.39,10.43L17.69,11.93L19.22,12.04C20.78,12.14 22,13.45 22,15A3,3 0 0,1 19,18M8,13H10.55V16H13.45V13H16L12,9L8,13Z" />
                </svg>
            ),
        },
        {
            label: 'App Rating',
            value: data?.appRating || '4.8',
            icon: (
                <svg className="w-8 h-8 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                </svg>
            ),
        },
        {
            label: 'Years of Experience',
            value: data?.experience || '1+',
            icon: (
                <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
                </svg>
            ),
        },
    ];

    return (
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 px-2">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="group relative bg-gray-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
                >
                    {/* Decorative gradient background */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Content */}
                    <div className="relative z-10 text-center sm:text-left">
                        <div className="mb-2 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300 flex justify-center sm:justify-start">
                            {stat.icon}
                        </div>
                        <div className="space-y-0.5 sm:space-y-1">
                            {isLoading ? (
                                <div className="h-8 sm:h-9 w-16 bg-gray-700/50 rounded-lg animate-shimmer overflow-hidden mx-auto sm:mx-0" />
                            ) : (
                                <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
                                    {stat.value}
                                </div>
                            )}
                            <div className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                {stat.label}
                            </div>
                        </div>
                    </div>

                    {/* Decorative corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-transparent group-hover:border-blue-500/30 rounded-tl-xl transition-colors duration-500"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-transparent group-hover:border-purple-500/30 rounded-br-xl transition-colors duration-500"></div>

                    {/* Hover glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-15 blur-lg transition-opacity duration-500"></div>
                </div>
            ))}
        </div>
    );
};

export default HeroStats;
