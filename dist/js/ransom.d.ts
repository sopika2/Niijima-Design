/**
 * Ransom-note letters, the landing page's way: each letter from one of five faces, on a paper,
 * ink or red tile (never the same tile twice in a row), tilted, a little bigger or smaller, the
 * first one largest, each tile torn at its own corners. Deterministic: same text, same seed,
 * same letters, so server and browser agree.
 */
export type Tile = 'paper' | 'ink' | 'red' | 'steel' | 'crimson' | 'gold' | 'hi';
export interface RansomOptions {
    /** Defaults to the text itself. */
    seed?: string | number;
    /** The tiles to pick from. Default paper, ink, red. */
    tiles?: readonly Tile[];
    /** Largest tilt either way, in degrees. Default 8. */
    tilt?: number;
    /** Size of the first letter. Default 1.2. */
    first?: number;
    /** Delay between letters for the entrance animation, ms. Default 40. */
    stagger?: number;
}
export interface Letter {
    readonly char: string;
    readonly tile: Tile;
    /** CSS variable for the face: var(--nj-font-ransom-a) … or var(--nj-font-display). */
    readonly face: string;
    /** A ready style="" value for the tile: --rot, --sc, --dy, --d. */
    readonly tileStyle: string;
    /** A ready style="" value for the face: font-family and the torn corners. */
    readonly faceStyle: string;
}
/** The letters of each word (split on spaces). */
export declare function ransom(text: string, options?: RansomOptions): Letter[][];
/**
 * The markup for a ransom title, for pages without a framework. The readable text is in a
 * visually hidden span; the tiles are aria-hidden decoration.
 */
export declare function ransomHTML(text: string, options?: RansomOptions): string;
/** Fills an element with a ransom title (adds the nj-ransom class). */
export declare function ransomInto(target: HTMLElement, text: string, options?: RansomOptions): HTMLElement;
