import '../src/lib/css/niijima.css';
import './demo.css';
import {
	STAR_POINTS,
	WEEKDAYS,
	burstPoints,
	calendarParts,
	getPersona,
	applyPersona,
	onPersonaChange,
	ransomInto,
	setPersona,
	isPersona
} from '../src/lib/index.js';

const $ = (selector: string) => document.querySelector<HTMLElement>(selector)!;

// Persona: from the cookie, switchable with the buttons.
function showPersona(persona: string) {
	document
		.querySelectorAll<HTMLButtonElement>('.nj-persona__opt')
		.forEach((button) =>
			button.setAttribute('aria-pressed', String(button.dataset.who === persona))
		);
	ransomInto($('#title'), persona === 'sae' ? 'SAE NIIJIMA' : 'MAKOTO NIIJIMA', {
		tiles:
			persona === 'sae' ? ['paper', 'ink', 'gold', 'crimson'] : ['paper', 'ink', 'red', 'steel']
	});
	$('#title').classList.add('is-in');
}
const start = getPersona();
applyPersona(start);
showPersona(start);
onPersonaChange(showPersona);
document
	.querySelectorAll<HTMLButtonElement>('.nj-persona__opt')
	.forEach((button) =>
		button.addEventListener(
			'click',
			() => isPersona(button.dataset.who) && setPersona(button.dataset.who)
		)
	);

// Background and calendar.
$('#bands').outerHTML =
	`<div class="nj-bands" aria-hidden="true"><svg class="nj-bands__burst" viewBox="0 0 100 100"><polygon points="${burstPoints('net', 14, 49, 33)}"/></svg><span class="nj-bands__band"></span><span class="nj-bands__band nj-bands__band--thin"></span><span class="nj-bands__ghost">Network</span></div>`;
const p = calendarParts(new Date(), 'Europe/Budapest');
$('#hud').outerHTML =
	`<div class="nj-hud"><svg class="nj-hud__burst" viewBox="0 0 100 100"><polygon points="${burstPoints('hud', 11, 48, 30)}"/></svg><div class="nj-hud__date"><span class="nj-hud__m">${p.month}</span><span class="nj-hud__sl">/</span><span>${p.day}</span></div><div class="nj-hud__dow${p.weekday === 0 ? ' is-sun' : p.weekday === 6 ? ' is-sat' : ''}">${WEEKDAYS[p.weekday]}</div><div class="nj-hud__phase"><span>${p.phase.toUpperCase()}</span><span class="nj-hud__clock">${p.clock}</span></div><span class="nj-hud__wx">CLOUDY 13°</span></div>`;

// "Take your time" for two seconds.
$('#show-loader').addEventListener('click', () => {
	const loader = document.createElement('div');
	loader.className = 'nj-loader';
	loader.innerHTML = `<div class="nj-bands"><span class="nj-bands__band"></span><span class="nj-bands__band nj-bands__band--thin"></span></div><div class="nj-loader__corner"><svg class="nj-loader__star" viewBox="0 0 100 100"><polygon points="${STAR_POINTS}"/></svg><span class="nj-loader__text"></span></div>`;
	ransomInto(loader.querySelector<HTMLElement>('.nj-loader__text')!, 'TAKE YOUR TIME', {
		seed: 'loader'
	});
	document.body.append(loader);
	setTimeout(() => {
		loader.classList.add('is-leaving');
		setTimeout(() => loader.remove(), 460);
	}, 2000);
});
