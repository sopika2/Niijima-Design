<script lang="ts">
	/**
	 * MAKOTO | SAE. Switches the persona for every Niijima site (see persona.ts) and calls
	 * `onchange`, e.g. to reload data that belongs to the persona.
	 */
	import { onMount } from 'svelte';
	import {
		PERSONAS,
		getPersona,
		onPersonaChange,
		setPersona,
		type Persona
	} from '../js/persona.js';

	interface Props {
		/** The persona the server rendered with, so the first paint is already right. */
		value?: Persona;
		labels?: Record<Persona, string>;
		onchange?: (persona: Persona) => void;
	}

	let { value, labels = { makoto: 'Makoto', sae: 'Sae' }, onchange }: Props = $props();
	// svelte-ignore state_referenced_locally
	let current = $state<Persona>(value ?? 'makoto');

	onMount(() => {
		current = value ?? getPersona();
		return onPersonaChange((persona) => (current = persona));
	});

	function pick(persona: Persona) {
		if (persona === current) return;
		setPersona(persona);
		onchange?.(persona);
	}
</script>

<div class="nj-persona" role="group" aria-label="Persona">
	{#each PERSONAS as persona (persona)}
		<button
			type="button"
			class="nj-persona__opt"
			data-who={persona}
			aria-pressed={current === persona}
			onclick={() => pick(persona)}>{labels[persona]}</button
		>
	{/each}
</div>
