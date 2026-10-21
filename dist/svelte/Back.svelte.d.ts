/** BACK [Esc]. A link with `href`, otherwise a button calling `onclick`. */
interface Props {
    label?: string;
    href?: string;
    onclick?: () => void;
    /** Show the Esc key. Default true. */
    key?: boolean;
}
declare const Back: import("svelte").Component<Props, {}, "">;
type Back = ReturnType<typeof Back>;
export default Back;
