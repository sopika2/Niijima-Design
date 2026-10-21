import { seeded } from './random.js';

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

const FACES = [
	{ family: 'var(--nj-font-ransom-a)', scale: 1 },
	{ family: 'var(--nj-font-ransom-b)', scale: 0.84 },
	{ family: 'var(--nj-font-ransom-c)', scale: 0.82 },
	{ family: 'var(--nj-font-ransom-d)', scale: 1.04 },
	{ family: 'var(--nj-font-display)', scale: 1.1 }
];

/** The letters of each word (split on spaces). */
export function ransom(text: string, options: RansomOptions = {}): Letter[][] {
	const rand = seeded(options.seed ?? text);
	const tiles = options.tiles?.length ? options.tiles : (['paper', 'ink', 'red'] as const);
	const tilt = options.tilt ?? 8;
	const pct = () => `${(rand() * 9).toFixed(1)}%`;
	let lastTile: Tile | null = null;
	let lastFace = -1;
	let n = 0;
	return text
		.split(/\s+/)
		.filter(Boolean)
		.map((word) =>
			Array.from(word).map((char) => {
				let f = Math.floor(rand() * FACES.length);
				if (f === lastFace) f = (f + 1) % FACES.length;
				let tile = tiles[Math.floor(rand() * tiles.length)]!;
				if (tile === lastTile && tiles.length > 1)
					tile = tiles[(tiles.indexOf(tile) + 1) % tiles.length]!;
				lastFace = f;
				lastTile = tile;
				const face = FACES[f]!;
				const scale = face.scale * (n === 0 ? (options.first ?? 1.2) : 0.9 + rand() * 0.2);
				const letter: Letter = {
					char,
					tile,
					face: face.family,
					tileStyle:
						`--rot:${((rand() * 2 - 1) * tilt).toFixed(1)}deg;--sc:${scale.toFixed(3)};` +
						`--dy:${((rand() * 2 - 1) * 0.06).toFixed(3)}em;--d:${n * (options.stagger ?? 40)}ms`,
					faceStyle: `font-family:${face.family};--c1:${pct()};--c2:${pct()};--c3:${pct()};--c4:${pct()}`
				};
				n += 1;
				return letter;
			})
		);
}

const escape = (text: string) => text.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/**
 * The markup for a ransom title, for pages without a framework. The readable text is in a
 * visually hidden span; the tiles are aria-hidden decoration.
 */
export function ransomHTML(text: string, options: RansomOptions = {}): string {
	const words = ransom(text, options)
		.map(
			(word) =>
				`<span class="nj-ransom__word" aria-hidden="true">${word
					.map(
						(l) =>
							`<span class="nj-ransom__tile t-${l.tile}" style="${l.tileStyle}"><span class="nj-ransom__face" style="${l.faceStyle}">${escape(l.char)}</span></span>`
					)
					.join('')}</span>`
		)
		.join('');
	return `<span class="nj-sr">${escape(text)}</span>${words}`;
}

/** Fills an element with a ransom title (adds the nj-ransom class). */
export function ransomInto(
	target: HTMLElement,
	text: string,
	options: RansomOptions = {}
): HTMLElement {
	target.classList.add('nj-ransom');
	target.innerHTML = ransomHTML(text, options);
	return target;
}
