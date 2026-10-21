import { seeded } from './random.js';
const FACES = [
    { family: 'var(--nj-font-ransom-a)', scale: 1 },
    { family: 'var(--nj-font-ransom-b)', scale: 0.84 },
    { family: 'var(--nj-font-ransom-c)', scale: 0.82 },
    { family: 'var(--nj-font-ransom-d)', scale: 1.04 },
    { family: 'var(--nj-font-display)', scale: 1.1 }
];
/** The letters of each word (split on spaces). */
export function ransom(text, options = {}) {
    const rand = seeded(options.seed ?? text);
    const tiles = options.tiles?.length ? options.tiles : ['paper', 'ink', 'red'];
    const tilt = options.tilt ?? 8;
    const pct = () => `${(rand() * 9).toFixed(1)}%`;
    let lastTile = null;
    let lastFace = -1;
    let n = 0;
    return text
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => Array.from(word).map((char) => {
        let f = Math.floor(rand() * FACES.length);
        if (f === lastFace)
            f = (f + 1) % FACES.length;
        let tile = tiles[Math.floor(rand() * tiles.length)];
        if (tile === lastTile && tiles.length > 1)
            tile = tiles[(tiles.indexOf(tile) + 1) % tiles.length];
        lastFace = f;
        lastTile = tile;
        const face = FACES[f];
        const scale = face.scale * (n === 0 ? (options.first ?? 1.2) : 0.9 + rand() * 0.2);
        const letter = {
            char,
            tile,
            face: face.family,
            tileStyle: `--rot:${((rand() * 2 - 1) * tilt).toFixed(1)}deg;--sc:${scale.toFixed(3)};` +
                `--dy:${((rand() * 2 - 1) * 0.06).toFixed(3)}em;--d:${n * (options.stagger ?? 40)}ms`,
            faceStyle: `font-family:${face.family};--c1:${pct()};--c2:${pct()};--c3:${pct()};--c4:${pct()}`
        };
        n += 1;
        return letter;
    }));
}
const escape = (text) => text.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
/**
 * The markup for a ransom title, for pages without a framework. The readable text is in a
 * visually hidden span; the tiles are aria-hidden decoration.
 */
export function ransomHTML(text, options = {}) {
    const words = ransom(text, options)
        .map((word) => `<span class="nj-ransom__word" aria-hidden="true">${word
        .map((l) => `<span class="nj-ransom__tile t-${l.tile}" style="${l.tileStyle}"><span class="nj-ransom__face" style="${l.faceStyle}">${escape(l.char)}</span></span>`)
        .join('')}</span>`)
        .join('');
    return `<span class="nj-sr">${escape(text)}</span>${words}`;
}
/** Fills an element with a ransom title (adds the nj-ransom class). */
export function ransomInto(target, text, options = {}) {
    target.classList.add('nj-ransom');
    target.innerHTML = ransomHTML(text, options);
    return target;
}
