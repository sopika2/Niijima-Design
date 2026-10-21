/**
     * A ransom-note title. The text stays readable to screen readers; the tiles are decoration.
     * `size` is the letter size (any CSS length); `animate` drops the tiles in on first show.
     */
import { type RansomOptions } from '../js/ransom.js';
interface Props extends RansomOptions {
    text: string;
    size?: string;
    animate?: boolean;
    /** The element to render: h1, h2, span… Default span. */
    as?: string;
    class?: string;
}
declare const Ransom: import("svelte").Component<Props, {}, "">;
type Ransom = ReturnType<typeof Ransom>;
export default Ransom;
