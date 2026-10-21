/** A speech box: paper card, an ink tag with a number and a word, a tail pointing up. */
import type { Snippet } from 'svelte';
interface Props {
    tag?: {
        number?: string;
        word?: string;
    };
    title?: string;
    tail?: boolean;
    children?: Snippet;
}
declare const Speech: import("svelte").Component<Props, {}, "">;
type Speech = ReturnType<typeof Speech>;
export default Speech;
