'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../lib/analytics';

/**
 * Skill interface designed for easy serialization and future Firebase integration.
 */
interface Skill {
	name: string;
	tag: string;
	expertise: string;
	category: 'core' | 'frameworks' | 'tools';
	description: string;
	docUrl?: string;
	searchSuffix?: string;
}

const skills: Skill[] = [
	// Core Stack
	{
		name: 'Swift',
		tag: 'Language',
		expertise: 'Expert',
		category: 'core',
		description: 'The primary programming language for iOS development. Highly focused on performance, safety, and modern expressive syntax.',
		docUrl: 'https://developer.apple.com/swift/',
		searchSuffix: 'programming language'
	},
	{
		name: 'UIKit',
		tag: 'Traditional UI',
		expertise: 'Expert',
		category: 'core',
		description: 'The foundation of iOS UI development. Extensive experience building complex, performant interfaces using Storyboards and XIBs.',
		docUrl: 'https://developer.apple.com/documentation/uikit',
		searchSuffix: 'ios development'
	},
	{
		name: 'SwiftUI',
		tag: 'Modern UI',
		expertise: 'Expert',
		category: 'core',
		description: "Apple's modern declarative framework. Expert in building state-driven, cross-platform interfaces with fluid animations.",
		docUrl: 'https://developer.apple.com/xcode/swiftui/',
		searchSuffix: 'declarative ui'
	},
	{
		name: 'Xcode',
		tag: 'Environment',
		expertise: 'Expert',
		category: 'core',
		description: 'Proficient in the full suite of Xcode tools, including Instruments, Debugging, and Build System configuration.',
		docUrl: 'https://developer.apple.com/xcode/',
		searchSuffix: 'ide features'
	},

	// Frameworks & Services
	{
		name: 'Google Maps & Places',
		tag: 'APIs',
		expertise: 'Advanced',
		category: 'frameworks',
		description: 'Seamless integration of map views, custom markers, place autocomplete, and complex route optimizations.',
		docUrl: 'https://developers.google.com/maps/documentation/ios-sdk/overview',
		searchSuffix: 'ios sdk'
	},
	{
		name: 'Firebase Analytics',
		tag: 'Analytics',
		expertise: 'Advanced',
		category: 'frameworks',
		description: 'Setting up custom event tracking and user properties to derive actionable insights from user behavior.',
		docUrl: 'https://firebase.google.com/docs/analytics',
		searchSuffix: 'event tracking'
	},
	{
		name: 'Firebase Crashlytics',
		tag: 'Stability',
		expertise: 'Advanced',
		category: 'frameworks',
		description: 'Proactive monitoring and resolution of crashes with detailed stack traces and environmental logs.',
		docUrl: 'https://firebase.google.com/docs/crashlytics',
		searchSuffix: 'error reporting'
	},
	{
		name: 'Core Data / SwiftData',
		tag: 'Persistence',
		expertise: 'Advanced',
		category: 'frameworks',
		description: 'Expertise in both traditional Core Data stacks and the modern, declarative SwiftData for local storage.',
		docUrl: 'https://developer.apple.com/documentation/swiftdata',
		searchSuffix: 'persistence framework'
	},
	{
		name: 'Combine',
		tag: 'Reactive',
		expertise: 'Proficient',
		category: 'frameworks',
		description: 'Handling complex asynchronous data streams and event pipelines using Apple-native reactive patterns.',
		docUrl: 'https://developer.apple.com/documentation/combine',
		searchSuffix: 'reactive programming'
	},
	{
		name: 'REST APIs',
		tag: 'Networking',
		expertise: 'Expert',
		category: 'frameworks',
		description: 'Integration of back-end services with URLSession, optimized caching, and robust error handling patterns.',
		docUrl: 'https://developer.apple.com/documentation/foundation/urlsession',
		searchSuffix: 'ios networking'
	},

	// Tools & Distribution
	{
		name: 'TestFlight',
		tag: 'Beta Testing',
		expertise: 'Expert',
		category: 'tools',
		description: 'Managing end-to-end beta cycles, build distribution, and gathering user feedback for high-quality releases.',
		docUrl: 'https://developer.apple.com/testflight/',
		searchSuffix: 'distribution guide'
	},
	{
		name: 'Git & Version Control',
		tag: 'VCS',
		expertise: 'Expert',
		category: 'tools',
		description: 'Deep knowledge of collaborative workflows, conflict resolution, and maintaining clean commit histories.',
		docUrl: 'https://git-scm.com/',
		searchSuffix: 'best practices'
	},
	{
		name: 'CocoaPods/SPM',
		tag: 'Dependencies',
		expertise: 'Expert',
		category: 'tools',
		description: 'Expert integration and maintenance of third-party libraries and modularized internal frameworks.',
		docUrl: 'https://developer.apple.com/documentation/xcode/swift-packages',
		searchSuffix: 'dependency management'
	},
];

const CATEGORY_STYLES = {
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
};

const SkillCard = ({ skill, onClick }: { skill: Skill, onClick: (skill: Skill) => void }) => {
	const style = CATEGORY_STYLES[skill.category];

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

const SkillModal = ({ skill, onClose }: { skill: Skill, onClose: () => void }) => {
	const style = CATEGORY_STYLES[skill.category];
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

const SkillsSection = () => {
	const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

	const handleSkillClick = (skill: Skill) => {
		setSelectedSkill(skill);
		trackEvent('skill_view', {
			skill_name: skill.name,
			skill_category: skill.category
		});
	};

	const categories: Array<keyof typeof CATEGORY_STYLES> = ['core', 'frameworks', 'tools'];

	return (
		<section className="py-16 md:py-20 relative" id="skills">
			<div className="container mx-auto px-4">
				<h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center">Technical Expertise</h2>
				<p className="text-sm sm:text-base text-gray-400 text-center mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
					Specialized in modern iOS application development technologies and frameworks
				</p>

				<div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
					{categories.map((catKey) => (
						<div key={catKey} className="space-y-6 sm:space-y-8">
							<div className="flex items-center gap-3 border-b border-gray-800/50 pb-4">
								<div className="p-2 rounded-lg bg-gray-800/30">
									{CATEGORY_STYLES[catKey].sectionIcon}
								</div>
								<h3 className="text-xl sm:text-2xl font-bold text-gray-100">
									{CATEGORY_STYLES[catKey].sectionTitle}
								</h3>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
								{skills.filter(s => s.category === catKey).map((skill) => (
									<SkillCard
										key={skill.name}
										skill={skill}
										onClick={handleSkillClick}
									/>
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			<AnimatePresence>
				{selectedSkill && (
					<SkillModal
						skill={selectedSkill}
						onClose={() => setSelectedSkill(null)}
					/>
				)}
			</AnimatePresence>
		</section>
	);
};

export default SkillsSection;
