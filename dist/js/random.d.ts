/** FNV-1a: a stable number from any string, so the same text always looks the same. */
export declare function hash(text: string): number;
/** Mulberry32: a small seeded generator returning 0 ≤ n < 1. */
export declare function seeded(seed: number | string): () => number;
