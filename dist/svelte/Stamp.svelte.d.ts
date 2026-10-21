/** A status stamp: online, soon, locked, down, pending, or hi (the persona's colour). */
import type { Snippet } from 'svelte';
interface Props {
    status?: 'online' | 'soon' | 'locked' | 'down' | 'pending' | 'hi';
    children: Snippet;
}
declare const Stamp: import("svelte").Component<Props, {}, "">;
type Stamp = ReturnType<typeof Stamp>;
export default Stamp;
