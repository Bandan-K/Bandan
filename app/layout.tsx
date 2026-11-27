import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import RobotCompanion from '@/components/RobotCompanion';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const title = 'Bandan Kumar Mahto | iOS Developer in India';
const description =
	'Bandan Kumar Mahto is an iOS app developer based in India. Explore his work building iPhone and iPad apps with Swift, SwiftUI, and UIKit.';

export const metadata: Metadata = {
	metadataBase: new URL('https://bandan-kumar.vercel.app/'),
	alternates: {
		canonical: 'https://bandan-kumar.vercel.app',
	},
	title,
	applicationName: 'Bandan Kumar Mahto',
	appleWebApp: {
		title: 'Bandan Kumar Mahto',
		statusBarStyle: 'default',
		capable: true,
	},
	description,
	authors: [{ name: 'Bandan Kumar Mahto' }],
	creator: 'Bandan Kumar Mahto',
	openGraph: {
		title,
		description,
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
		<html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
			<head>
				{/* Resolve theme before first paint: saved choice, else the system preference. */}
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`,
					}}
				/>
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<a
					href="#main"
					className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-200 focus:rounded-full focus:bg-blue-600 focus:px-5 focus:py-2 focus:text-onaccent"
				>
					Skip to content
				</a>
				<AnalyticsTracker />
				<NavBar />
				{children}
				<Footer />
				<RobotCompanion />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@graph': [
							{
								'@type': 'Person',
								name: 'Bandan Kumar Mahto',
								url: 'https://bandan-kumar.vercel.app',
								jobTitle: 'iOS Developer',
								sameAs: ['https://github.com/bandan-k', 'https://www.linkedin.com/in/bandan-kumar/'],
							},
							{
								'@type': 'WebSite',
								name: 'Bandan Kumar Mahto',
								alternateName: ['Bandan', 'Bandan Portfolio', 'Bandan Kumar', 'Bandan Kumar - iOS Developer'],
								url: 'https://bandan-kumar.vercel.app',
							},
						],
						}),
					}}
				/>
			</body>
		</html>
	);
}
