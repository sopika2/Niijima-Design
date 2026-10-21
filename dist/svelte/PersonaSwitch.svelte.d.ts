import { type Persona } from '../js/persona.js';
interface Props {
    /** The persona the server rendered with, so the first paint is already right. */
    value?: Persona;
    labels?: Record<Persona, string>;
    onchange?: (persona: Persona) => void;
}
declare const PersonaSwitch: import("svelte").Component<Props, {}, "">;
type PersonaSwitch = ReturnType<typeof PersonaSwitch>;
export default PersonaSwitch;
