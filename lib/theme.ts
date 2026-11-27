export type Theme = 'light' | 'dark';

const listeners = new Set<() => void>();
let hasManualOverride = false;

export const getTheme = (): Theme =>
	document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

const apply = (theme: Theme) => {
	document.documentElement.dataset.theme = theme;
	listeners.forEach((l) => l());
};

/** Remember an explicit choice and keep it active for this page view. */
export const setTheme = (theme: Theme) => {
	hasManualOverride = true;
	try {
		localStorage.setItem('theme', theme);
	} catch {
		// The choice still applies for this page view when storage is unavailable.
	}
	apply(theme);
};

export const subscribeTheme = (onChange: () => void) => {
	listeners.add(onChange);
	const mq = window.matchMedia('(prefers-color-scheme: light)');
	const onSystemChange = () => {
		if (hasManualOverride) return;
		let saved: string | null = null;
		try {
			saved = localStorage.getItem('theme');
		} catch {}
		apply(saved === 'light' || saved === 'dark' ? saved : mq.matches ? 'light' : 'dark');
	};
	onSystemChange();
	mq.addEventListener('change', onSystemChange);
	return () => {
		listeners.delete(onChange);
		mq.removeEventListener('change', onSystemChange);
	};
};
