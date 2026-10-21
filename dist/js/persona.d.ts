/**
 * Makoto or Sae: which sister you are right now. One choice for the whole Network: it lives in
 * a cookie on the parent domain (.niijimasisters.com), so switching on one site switches them
 * all, and servers can read it to keep each persona's data apart. Pages show it by putting
 * data-persona on <html>, which re-colours everything through tokens.css.
 */
export declare const PERSONAS: readonly ["makoto", "sae"];
export type Persona = (typeof PERSONAS)[number];
export declare const PERSONA_COOKIE = "nj_persona";
export declare const PERSONA_EVENT = "nj:persona";
export declare function isPersona(value: unknown): value is Persona;
/** The persona in a Cookie header (server side), or null. */
export declare function personaFromCookie(header: string | null | undefined): Persona | null;
/**
 * The cookie's Domain: the last two labels of the host (".niijimasisters.com" for
 * treasure.niijimasisters.com), so every subdomain shares it. Nothing for localhost or an IP.
 */
export declare function cookieDomain(hostname: string): string | undefined;
/** The Set-Cookie / document.cookie string for a persona, kept for a year. */
export declare function personaCookie(persona: Persona, hostname: string, secure?: boolean): string;
/** The current persona in the browser, falling back to `fallback`. */
export declare function getPersona(fallback?: Persona): Persona;
/** Shows a persona on a page: data-persona on the root element. */
export declare function applyPersona(persona: Persona, root?: HTMLElement): void;
/**
 * Switches persona: stores it for every subdomain, shows it on this page and tells listeners
 * (other components on the page, via a "nj:persona" event).
 */
export declare function setPersona(persona: Persona): void;
/** Runs `listener` whenever the persona changes on this page. Returns the unsubscribe. */
export declare function onPersonaChange(listener: (persona: Persona) => void): () => void;
