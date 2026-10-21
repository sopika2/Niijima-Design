// Niijima Network design: the helpers. Styles are imported separately:
//   import '@niijima/design/niijima.css'          (fonts + tokens + components)
// Svelte components: import { Ransom, Button, … } from '@niijima/design/svelte'
export { hash, seeded } from './js/random.js';
export { ransom, ransomHTML, ransomInto } from './js/ransom.js';
export type { Letter, RansomOptions, Tile } from './js/ransom.js';
export { burstPoints, STAR_POINTS } from './js/burst.js';
export { WEEKDAYS, phaseOf, calendarParts } from './js/calendar.js';
export type { CalendarParts } from './js/calendar.js';
export {
	PERSONAS,
	PERSONA_COOKIE,
	PERSONA_EVENT,
	isPersona,
	personaFromCookie,
	cookieDomain,
	personaCookie,
	getPersona,
	applyPersona,
	setPersona,
	onPersonaChange
} from './js/persona.js';
export type { Persona } from './js/persona.js';
