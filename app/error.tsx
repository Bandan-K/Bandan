'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import ErrorPage, { primaryActionClass, secondaryActionClass } from '@/components/ErrorPage';

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	const digest =
		error instanceof Error && 'digest' in error && typeof error.digest === 'string' ? error.digest : null;

	return (
		<ErrorPage
			code="500"
			eyebrow="Error · Something broke"
			title="That one's on me, not you"
			message="Something went wrong while loading this page. It's usually temporary, so try again or head back home."
			log={['runtime exception caught', digest ? `digest: ${digest}` : 'see console for details', 'status: recoverable']}
		>
			<button type="button" onClick={() => retry()} className={primaryActionClass}>
				Try again
			</button>
			<Link href="/" className={secondaryActionClass}>
				Back to home
			</Link>
		</ErrorPage>
	);
}
