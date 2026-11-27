import type { HeroSectionData } from '@/lib/services/profile';

export default function HeroStats({ data }: { data: Partial<HeroSectionData> }) {
	const stats = [
		{ label: 'Apps Published', value: data.appsPublished },
		{ label: 'Projects Worked On', value: data.projectsWorked },
		{ label: 'App Rating', value: data.appRating },
		{ label: 'Years of Experience', value: data.experience },
	].filter(({ value }) => typeof value === 'string' && value.trim());

	return (
		<dl className="mt-12 grid grid-cols-2 gap-x-5 gap-y-7 border-t border-portfolio-rule pt-7 sm:mt-16 sm:grid-cols-4">
			{stats.map(({ label, value }) => (
				<div
					key={label}
					data-jarvis={`stat:${label.toLowerCase()}`}
					data-jarvis-title={`${value} · ${label}`}
					className="flex flex-col gap-2 sm:not-first:border-l sm:not-first:border-portfolio-rule sm:not-first:pl-5"
				>
					<dt className="text-sm text-gray-400">{label}</dt>
					<dd className="portfolio-display order-first text-4xl tabular-nums text-white sm:text-5xl">{value}</dd>
				</div>
			))}
		</dl>
	);
}
