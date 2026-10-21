/** A tilted label. */
import type { Snippet } from 'svelte';
interface Props {
    variant?: 'ink' | 'paper' | 'red' | 'hi' | 'gold' | 'cyan';
    children: Snippet;
}
declare const Plate: import("svelte").Component<Props, {}, "">;
type Plate = ReturnType<typeof Plate>;
export default Plate;
