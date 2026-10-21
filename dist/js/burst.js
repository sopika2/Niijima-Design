import { seeded } from './random.js';
/**
 * Points for a jagged starburst in a 0–100 viewBox: `spikes` points, the outer ones at about
 * `outer`, the inner ones at about `inner`. Seeded, so it never jumps between renders.
 */
export function burstPoints(seed, spikes = 11, outer = 48, inner = 30) {
    const rand = seeded(seed);
    const points = [];
    for (let i = 0; i < spikes * 2; i++) {
        const angle = (Math.PI * i) / spikes - Math.PI / 2;
        const r = i % 2 ? inner * (0.85 + rand() * 0.3) : outer * (0.78 + rand() * 0.22);
        points.push(`${(50 + Math.cos(angle) * r).toFixed(1)},${(50 + Math.sin(angle) * r).toFixed(1)}`);
    }
    return points.join(' ');
}
/** The five-point thief star of the loader. */
export const STAR_POINTS = '50,3 61,37 97,37 68,59 79,95 50,73 21,95 32,59 3,37 39,37';
