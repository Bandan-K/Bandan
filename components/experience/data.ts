import type { DateRange } from '@/lib/experience';

/** A role. Omit `range.end` for the current job; "Current" badge and durations derive from it. */
export interface ExperienceItem {
	role: string;
	company: string;
	location: string;
	range: DateRange;
	highlights: string[];
	tech: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
	{
		role: 'iOS Developer',
		company: 'Pixster Studio',
		location: 'Ahmedabad, India',
		range: { start: { year: 2026, month: 5 } },
		highlights: ['Developing and maintaining iOS applications using Swift.'],
		tech: ['Swift'],
	},
	{
		role: 'iOS Developer',
		company: 'Elluminati Ventures',
		location: 'Rajkot, India',
		range: { start: { year: 2024, month: 9 }, end: { year: 2026, month: 4 } },
		highlights: [
			'Developed and maintained 15+ production-level iOS apps with 10,000+ users.',
			'Reduced crash rate by 30% through systematic testing and early bug fixes.',
			'Improved app load time by 25% via image, memory, and code optimization.',
			'Integrated Firebase for real-time notifications serving 8,000+ active users.',
			'Managed Git workflows and contributed 100+ commits across multiple releases.',
			'Authored documentation for 3 internal modules to support onboarding and scaling.',
		],
		tech: ['Swift', 'UIKit', 'SwiftUI', 'Firebase', 'Git'],
	},
	{
		role: 'iOS Developer Intern',
		company: 'Elluminati Ventures',
		location: 'Rajkot, India',
		range: { start: { year: 2024, month: 1 }, end: { year: 2024, month: 8 } },
		highlights: [
			'Built UI screens for 2 major modules using SwiftUI and UIKit.',
			'Integrated RESTful APIs to display live data, cutting manual updates by 90%.',
			'Cut development time by 15% with reusable, widget-based layouts.',
			'Reviewed 30+ pull requests and improved code quality through mentorship.',
			'Tested on 10+ devices and iOS versions using Xcode simulators.',
		],
		tech: ['SwiftUI', 'UIKit', 'REST APIs', 'Xcode'],
	},
];

export const EDUCATION = {
	degree: 'Bachelor of Technology in Computer Engineering',
	school: 'RK University',
	period: '2021 – 2025',
	details: 'CGPA 8.78 · App Development, Software Engineering, Data Structures',
};

export interface Certification {
	name: string;
	issuer: string;
	date?: string;
	/** Proof document under /public, viewable in the on-site viewer. */
	file: string;
	/** Optional external verification page. */
	verifyUrl?: string;
}

// Only certificates with a proof document are listed.
export const CERTIFICATIONS: Certification[] = [
	{
		name: 'Basics of Prompt Engineering (Certificate of Distinction)',
		issuer: 'IUCEE Foundation',
		date: 'Apr 2023',
		file: '/certificates/prompt-engineering-iucee.pdf',
	},
	{
		name: 'Python for Data Science (Elite)',
		issuer: 'NPTEL · IIT Madras',
		date: 'Jan–Feb 2023',
		file: '/certificates/python-data-science-nptel.jpg',
	},
	{
		name: 'PCAP: Programming Essentials in Python',
		issuer: 'Cisco Networking Academy · OpenEDG Python Institute',
		date: 'Nov 2022',
		file: '/certificates/pcap-python.pdf',
	},
	{
		name: 'Spark AR Community Hackathon',
		issuer: 'Meta · Reskill',
		file: '/certificates/spark-ar-hackathon.jpg',
	},
	{
		name: 'Get Started with Adobe Illustrator',
		issuer: 'Coursera Project Network',
		date: 'Jul 2022',
		file: '/certificates/adobe-illustrator-coursera.pdf',
		verifyUrl: 'https://coursera.org/verify/JPN3NV3J323S',
	},
];
