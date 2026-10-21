<script lang="ts">
	/** A status stamp: online, soon, locked, down, pending, or hi (the persona's colour). */
	import type { Snippet } from 'svelte';

	interface Props {
		status?: 'online' | 'soon' | 'locked' | 'down' | 'pending' | 'hi';
		children: Snippet;
	}

	let { status = 'online', children }: Props = $props();
</script>

<span class="nj-stamp nj-stamp--{status}">{@render children()}</span>
