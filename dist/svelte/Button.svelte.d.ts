/** The landing page's button: paper front, red block behind, tilted. A link with `href`. */
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
interface Props extends HTMLButtonAttributes {
    href?: string;
    variant?: 'paper' | 'red' | 'hi' | 'ghost';
    small?: boolean;
    /** The arrow after the label; "down" turns it. */
    arrow?: boolean | 'down';
    children: Snippet;
}
declare const Button: import("svelte").Component<Props, {}, "">;
type Button = ReturnType<typeof Button>;
export default Button;
