/**
 * Points for a jagged starburst in a 0–100 viewBox: `spikes` points, the outer ones at about
 * `outer`, the inner ones at about `inner`. Seeded, so it never jumps between renders.
 */
export declare function burstPoints(seed: string | number, spikes?: number, outer?: number, inner?: number): string;
/** The five-point thief star of the loader. */
export declare const STAR_POINTS = "50,3 61,37 97,37 68,59 79,95 50,73 21,95 32,59 3,37 39,37";
