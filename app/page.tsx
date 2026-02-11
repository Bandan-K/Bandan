'use client';

import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import AppShowcase from './components/AppShowcase';
import DevelopmentProcess from './components/DevelopmentProcess';
import ContactSection from './components/ContactSection';

export default function MobileDevPortfolio() {
	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-x-hidden">
			<HeroSection />
			<SkillsSection />
			{/* <AppShowcase /> */}
			<DevelopmentProcess />
			<ContactSection />
		</main>
	);
}
