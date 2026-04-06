'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ProjectStatus = 'Live' | 'Under Development' | 'Not Published';
type ProjectType = 'major' | 'maintenance' | 'personal';

interface Project {
	id: number;
	title: string;
	subtitle: string;
	description: string;
	pointsLearned: string[];
	tags: string[];
	status: ProjectStatus;
	type: ProjectType;
	appStoreUrl?: string;
}

const projects: Project[] = [
	{
		id: 1,
		title: 'RydeX',
		subtitle: 'Real-time Taxi Ecosystem',
		description: 'A scalable taxi booking app with real-time ride tracking, multilingual support, and seamless driver-passenger communication.',
		pointsLearned: [
			'Implemented real-time WebSocket communication for driver tracking',
			'Integrated Stripe for international payment processing',
			'Optimized app performance to handle 100K+ users simultaneously',
		],
		tags: ['UIKit', 'Swift', 'WebSocket', 'Stripe'],
		status: 'Live',
		type: 'major',
		appStoreUrl: 'https://apps.apple.com/app/rydex',
	},
	{
		id: 2,
		title: 'ServiceX Modernization',
		subtitle: 'Legacy Codebase Refactor',
		description: 'Led the incremental migration and refactoring of a large legacy service booking platform.',
		pointsLearned: [
			'Migrated 40% of legacy Objective-C code to Swift without downtime',
			'Refactored networking layer to use modern Async/Await patterns',
			'Fixed critical memory leaks in the legacy navigation system',
		],
		tags: ['Objective-C', 'Swift', 'Restructuring', 'Core Data'],
		status: 'Live',
		type: 'maintenance',
		appStoreUrl: 'https://apps.apple.com/app/servicex',
	},
	{
		id: 3,
		title: 'FocusFlow',
		subtitle: 'Productivity Timer',
		description: 'A personal exploration into iOS 17 Live Activities and interactive widgets.',
		pointsLearned: [
			'Deep dive into ActivityKit for real-time status updates',
			'Explored SwiftUI animations for a premium timer feel',
		],
		tags: ['SwiftUI', 'ActivityKit', 'Widgets'],
		status: 'Under Development',
		type: 'personal',
	},
];

const AppShowcase = () => {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);

	const renderProjectList = (type: ProjectType) => {
		const filteredProjects = projects.filter((p) => p.type === type);

		return (
			<div className="space-y-4">
				{filteredProjects.map((project) => (
					<div
						key={project.id}
						className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-blue-500/10"
					>
						<div className="flex flex-col md:flex-row justify-between items-start gap-4">
							<div className="flex-grow space-y-2">
								<div className="flex items-center gap-3 flex-wrap">
									<h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
										{project.title}
									</h3>
									<div className="flex gap-2">
										<span className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold ${project.status === 'Live' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
											}`}>
											{project.status}
										</span>
									</div>
								</div>
								<p className="text-sm font-medium text-blue-400/80">{project.subtitle}</p>
								<p className="text-gray-400 text-sm leading-relaxed max-w-3xl">{project.description}</p>

								{/* Tags */}
								<div className="flex flex-wrap gap-2 pt-2">
									{project.tags.map((tag) => (
										<span key={tag} className="text-xs text-gray-500 bg-gray-900/50 px-2 py-1 rounded-md border border-white/5">
											{tag}
										</span>
									))}
								</div>

								{/* Points Learned - Only for major/maintenance */}
								{type !== 'personal' && (
									<div className="pt-4 space-y-2">
										<h4 className="text-xs font-semibold text-gray-300 uppercase tracking-widest">Key Contributions & Learnings</h4>
										<ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
											{project.pointsLearned.map((point, i) => (
												<li key={i} className="flex items-start gap-2 text-xs text-gray-400">
													<span className="text-blue-500 mt-1">•</span>
													{point}
												</li>
											))}
										</ul>
									</div>
								)}
							</div>

							<div className="flex items-center gap-3 self-end md:self-start">
								{project.status === 'Live' && project.appStoreUrl && (
									<a
										href={project.appStoreUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="p-2 bg-gray-800 hover:bg-blue-600 rounded-full transition-colors group/link"
										title="View on App Store"
									>
										<svg className="w-5 h-5 text-gray-400 group-hover/link:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
										</svg>
									</a>
								)}
								{type === 'personal' && (
									<button
										onClick={() => setSelectedProject(project)}
										className="p-2 bg-gray-800 hover:bg-purple-600 rounded-full transition-colors group/btn"
										title="View Details"
									>
										<svg className="w-5 h-5 text-gray-400 group-hover/btn:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
										</svg>
									</button>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		);
	};

	return (
		<section className="py-20 relative overflow-hidden">
			{/* Decorative background */}
			<div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-10" />
			<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] -z-10" />

			<div className="container mx-auto px-4 max-w-6xl">
				<div className="space-y-4 mb-16 text-center">
					<h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent inline-block">
						App Showcase
					</h2>
					<p className="text-gray-400 max-w-2xl mx-auto">
						A curated selection of my professional work and technical experiments, categorized by impact and complexity.
					</p>
				</div>

				{/* Architectural Highlights */}
				<div className="mb-16">
					<div className="flex items-center gap-4 mb-8">
						<div className="h-px flex-grow bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
						<h3 className="text-lg font-bold text-gray-300 uppercase tracking-widest px-4">Architectural Highlights</h3>
						<div className="h-px flex-grow bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
					</div>
					{renderProjectList('major')}
				</div>

				{/* Legacy Evolution */}
				<div className="mb-16">
					<div className="flex items-center gap-4 mb-8">
						<div className="h-px flex-grow bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
						<h3 className="text-lg font-bold text-gray-300 uppercase tracking-widest px-4">Legacy Evolution</h3>
						<div className="h-px flex-grow bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
					</div>
					{renderProjectList('maintenance')}
				</div>

				{/* Creative Lab */}
				<div className="mb-16">
					<div className="flex items-center gap-4 mb-8">
						<div className="h-px flex-grow bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />
						<h3 className="text-lg font-bold text-gray-300 uppercase tracking-widest px-4">Creative Lab</h3>
						<div className="h-px flex-grow bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />
					</div>
					{renderProjectList('personal')}
				</div>
			</div>

			{/* Project Detail Dialog Placeholder */}
			<AnimatePresence>
				{selectedProject && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
						onClick={() => setSelectedProject(null)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							className="bg-gray-900 border border-white/10 p-8 rounded-3xl max-w-2xl w-full relative"
							onClick={(e) => e.stopPropagation()}
						>
							<button
								onClick={() => setSelectedProject(null)}
								className="absolute top-4 right-4 text-gray-500 hover:text-white"
							>
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
							<h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
							<p className="text-blue-400 mb-4">{selectedProject.subtitle}</p>
							<div className="space-y-4 text-gray-400">
								<p>{selectedProject.description}</p>
								<div className="p-4 bg-white/5 rounded-xl border border-white/5">
									<p className="text-sm italic text-gray-500">More detailed project technical breakdown coming soon...</p>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
};

export default AppShowcase;
