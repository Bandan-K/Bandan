import type { Metadata } from 'next';
import Link from 'next/link';
import ErrorPage, { primaryActionClass, secondaryActionClass } from '@/components/ErrorPage';

export const metadata: Metadata = {
	title: 'Page not found | Bandan Kumar Mahto',
	robots: { index: false, follow: false },
};

export default function NotFound() {
	return (
		<ErrorPage
			code="404"
			eyebrow="Error · Page not found"
			title="This screen doesn't exist in the storyboard"
			message="The page you're looking for was moved, renamed, or never shipped. Let's get you back to something that compiles."
			log={['xcodebuild -scheme Portfolio', "error: no route matches this URL", 'BUILD FAILED (404)']}
		>
			<Link href="/" className={primaryActionClass}>
				Back to home
			</Link>
			<Link href="/#contact" className={secondaryActionClass}>
				Get in touch
			</Link>
		</ErrorPage>
	);
}
