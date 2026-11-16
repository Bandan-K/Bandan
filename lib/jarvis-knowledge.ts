/**
 * What Jarvis knows. Page elements opt in with `data-jarvis="<key>"` (optionally `data-jarvis-text` and
 * `data-jarvis-title`). The text comes from the page's own data when supplied, and Jarvis adds an
 * "extra" line of general knowledge or personality on top, so he knows a little more than what's written.
 */
export interface Knowledge {
	title: string;
	/** Used when the element doesn't supply its own text. */
	text?: string;
	/** Extra context or a quip. One is picked at random each time. */
	extra?: string[];
}

export interface Explanation {
	title?: string;
	text: string;
	extra?: string;
}

export const KNOWLEDGE: Record<string, Knowledge> = {
	// Hero
	'hero:name': {
		title: 'Bandan Kumar Mahto',
		text: 'An iOS developer who builds and ships real apps for iPhone and iPad.',
		extra: ['I live on this site rent-free, so I may be biased. Still, he is good.'],
	},
	'hero:tagline': {
		title: 'The stack in one line',
		text: 'Swift as the language, with UIKit and SwiftUI for the interface.',
		extra: ['Knowing both the old and the new UI framework is real range, not a buzzword.'],
	},
	'stat:apps published': {
		title: 'Apps Published',
		text: 'Apps that made it through App Review and onto the App Store.',
		extra: ['Getting through App Review is its own skill. It is the one boss you cannot skip.'],
	},
	'stat:projects worked on': {
		title: 'Projects Worked On',
		text: 'Projects across roles, from single UI screens to full apps.',
		extra: ['Every project teaches you something. Mostly about edge cases.'],
	},
	'stat:app rating': {
		title: 'App Rating',
		text: 'What real users think of the apps, not what the developer thinks.',
		extra: ['A good rating usually comes from crash-free sessions more than pretty screens.'],
	},
	'stat:years of experience': {
		title: 'Years of Experience',
		text: 'Worked out live from the dates in the experience timeline below.',
		extra: ['No rounding up. I checked.'],
	},

	// Skills
	'section:skills': {
		title: 'Technical Expertise',
		text: 'Everything Bandan builds iOS apps with, grouped into core stack, frameworks and tools.',
		extra: ['Go on, point at any card. I will tell you more than it says.'],
	},
	'category:core': {
		title: 'Core Stack',
		text: 'The foundation: the language and the UI frameworks every screen is built on.',
		extra: ['Swift, SwiftUI and UIKit. The holy trinity of iOS.'],
	},
	'category:frameworks': {
		title: 'Frameworks & Services',
		text: 'Data, networking, maps and the Firebase services around the app.',
		extra: ['Most apps are a polished face on top of these. They matter more than they look.'],
	},
	'category:tools': {
		title: 'Tools & Distribution',
		text: 'How code is written, versioned, tested and shipped.',
		extra: ['Great code nobody can install is just a hobby.'],
	},
	'skill:swift': {
		title: 'Swift',
		extra: ['Apple introduced Swift in 2014 to succeed Objective-C, and open-sourced it in 2015.'],
	},
	'skill:swiftui': {
		title: 'SwiftUI',
		extra: ['It arrived in 2019. You describe what the screen should look like and it works out the updates.'],
	},
	'skill:uikit': {
		title: 'UIKit',
		extra: ['The veteran of iPhone UI. Still the go-to when you need fine-grained control.'],
	},
	'skill:combine': {
		title: 'Combine',
		extra: ['Apple’s reactive framework, also from 2019. Think of values over time as streams.'],
	},
	'skill:core data / swiftdata': {
		title: 'Core Data / SwiftData',
		extra: ['Core Data is the long-serving persistence engine. SwiftData (2023) is its Swift-native successor.'],
	},
	'skill:rest apis': {
		title: 'REST APIs',
		extra: ['Handling errors and slow networks gracefully is what separates a demo from a product.'],
	},
	'skill:google maps & places': {
		title: 'Google Maps & Places',
		extra: ['Place autocomplete is why entering an address feels instant.'],
	},
	'skill:firebase crashlytics': {
		title: 'Firebase Crashlytics',
		extra: ['Real crash reports from real devices. It is how you make a number like a 30% crash drop measurable.'],
	},
	'skill:firebase analytics': {
		title: 'Firebase Analytics',
		extra: ['Fun fact: this very site logs events with it. Yes, I know when you poke me.'],
	},
	'skill:xcode': {
		title: 'Xcode',
		extra: ['Home of the simulator, Instruments and the legendary “Indexing…” status.'],
	},
	'skill:git & version control': {
		title: 'Git & Version Control',
		extra: ['Linus Torvalds created Git in 2005 to manage the Linux kernel. Now it manages everything.'],
	},
	'skill:cocoapods/spm': {
		title: 'CocoaPods / SPM',
		extra: ['CocoaPods came first, in 2011. Swift Package Manager is Apple’s built-in answer.'],
	},
	'skill:testflight': {
		title: 'TestFlight',
		extra: ['Apple acquired it in 2014. Real people can break your app before the whole world does.'],
	},

	// Experience
	'section:experience': {
		title: 'Experience',
		text: 'A timeline of the roles Bandan has held, newest first.',
		extra: ['The green dot marks where he is working right now.'],
	},
	'exp:pixster studio|ios developer': {
		title: 'iOS Developer · Pixster Studio',
		text: 'The current role: developing and maintaining iOS apps in Swift, in Ahmedabad.',
		extra: ['The newest chapter. Stay tuned.'],
	},
	'exp:elluminati ventures|ios developer': {
		title: 'iOS Developer · Elluminati Ventures',
		text: '15+ production apps for 10,000+ users, 30% fewer crashes and 25% faster load times.',
		extra: ['Numbers like these come from measuring first and optimising second. Crash-free is the best feature.'],
	},
	'exp:elluminati ventures|ios developer intern': {
		title: 'Intern · Elluminati Ventures',
		text: 'It started here: SwiftUI and UIKit screens, live API data, and 30+ pull requests reviewed.',
		extra: ['Reading other people’s code is the fastest way to level up. 30+ reviews is a masterclass.'],
	},
	edu: {
		title: 'Education',
		text: 'B.Tech in Computer Engineering at RK University, 2021–2025, with a CGPA of 8.78.',
		extra: ['He began interning before graduating. Studied and shipped at the same time.'],
	},
	certs: {
		title: 'Certifications',
		text: 'Five certificates, each with a proof document you can open right here on the site.',
		extra: ['Python, prompt engineering, Spark AR, Illustrator. Not a one-trick brain.'],
	},
	cert: {
		title: 'Certificate',
		extra: ['Verified and viewable. I do not accept unverified claims.'],
	},

	// Process
	'section:process': {
		title: 'iOS Development Process',
		text: 'The workflow from idea to App Store, in three stages.',
		extra: ['Having a process is what makes “it works on my machine” stop being the plan.'],
	},
	'process:planning & design': {
		title: 'Planning & Design',
		text: 'Scope the requirements, design to Apple’s guidelines, and prototype in Figma.',
		extra: ['Following the Human Interface Guidelines is why an app feels native without trying.'],
	},
	'process:development & testing': {
		title: 'Development & Testing',
		text: 'Architect the project in Xcode, build with UIKit or SwiftUI, test, then beta on TestFlight.',
		extra: ['Beta testers find the bugs your simulator is too polite to show you.'],
	},
	'process:deployment & maintenance': {
		title: 'Deployment & Maintenance',
		text: 'Submit to App Review, watch crashes and analytics, and keep shipping updates.',
		extra: ['Launch day is the start of the work, not the end of it.'],
	},

	// Contact
	'section:contact': {
		title: 'Let’s Build Together',
		text: 'The call to action. If you like what you see, this is where it turns into a conversation.',
		extra: ['This is my favourite section. It is the one where you do something.'],
	},
	'contact:location': {
		title: 'Location',
		text: 'Based in Jamnagar, Gujarat, India.',
		extra: ['He has worked in Ahmedabad and Rajkot too, so he knows Gujarat’s tech scene.'],
	},
	'contact:message': {
		title: 'Get in touch',
		text: 'Opens a form to send Bandan a message directly.',
		extra: ['Go on. He replies faster than App Review.'],
	},
	'contact:resume': {
		title: 'Resume',
		text: 'Opens the resume as a PDF. Everything above, in one page.',
		extra: ['The short version of me. Well, of him.'],
	},
	'contact:github': {
		title: 'GitHub',
		text: 'Code, projects and commit history.',
		extra: ['Repos speak louder than résumés.'],
	},
	'contact:linkedin': {
		title: 'LinkedIn',
		text: 'The professional profile and network.',
		extra: ['Where the polite corporate small talk happens.'],
	},

	// Misc
	'nav:theme': {
		title: 'Theme',
		text: 'Switches between light and dark mode. The site remembers your choice.',
		extra: ['Dark mode makes my gold look better. Just saying.'],
	},
};

const pick = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

/** Combine what the element says with what Jarvis knows. Returns null if there is nothing to say. */
export const explain = (key: string, text?: string | null, title?: string | null): Explanation | null => {
	const k = KNOWLEDGE[key.toLowerCase()];
	const body = text || k?.text;
	if (!body) return null;
	return {
		title: title || k?.title,
		text: body,
		extra: k?.extra ? pick(k.extra) : undefined,
	};
};
