interface Props {
    date?: Date;
    timeZone?: string;
    weather?: string | null;
    /** Size of the date digits (any CSS length). Default 72px. */
    size?: string;
}
declare const DateHud: import("svelte").Component<Props, {}, "">;
type DateHud = ReturnType<typeof DateHud>;
export default DateHud;
