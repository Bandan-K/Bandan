'use client';

import React, { useState } from 'react';
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
		<section id="experience" className="portfolio-shell portfolio-section">
			<h2 data-jarvis="section:experience" className="portfolio-heading">Experience</h2>
			<p className="portfolio-intro">
				{total} of mobile app development experience, building and shipping production iOS apps
			</p>

			<ol className="border-t border-portfolio-rule">
				{EXPERIENCE.map((item) => (
					<li
						key={`${item.role}-${item.company}-${item.range.start.year}-${item.range.start.month}`}
						className="border-b border-portfolio-rule py-6 sm:py-8"
					>
						<div
							data-jarvis={`exp:${item.company}|${item.role}`}
							className="max-w-4xl"
						>
							<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
								<h3 className="text-lg sm:text-xl font-semibold text-gray-100">{item.role}</h3>
								<span className="text-sm text-gray-400">
									{formatPeriod(item.range)} · {formatDuration(monthsInRange(item.range, now))}
								</span>
							</div>
							<p className="text-portfolio-accent text-sm sm:text-base mt-1">
								{item.company} <span className="text-gray-500">· {item.location}</span>
								{!item.range.end && (
									<span className="ml-2 rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400">Current</span>
								)}
							</p>
							<ul className="mt-4 space-y-2 text-sm sm:text-base text-gray-300 list-disc list-outside pl-5 marker:text-portfolio-accent">
								{item.highlights.map((h) => (
									<li key={h}>{h}</li>
								))}
							</ul>
							<div className="mt-4 flex flex-wrap gap-2">
								{item.tech.map((t) => (
									<span key={t} className="rounded-sm border border-portfolio-rule px-2 py-1 text-xs text-gray-400">
										{t}
									</span>
								))}
							</div>
						</div>
					</li>
				))}
			</ol>

			<div className="mt-10">
			<div data-jarvis="edu" className="border-b border-portfolio-rule pb-8">
				<p className="text-sm font-semibold text-gray-400 mb-2">Education</p>
				<div className="flex flex-wrap items-baseline justify-between gap-x-4">
					<h3 className="text-base sm:text-lg font-semibold text-gray-100">{EDUCATION.degree}</h3>
					<span className="text-sm text-gray-400">{EDUCATION.period}</span>
				</div>
				<p className="text-portfolio-accent text-sm mt-1">{EDUCATION.school}</p>
				<p className="text-gray-400 text-sm mt-2">{EDUCATION.details}</p>
			</div>
			</div>

			<div className="mt-8">
			<div data-jarvis="certs" className="border-b border-portfolio-rule pb-8">
				<p className="text-sm font-semibold text-gray-400 mb-4">Certifications</p>
				<ul className="grid gap-3 sm:grid-cols-2">
					{CERTIFICATIONS.map((c) => (
						<li key={c.name}>
							<button
								type="button"
								onClick={() => setOpenCert(c)}
								data-jarvis="cert"
								data-jarvis-title={c.name}
								data-jarvis-text={`${[c.issuer, c.date].filter(Boolean).join(' · ')}. Click to open the certificate.`}
								className="group flex flex-col items-start justify-start w-full h-full text-left border-b border-portfolio-rule py-3 hover:border-portfolio-accent transition-colors cursor-pointer"
							>
								<span className="block text-sm sm:text-base text-gray-100">{c.name}</span>
								<span className="block text-xs text-gray-400 mt-0.5">
									{[c.issuer, c.date].filter(Boolean).join(' · ')}
								</span>
								<span className="block text-xs text-portfolio-accent mt-2 group-hover:underline">View certificate →</span>
							</button>
						</li>
					))}
				</ul>
			</div>
			</div>

			<CertificateModal cert={openCert} onClose={() => setOpenCert(null)} />
		</section>
	);
};

export default ExperienceSection;
