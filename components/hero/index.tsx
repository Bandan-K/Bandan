'use client';

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Reveal from '@/components/Reveal';
import { HeroSectionData } from '@/lib/services/profile';
import HeroStats from './HeroStats';

interface HeroSectionProps {
    initialData?: HeroSectionData | null;
    /** Calculated from the experience timeline; overrides any stored value. */
    experience: string;
}

const HeroSection = ({ initialData, experience }: HeroSectionProps) => {
    const ref = useRef<HTMLElement>(null);
    const reduce = useReducedMotion();
    // As the hero scrolls away its content recedes: shrinks, drifts up and fades (Apple-style).
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
    const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
    const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);

    return (
        <section ref={ref} id="home" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
            <motion.div style={reduce ? undefined : { y: bgY }} className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-radial-[ellipse_at_center] from-blue-500/20 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-full h-full bg-radial-[ellipse_at_center] from-purple-500/20 via-transparent to-transparent"></div>
            </motion.div>

            <motion.div style={reduce ? undefined : { opacity, scale, y }} className="container mx-auto px-4 z-10">
                <Reveal y={36} className="text-center mb-8">
                <div>
                    <span className="text-lg md:text-xl text-gray-400 mb-2 block">Hi, I&apos;m</span>
                    <h1 data-jarvis="hero:name" className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4">
                        <span className="bg-linear-to-r from-blue-400 via-purple-500 to-blue-400 text-transparent bg-clip-text bg-size-[200%] animate-gradient">
                            Bandan Kumar Mahto
                        </span>
                    </h1>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 bg-clip-text text-transparent bg-linear-to-r from-gray-100 to-gray-300">
                        iOS Developer
                    </h2>
                    <p data-jarvis="hero:tagline" className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
                        Crafting exceptional iOS experiences with
                        <span className="text-purple-400"> Swift</span> using
                        <span className="text-blue-400"> UIKit</span> and
                        <span className="text-blue-400"> SwiftUI</span>
                    </p>
                </div>
                </Reveal>

                {/* App Store Stats */}
                <HeroStats data={{ ...initialData, experience }} isLoading={false} />
            </motion.div>
        </section>
    );
};

export default HeroSection;
