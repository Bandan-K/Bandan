import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import FirebaseAnalytics from './components/FirebaseAnalytics';
import VisitorLogger from './components/VisitorLogger';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	metadataBase: new URL('https://bandan-kumar.vercel.app/'),
	alternates: {
		canonical: 'https://bandan-kumar.vercel.app',
	},
	title: 'Bandan Kumar Mahto - iOS Developer',
	applicationName: 'Bandan Kumar Mahto',
	appleWebApp: {
		title: 'Bandan Kumar Mahto',
		statusBarStyle: 'default',
		capable: true,
	},
	description:
		'Welcome to my portfolio! I am a dedicated iOS developer crafting intuitive, high-performance applications using Swift, SwiftUI, and UIKit. I specialize in building seamless user experiences, robust APIs, and fluid animations for iPhone and iPad.',
	keywords: [
		'Bandan',
		'Bandan Kumar',
		'Bandan Kumar Mahto',
		'Bandan iOS Developer',
		'Bandan Kumar iOS Developer',
		'Bandan Kumar Mahto iOS Developer',
		'iOS Developer',
		'Swift',
		'SwiftUI',
		'UIKit',
		'Storyboard',
		'Combine Framework',
		'Mobile Apps',
		'iPhone Development',
		'iPad Development',
		'Apple Developer',
		'App Store',
		'Core Data',
		'API Integration',
		'MVVM Architecture',
		'Mobile UI/UX',
		'Auto Layout',
		'Xcode',
	],
	authors: [{ name: 'Bandan Kumar Mahto' }],
	creator: 'Bandan Kumar Mahto',
	openGraph: {
		title: 'Bandan Kumar Mahto - iOS Developer Portfolio',
		description:
			'Skilled iOS developer building elegant and performant iPhone/iPad applications using Swift, SwiftUI, and UIKit. Explore my work and technical expertise.',
		url: 'https://bandan-kumar.vercel.app/',
		siteName: 'Bandan Kumar Mahto',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Bandan Kumar Mahto - iOS Developer Portfolio',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	// twitter: {
	// 	card: 'summary_large_image',
	// 	title: 'Bandan Kumar Mahto - iOS Developer',
	// 	description:
	// 		'Skilled iOS developer building elegant and performant iPhone/iPad applications using Swift, SwiftUI, and UIKit. Explore my work and technical expertise.',
	// 	creator: '@yourusername', // update if needed
	// 	images: ['/og-image.jpg'],
	// },
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	icons: {
		icon: [
			{ url: '/favicon.png', media: '(prefers-color-scheme: light)' },
			{ url: '/favicon_dark.png', media: '(prefers-color-scheme: dark)' },
		],
		apple: '/favicon_dark.png',
	},
	manifest: '/manifest.json',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<FirebaseAnalytics />
				<VisitorLogger />
				{children}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify([
							{
								'@context': 'https://schema.org',
								'@type': 'Person',
								name: 'Bandan Kumar Mahto',
								url: 'https://bandan-kumar.vercel.app',
								jobTitle: 'iOS Developer',
								sameAs: ['https://github.com/bandan-k', 'https://www.linkedin.com/in/bandan-kumar/'],
							},
							{
								'@context': 'https://schema.org',
								'@type': 'WebSite',
								name: 'Bandan Kumar Mahto',
								alternateName: ['Bandan', 'Bandan Portfolio', 'Bandan Kumar', 'Bandan Kumar - iOS Developer'],
								url: 'https://bandan-kumar.vercel.app',
							},
						]),
					}}
				/>
			</body>
		</html>
	);
}
