import { describe, expect, it } from 'vitest';
import {
	burstPoints,
	calendarParts,
	cookieDomain,
	personaCookie,
	personaFromCookie,
	phaseOf,
	ransom,
	ransomHTML
} from '../src/lib/index.js';

describe('ransom', () => {
	it('is deterministic and splits words', () => {
		const a = ransom('Take your time');
		expect(a).toEqual(ransom('Take your time'));
		expect(a.map((word) => word.map((l) => l.char).join(''))).toEqual(['Take', 'your', 'time']);
		expect(ransom('Take your time', { seed: 'other' })).not.toEqual(a);
	});

	it('never puts the same tile twice in a row', () => {
		const letters = ransom('THE PHANTOM THIEVES OF HEARTS').flat();
		for (let i = 1; i < letters.length; i++)
			expect(letters[i]!.tile).not.toBe(letters[i - 1]!.tile);
	});

	it('only uses the tiles asked for', () => {
		const tiles = new Set(
			ransom('SAE NIIJIMA', { tiles: ['gold', 'crimson'] })
				.flat()
				.map((l) => l.tile)
		);
		expect([...tiles].every((tile) => tile === 'gold' || tile === 'crimson')).toBe(true);
	});

	it('escapes the text in its markup and keeps it readable', () => {
		const html = ransomHTML('<b>&');
		expect(html).toContain('<span class="nj-sr">&#60;b&#62;&#38;</span>');
		expect(html).not.toContain('<b>');
	});
});

describe('burstPoints', () => {
	it('has two points per spike, inside the 0–100 box', () => {
		const points = burstPoints('hud', 11).split(' ');
		expect(points).toHaveLength(22);
		for (const point of points) {
			const [x, y] = point.split(',').map(Number);
			expect(x).toBeGreaterThanOrEqual(0);
			expect(y).toBeLessThanOrEqual(100);
		}
		expect(burstPoints('hud')).toBe(burstPoints('hud'));
	});
});

describe('calendar', () => {
	it('names the time of day like the game', () => {
		expect([0, 4, 5, 8, 12, 13, 17, 18, 23].map(phaseOf)).toEqual([
			'Late night',
			'Late night',
			'Early morning',
			'Morning',
			'Lunchtime',
			'Afternoon',
			'After school',
			'Evening',
			'Late night'
		]);
	});

	it('reads a date in a time zone', () => {
		const parts = calendarParts(new Date('2026-10-20T22:30:00Z'), 'Europe/Budapest');
		expect(parts).toMatchObject({
			month: 10,
			day: 21,
			weekday: 3,
			clock: '00:30',
			phase: 'Late night'
		});
	});
});

describe('persona', () => {
	it('reads the persona from a Cookie header', () => {
		expect(personaFromCookie('a=1; nj_persona=sae; b=2')).toBe('sae');
		expect(personaFromCookie('nj_persona=akechi')).toBeNull();
		expect(personaFromCookie(undefined)).toBeNull();
	});

	it('shares the cookie with every subdomain', () => {
		expect(cookieDomain('treasure.niijimasisters.com')).toBe('.niijimasisters.com');
		expect(cookieDomain('niijimasisters.com')).toBe('.niijimasisters.com');
		expect(cookieDomain('localhost')).toBeUndefined();
		expect(cookieDomain('192.168.1.5')).toBeUndefined();
		expect(personaCookie('makoto', 'calendar.niijimasisters.com')).toBe(
			'nj_persona=makoto; Path=/; Max-Age=31536000; SameSite=Lax; Domain=.niijimasisters.com; Secure'
		);
	});
});
