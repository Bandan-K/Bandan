'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';
import ThemeToggle from '@/components/ThemeToggle';

const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Expertise', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
];

const NavBar = () => {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const [activeSection, setActiveSection] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (!isHomePage) return;

        const handleScroll = () => {
            // Simple active section detection
            const sections = ['home', 'skills', 'experience', 'process', 'contact'];
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

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage]);

    const handleNavClick = (name: string, href: string) => {
        if (!isHomePage) return;

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
            aria-label="Primary"
            className="fixed inset-x-0 top-0 z-100 border-b border-portfolio-rule bg-gray-900"
        >
            <div className="portfolio-shell">
                <div className="flex min-h-16 items-center justify-between gap-3">
                    {/* Logo */}
                    <Link
                        href="/"
                        onClick={() => {
                            if (isHomePage) {
                                handleNavClick('Home', '#home');
                            }
                        }}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <Image src="/logo-light.png" alt="" width={36} height={36} priority className="logo-mark h-9 w-9 object-contain" />
                        <span className="text-lg font-semibold tracking-tight">
                            Bandan.
                        </span>
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-4">
                    {/* Desktop Nav */}
                    {isHomePage && (
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                data-jarvis="nav:link"
                                onClick={() => handleNavClick(item.name, item.href)}
                                aria-current={activeSection === item.href.replace('#', '') ? 'true' : undefined}
                                className={`text-sm font-medium transition-colors hover:text-portfolio-accent cursor-pointer ${activeSection === item.href.replace('#', '')
                                    ? 'text-portfolio-accent'
                                    : 'text-gray-400'
                                    }`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                    )}

                    <ThemeToggle />
                    {/* Mobile Menu Toggle */}
                    {isHomePage && (
                    <button
                        className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMobileMenuOpen}
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
                    )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isHomePage && isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 right-0 md:hidden bg-gray-900 border-b border-portfolio-rule overflow-hidden z-90"
                    >
                        <div className="container mx-auto px-8 py-8 flex flex-col gap-6">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => handleNavClick(item.name, item.href)}
                                    className={`text-lg font-semibold transition-colors cursor-pointer ${activeSection === item.href.replace('#', '')
                                        ? 'text-portfolio-accent'
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
