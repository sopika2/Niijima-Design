/** A big number in a paper frame with a red shadow: "3/3 ONLINE", "3,019,581 Ft TOTAL". */
interface Props {
    value: string;
    label: string;
    /** A small tag in the corner, e.g. LIVE. */
    source?: string;
}
declare const Counter: import("svelte").Component<Props, {}, "">;
type Counter = ReturnType<typeof Counter>;
export default Counter;
