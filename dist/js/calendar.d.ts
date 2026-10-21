/** The in-game calendar: weekday, time of day, and a date split into its parts. */
export declare const WEEKDAYS: readonly ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
/** "Morning", "After school"… for an hour of the day (0–23). */
export declare function phaseOf(hour: number): string;
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
export declare function calendarParts(date?: Date, timeZone?: string): CalendarParts;
