export interface YearMonth {
	year: number;
	/** 1–12 */
	month: number;
}

export interface DateRange {
	start: YearMonth;
	/** Omit for a role that is still ongoing. */
	end?: YearMonth;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const index = ({ year, month }: YearMonth) => year * 12 + (month - 1);

const currentMonth = (now: Date): YearMonth => ({ year: now.getFullYear(), month: now.getMonth() + 1 });

/** Months covered by a range, counting both the first and last month (same convention as LinkedIn). */
export const monthsInRange = (range: DateRange, now: Date): number =>
	Math.max(0, index(range.end ?? currentMonth(now)) - index(range.start) + 1);

/** Total months across ranges; months covered by overlapping roles are counted once. */
export const totalMonths = (ranges: DateRange[], now: Date): number => {
	const covered = new Set<number>();
	for (const range of ranges) {
		const end = index(range.end ?? currentMonth(now));
		for (let m = index(range.start); m <= end; m++) covered.add(m);
	}
	return covered.size;
};

/** "1 yr 8 mos", "7 mos", "2 yrs" */
export const formatDuration = (months: number): string => {
	const years = Math.floor(months / 12);
	const rest = months % 12;
	const y = years ? `${years} ${years === 1 ? 'yr' : 'yrs'}` : '';
	const m = rest ? `${rest} ${rest === 1 ? 'mo' : 'mos'}` : '';
	return [y, m].filter(Boolean).join(' ') || '0 mos';
};

/** "Sep 2024 – Apr 2026" or "May 2026 – Present" */
export const formatPeriod = ({ start, end }: DateRange): string => {
	const label = (d: YearMonth) => `${MONTHS[d.month - 1]} ${d.year}`;
	return `${label(start)} – ${end ? label(end) : 'Present'}`;
};

/** Short value for the hero stat: "8 mos" under a year, otherwise whole years like "2+". */
export const formatExperienceStat = (months: number): string =>
	months < 12 ? `${months} mos` : `${Math.floor(months / 12)}+`;
