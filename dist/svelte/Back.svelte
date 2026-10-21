<script lang="ts">
	/** BACK [Esc]. A link with `href`, otherwise a button calling `onclick`. */
	interface Props {
		label?: string;
		href?: string;
		onclick?: () => void;
		/** Show the Esc key. Default true. */
		key?: boolean;
	}

	let { label = 'Back', href, onclick, key = true }: Props = $props();
</script>

{#if href}
	<a class="nj-back" {href}
		><i class="nj-back__arrow" aria-hidden="true"></i>{label}{#if key}<kbd>Esc</kbd>{/if}</a
	>
{:else}
	<button type="button" class="nj-back" {onclick}
		><i class="nj-back__arrow" aria-hidden="true"></i>{label}{#if key}<kbd>Esc</kbd>{/if}</button
	>
{/if}
