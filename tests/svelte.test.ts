import { render } from 'svelte/server';
import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import {
	Back,
	Bands,
	Button,
	Counter,
	DateHud,
	Loader,
	Palace,
	PersonaSwitch,
	Plate,
	Ransom,
	Speech,
	Stamp,
	Wordmark
} from '../src/lib/svelte/index.js';

const text = (value: string) => createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));

describe('svelte components render on the server', () => {
	it('Ransom keeps the text readable and tiles it', () => {
		const { body } = render(Ransom, { props: { text: 'Treasury', as: 'h1' } });
		expect(body).toContain('<span class="nj-sr">Treasury</span>');
		expect(body.match(/nj-ransom__tile/g)).toHaveLength(8);
		expect(body).toContain('<h1 class="nj-ransom"');
	});

	it('Button is a link with href, a button without', () => {
		expect(render(Button, { props: { href: '/', children: text('Enter') } }).body).toMatch(
			/<a href="\/" class="nj-btn"/
		);
		const button = render(Button, { props: { variant: 'red', children: text('Save') } }).body;
		expect(button).toContain('class="nj-btn nj-btn--red"');
		expect(button).toContain('type="button"');
	});

	it('DateHud shows a frozen date', () => {
		const { body } = render(DateHud, {
			props: {
				date: new Date('2026-10-20T15:00:00Z'),
				timeZone: 'Europe/Budapest',
				weather: 'Cloudy 13°'
			}
		});
		expect(body).toContain('TUE');
		expect(body).toContain('AFTER SCHOOL');
		expect(body).toContain('CLOUDY 13°');
	});

	it('PersonaSwitch marks the current persona', () => {
		const { body } = render(PersonaSwitch, { props: { value: 'sae' } });
		expect(body).toMatch(/data-who="sae" aria-pressed="true"/);
		expect(body).toMatch(/data-who="makoto" aria-pressed="false"/);
	});

	it('the rest render', () => {
		for (const [component, props] of [
			[Plate, { children: text('Codename · Queen') }],
			[Stamp, { status: 'soon', children: text('Coming soon') }],
			[Back, {}],
			[Counter, { value: '3/3', label: 'Online' }],
			[Speech, { tag: { number: '01', word: 'Menu' }, title: 'Dashboard' }],
			[Wordmark, { href: '/' }],
			[Bands, { ghost: 'Network' }],
			[Loader, {}],
			[Palace, { target: '/nope' }]
		] as const) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect(render(component as any, { props: props as any }).body.length).toBeGreaterThan(20);
		}
	});
});
