'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from '@/components/Reveal';
import { EXPERIENCE, EDUCATION, CERTIFICATIONS, type Certification } from './data';
import CertificateModal from './CertificateModal';
import { formatDuration, formatPeriod, monthsInRange, totalMonths } from '@/lib/experience';

interface ExperienceSectionProps {
	/** ISO timestamp supplied by the server so server and client render the same durations. */
	asOf: string;
}

const ExperienceSection = ({ asOf }: ExperienceSectionProps) => {
	const [openCert, setOpenCert] = useState<Certification | null>(null);
	const now = new Date(asOf);
	const total = formatDuration(totalMonths(EXPERIENCE.map((e) => e.range), now));

	return (
		<section id="experience" className="py-16 md:py-20 relative">
			<div className="container mx-auto px-4">
				<Reveal>
					<h2 data-jarvis="section:experience" className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center">Experience</h2>
					<p className="text-sm sm:text-base text-gray-400 text-center mb-10 sm:mb-14 max-w-2xl mx-auto px-4">
						Building and shipping production iOS apps · {total} of experience
					</p>
				</Reveal>

				<ol className="relative max-w-3xl mx-auto border-l border-gray-700/60 ml-3 sm:ml-auto space-y-10">
					{EXPERIENCE.map((item) => (
						<motion.li
							key={`${item.role}-${item.company}-${item.range.start.year}-${item.range.start.month}`}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-60px' }}
							transition={{ duration: 0.5 }}
							className="relative pl-6 sm:pl-8"
						>
							<span
								className={`absolute left-[-7px] top-2 h-3.5 w-3.5 rounded-full border-2 border-gray-900 ${
									!item.range.end ? 'bg-green-400' : 'bg-blue-400'
								}`}
							/>
							<div
								data-jarvis={`exp:${item.company}|${item.role}`}
								className="rounded-xl border border-gray-700/50 bg-gray-800/30 p-5 sm:p-6 backdrop-blur-xs hover:border-blue-500/30 transition-colors"
							>
								<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
									<h3 className="text-lg sm:text-xl font-semibold text-gray-100">{item.role}</h3>
									<span className="text-sm text-gray-400">
										{formatPeriod(item.range)} · {formatDuration(monthsInRange(item.range, now))}
									</span>
								</div>
								<p className="text-blue-400 text-sm sm:text-base mt-1">
									{item.company} <span className="text-gray-500">· {item.location}</span>
									{!item.range.end && (
										<span className="ml-2 rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400">Current</span>
									)}
								</p>
								<ul className="mt-4 space-y-2 text-sm sm:text-base text-gray-300 list-disc list-outside pl-5 marker:text-gray-600">
									{item.highlights.map((h) => (
										<li key={h}>{h}</li>
									))}
								</ul>
								<div className="mt-4 flex flex-wrap gap-2">
									{item.tech.map((t) => (
										<span key={t} className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
											{t}
										</span>
									))}
								</div>
							</div>
						</motion.li>
					))}
				</ol>

				<Reveal className="max-w-3xl mx-auto mt-12">
				<div data-jarvis="edu" className="rounded-xl border border-gray-700/50 bg-gray-800/20 p-5 sm:p-6">
					<p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Education</p>
					<div className="flex flex-wrap items-baseline justify-between gap-x-4">
						<h3 className="text-base sm:text-lg font-semibold text-gray-100">{EDUCATION.degree}</h3>
						<span className="text-sm text-gray-400">{EDUCATION.period}</span>
					</div>
					<p className="text-blue-400 text-sm mt-1">{EDUCATION.school}</p>
					<p className="text-gray-400 text-sm mt-2">{EDUCATION.details}</p>
				</div>
				</Reveal>

				<Reveal className="max-w-3xl mx-auto mt-6" delay={0.1}>
				<div data-jarvis="certs" className="rounded-xl border border-gray-700/50 bg-gray-800/20 p-5 sm:p-6">
					<p className="text-xs uppercase tracking-wider text-gray-500 mb-4">Certifications</p>
					<ul className="grid gap-3 sm:grid-cols-2">
						{CERTIFICATIONS.map((c) => (
							<li key={c.name}>
								<button
									type="button"
									onClick={() => setOpenCert(c)}
									data-jarvis="cert"
									data-jarvis-title={c.name}
									data-jarvis-text={`${[c.issuer, c.date].filter(Boolean).join(' · ')}. Click to open the certificate.`}
									className="group flex flex-col items-start justify-start w-full h-full text-left rounded-lg border border-gray-700/50 bg-gray-800/30 p-3 hover:border-blue-500/40 transition-colors cursor-pointer"
								>
									<span className="block text-sm sm:text-base text-gray-100">{c.name}</span>
									<span className="block text-xs text-gray-400 mt-0.5">
										{[c.issuer, c.date].filter(Boolean).join(' · ')}
									</span>
									<span className="block text-xs text-blue-400 mt-2 group-hover:underline">View certificate →</span>
								</button>
							</li>
						))}
					</ul>
				</div>
				</Reveal>
			</div>

			<CertificateModal cert={openCert} onClose={() => setOpenCert(null)} />
		</section>
	);
};

export default ExperienceSection;
