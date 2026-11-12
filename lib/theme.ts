export type Theme = 'light' | 'dark';

const listeners = new Set<() => void>();

export const getTheme = (): Theme =>
	document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

const apply = (theme: Theme) => {
	document.documentElement.dataset.theme = theme;
	listeners.forEach((l) => l());
};

/** Persist an explicit user choice and apply it. */
export const setTheme = (theme: Theme) => {
	try {
		localStorage.setItem('theme', theme);
	} catch {
		// storage unavailable; the choice still applies for this page view
	}
	apply(theme);
};

/** For useSyncExternalStore. Also follows system changes until the user picks a theme. */
export const subscribeTheme = (onChange: () => void) => {
	listeners.add(onChange);
	const mq = window.matchMedia('(prefers-color-scheme: light)');
	const onSystemChange = () => {
		let saved: string | null = null;
		try {
			saved = localStorage.getItem('theme');
		} catch {}
		if (!saved) apply(mq.matches ? 'light' : 'dark');
	};
	mq.addEventListener('change', onSystemChange);
	return () => {
		listeners.delete(onChange);
		mq.removeEventListener('change', onSystemChange);
	};
};
