import type { HeroSectionData } from '@/lib/services/profile';
import HeroStats from './HeroStats';

interface HeroSectionProps {
	initialData?: Partial<HeroSectionData> | null;
	experience: string;
}

export default function HeroSection({ initialData, experience }: HeroSectionProps) {
	return (
		<section id="home" className="portfolio-shell pb-12 pt-32 sm:pb-16 sm:pt-40">
			<div className="max-w-3xl">
				<p className="mb-4 text-base font-medium text-gray-400">Hi, I&apos;m</p>
				<h1 data-jarvis="hero:name" className="portfolio-display max-w-[12ch] text-[clamp(3.4rem,9vw,7.75rem)]">
					Bandan Kumar Mahto
				</h1>
				<h2 className="mt-5 text-lg font-medium text-white sm:text-xl">iOS Developer</h2>
				<p data-jarvis="hero:tagline" className="mt-5 max-w-lg text-lg leading-relaxed text-gray-300">
					Based in Jamnagar, I build iPhone and iPad apps with Swift, UIKit, and SwiftUI.
				</p>
				<div className="mt-8 flex flex-wrap items-center gap-3">
					<a href="#contact" className="rounded-md border border-transparent bg-portfolio-accent px-5 py-3 text-sm font-semibold text-portfolio-on-accent transition-colors hover:bg-portfolio-accent/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portfolio-accent">
						Get in Touch
					</a>
					<a href="/Bandan_Kumar_Mahto_Resume.pdf" target="_blank" rel="noopener" className="rounded-md border border-portfolio-rule px-5 py-3 text-sm font-semibold transition-colors hover:border-portfolio-accent hover:text-portfolio-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portfolio-accent">
						View Resume
					</a>
				</div>
			</div>
			<HeroStats data={{ ...initialData, experience }} />
		</section>
	);
}
