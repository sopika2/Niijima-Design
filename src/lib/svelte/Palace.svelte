<script lang="ts">
	/**
	 * An error page, like the landing page's 404 Palace: the code and title in cut-out letters, the
	 * address on a Target plate, a line of explanation and the way back.
	 */
	import Bands from './Bands.svelte';
	import Button from './Button.svelte';
	import Ransom from './Ransom.svelte';

	interface Props {
		code?: string;
		title?: string;
		target?: string;
		text?: string;
		back?: { label: string; href: string };
	}

	let {
		code = '404',
		title = "This Palace doesn't exist",
		target,
		text = 'No distortion here. Nothing to steal.\nWhatever you were looking for never had a Palace.',
		back = { label: 'Return to the hideout', href: '/' }
	}: Props = $props();
</script>

<section class="nj nj-palace">
	<Bands ghost={code} burst={false} />
	<div class="nj-palace__body">
		<Ransom class="nj-palace__code" text={code} seed="palace-{code}" tilt={10} />
		<Ransom as="h1" class="nj-palace__title" text={title.toUpperCase()} seed="palace" animate />
		{#if target}<p class="nj-palace__target"><span>Target</span><code>{target}</code></p>{/if}
		<p class="nj-palace__speech">{text}</p>
		<Button href={back.href}>{back.label}</Button>
	</div>
</section>
