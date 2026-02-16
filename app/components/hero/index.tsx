'use client';

import React, { useEffect, useState } from 'react';
import { HeroSectionData } from '../../lib/services/profile';
import HeroStats from './HeroStats';

interface HeroSectionProps {
    initialData?: HeroSectionData | null;
}

const HeroSection = ({ initialData }: HeroSectionProps) => {
    const [data, setData] = useState<HeroSectionData | null>(initialData || null);
    const [isLoading, setIsLoading] = useState(!initialData);

    useEffect(() => {
        if (initialData) {
            setData(initialData);
            setIsLoading(false);
        }
    }, [initialData]);

    return (
        <section id="home" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-32 pb-16 sm:py-20">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 z-10">
                <div className="text-center mb-8">
                    <span className="text-lg md:text-xl text-gray-400 mb-2 block">Hi, I&apos;m</span>
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 text-transparent bg-clip-text bg-[size:200%] animate-gradient">
                            Bandan Kumar Mahto
                        </span>
                    </h1>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
                        iOS Developer
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
                        Crafting exceptional iOS experiences with
                        <span className="text-purple-400"> Swift</span> using
                        <span className="text-blue-400"> UIKit</span> and
                        <span className="text-blue-400"> SwiftUI</span>
                    </p>
                </div>

                {/* App Store Stats */}
                <HeroStats data={data} isLoading={isLoading} />
            </div>
        </section>
    );
};

export default HeroSection;
