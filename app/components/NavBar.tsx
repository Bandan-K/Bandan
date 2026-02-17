'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../lib/analytics';

const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Expertise', href: '#skills' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
];

const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Simple active section detection
            const sections = ['home', 'skills', 'process', 'contact'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (name: string, href: string) => {
        trackEvent('nav_click', { section: name });

        // 1. Close mobile menu first if open
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }

        // 2. Perform scroll after a tiny delay to let the menu closing animation start/finish
        // This prevents the DOM removal of the menu from interrupting the scroll gesture
        setTimeout(() => {
            const id = href.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'py-2 sm:py-4' : 'py-4 sm:py-6'
                }`}
        >
            <div className="container mx-auto px-4">
                <div
                    className={`max-w-4xl mx-auto backdrop-blur-md rounded-2xl border transition-all duration-500 flex items-center justify-between px-6 py-2 sm:py-3 ${isScrolled
                        ? 'bg-gray-900/80 border-white/10 shadow-2xl shadow-black/50'
                        : 'bg-transparent border-transparent'
                        }`}
                >
                    {/* Logo */}
                    <motion.a
                        href="#home"
                        onClick={() => handleNavClick('Home', '#home')}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent cursor-pointer"
                    >
                        Bandan.
                    </motion.a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                onClick={() => handleNavClick(item.name, item.href)}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`text-sm font-medium transition-colors hover:text-blue-400 cursor-pointer ${activeSection === item.href.replace('#', '')
                                    ? 'text-blue-400'
                                    : 'text-gray-400'
                                    }`}
                            >
                                {item.name}
                            </motion.a>
                        ))}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 right-0 md:hidden bg-gray-900/95 backdrop-blur-xl border-b border-white/5 overflow-hidden z-[90]"
                    >
                        <div className="container mx-auto px-8 py-8 flex flex-col gap-6">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => handleNavClick(item.name, item.href)}
                                    className={`text-lg font-semibold transition-colors cursor-pointer ${activeSection === item.href.replace('#', '')
                                        ? 'text-blue-400'
                                        : 'text-gray-300'
                                        }`}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default NavBar;
