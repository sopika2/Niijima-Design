<script lang="ts">
	/** A tilted label. */
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'ink' | 'paper' | 'red' | 'hi' | 'gold' | 'cyan';
		children: Snippet;
	}

	let { variant = 'ink', children }: Props = $props();
</script>

<span
	class="nj-plate"
	class:nj-plate--paper={variant === 'paper'}
	class:nj-plate--red={variant === 'red'}
	class:nj-plate--hi={variant === 'hi'}
	class:nj-plate--gold={variant === 'gold'}
	class:nj-plate--cyan={variant === 'cyan'}>{@render children()}</span
>
