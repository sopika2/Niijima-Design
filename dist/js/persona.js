/**
 * Makoto or Sae: which sister you are right now. One choice for the whole Network: it lives in
 * a cookie on the parent domain (.niijimasisters.com), so switching on one site switches them
 * all, and servers can read it to keep each persona's data apart. Pages show it by putting
 * data-persona on <html>, which re-colours everything through tokens.css.
 */
export const PERSONAS = ['makoto', 'sae'];
export const PERSONA_COOKIE = 'nj_persona';
export const PERSONA_EVENT = 'nj:persona';
export function isPersona(value) {
    return value === 'makoto' || value === 'sae';
}
/** The persona in a Cookie header (server side), or null. */
export function personaFromCookie(header) {
    for (const part of (header ?? '').split(';')) {
        const [name, ...rest] = part.trim().split('=');
        if (name === PERSONA_COOKIE) {
            const value = decodeURIComponent(rest.join('='));
            return isPersona(value) ? value : null;
        }
    }
    return null;
}
/**
 * The cookie's Domain: the last two labels of the host (".niijimasisters.com" for
 * treasure.niijimasisters.com), so every subdomain shares it. Nothing for localhost or an IP.
 */
export function cookieDomain(hostname) {
    if (hostname === 'localhost' || /^[\d.]+$/.test(hostname) || hostname.includes(':'))
        return undefined;
    const labels = hostname.split('.');
    return labels.length >= 2 ? `.${labels.slice(-2).join('.')}` : undefined;
}
/** The Set-Cookie / document.cookie string for a persona, kept for a year. */
export function personaCookie(persona, hostname, secure = true) {
    const domain = cookieDomain(hostname);
    return [
        `${PERSONA_COOKIE}=${persona}`,
        'Path=/',
        'Max-Age=31536000',
        'SameSite=Lax',
        domain ? `Domain=${domain}` : '',
        secure ? 'Secure' : ''
    ]
        .filter(Boolean)
        .join('; ');
}
/** The current persona in the browser, falling back to `fallback`. */
export function getPersona(fallback = 'makoto') {
    if (typeof document === 'undefined')
        return fallback;
    return personaFromCookie(document.cookie) ?? fallback;
}
/** Shows a persona on a page: data-persona on the root element. */
export function applyPersona(persona, root = document.documentElement) {
    root.dataset.persona = persona;
}
/**
 * Switches persona: stores it for every subdomain, shows it on this page and tells listeners
 * (other components on the page, via a "nj:persona" event).
 */
export function setPersona(persona) {
    if (typeof document === 'undefined')
        return;
    document.cookie = personaCookie(persona, location.hostname, location.protocol === 'https:');
    applyPersona(persona);
    window.dispatchEvent(new CustomEvent(PERSONA_EVENT, { detail: persona }));
}
/** Runs `listener` whenever the persona changes on this page. Returns the unsubscribe. */
export function onPersonaChange(listener) {
    const handler = (event) => {
        const value = event.detail;
        if (isPersona(value))
            listener(value);
    };
    window.addEventListener(PERSONA_EVENT, handler);
    return () => window.removeEventListener(PERSONA_EVENT, handler);
}
