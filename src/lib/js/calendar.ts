/** The in-game calendar: weekday, time of day, and a date split into its parts. */
export const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;

const PHASES: ReadonlyArray<readonly [number, string]> = [
	[0, 'Late night'],
	[5, 'Early morning'],
	[8, 'Morning'],
	[11, 'Lunchtime'],
	[13, 'Afternoon'],
	[16, 'After school'],
	[18, 'Evening'],
	[22, 'Late night']
];

/** "Morning", "After school"… for an hour of the day (0–23). */
export function phaseOf(hour: number): string {
	let phase = PHASES[0]![1];
	for (const [from, name] of PHASES) if (hour >= from) phase = name;
	return phase;
}

export interface CalendarParts {
	readonly month: number;
	readonly day: number;
	/** 0 = Sunday. */
	readonly weekday: number;
	readonly hour: number;
	readonly minute: number;
	readonly phase: string;
	/** "07:05" */
	readonly clock: string;
}

/** A date's parts in a time zone (the browser's own if none is given). */
export function calendarParts(date: Date = new Date(), timeZone?: string): CalendarParts {
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let weekday = date.getDay();
	let hour = date.getHours();
	let minute = date.getMinutes();
	if (timeZone) {
		const parts = Object.fromEntries(
			new Intl.DateTimeFormat('en-GB', {
				timeZone,
				month: 'numeric',
				day: 'numeric',
				weekday: 'short',
				hour: 'numeric',
				minute: 'numeric',
				hourCycle: 'h23'
			})
				.formatToParts(date)
				.map((part) => [part.type, part.value])
		);
		month = Number(parts.month);
		day = Number(parts.day);
		weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday ?? '');
		hour = Number(parts.hour);
		minute = Number(parts.minute);
	}
	return {
		month,
		day,
		weekday,
		hour,
		minute,
		phase: phaseOf(hour),
		clock: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
	};
}
