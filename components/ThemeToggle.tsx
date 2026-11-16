'use client';

import { useSyncExternalStore } from 'react';
import { getTheme, setTheme, subscribeTheme, type Theme } from '@/lib/theme';

const ThemeToggle = () => {
	const theme = useSyncExternalStore<Theme>(subscribeTheme, getTheme, () => 'dark');
	const next: Theme = theme === 'dark' ? 'light' : 'dark';

	return (
		<button
			type="button"
			data-jarvis="nav:theme"
			onClick={() => setTheme(next)}
			aria-label={`Switch to ${next} mode`}
			title={`Switch to ${next} mode`}
			className="p-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-white/5 transition-colors cursor-pointer"
		>
			{theme === 'dark' ? (
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<circle cx="12" cy="12" r="4" strokeWidth={2} />
					<path strokeLinecap="round" strokeWidth={2} d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41" />
				</svg>
			) : (
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
				</svg>
			)}
		</button>
	);
};

export default ThemeToggle;
