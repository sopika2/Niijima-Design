<script lang="ts">
	/**
	 * The in-game calendar: date in a red starburst, the weekday on a plate, the time of day and
	 * the clock. Updates itself every 30 seconds. Pass `date` to freeze it, `timeZone` to show
	 * another zone's time, `weather` for a small gold tag underneath ("CLOUDY 13°").
	 */
	import { onMount } from 'svelte';
	import { burstPoints } from '../js/burst.js';
	import { WEEKDAYS, calendarParts } from '../js/calendar.js';

	interface Props {
		date?: Date;
		timeZone?: string;
		weather?: string | null;
		/** Size of the date digits (any CSS length). Default 72px. */
		size?: string;
	}

	let { date, timeZone, weather = null, size }: Props = $props();
	let now = $state(new Date());
	const parts = $derived(calendarParts(date ?? now, timeZone));
	const points = burstPoints('hud', 11, 48, 30);
	const label = $derived(
		(date ?? now).toLocaleDateString('en-GB', {
			weekday: 'long',
			month: 'long',
			day: 'numeric',
			timeZone
		}) +
			', ' +
			parts.phase.toLowerCase()
	);

	onMount(() => {
		if (date) return;
		const timer = setInterval(() => (now = new Date()), 30_000);
		return () => clearInterval(timer);
	});
</script>

<div class="nj-hud" role="img" aria-label={label} style={size ? `--hud:${size}` : undefined}>
	<svg class="nj-hud__burst" viewBox="0 0 100 100" aria-hidden="true"><polygon {points} /></svg>
	<div class="nj-hud__date" aria-hidden="true">
		<span class="nj-hud__m">{parts.month}</span><span class="nj-hud__sl">/</span><span
			>{parts.day}</span
		>
	</div>
	<div
		class="nj-hud__dow"
		class:is-sun={parts.weekday === 0}
		class:is-sat={parts.weekday === 6}
		aria-hidden="true"
	>
		{WEEKDAYS[parts.weekday]}
	</div>
	<div class="nj-hud__phase" aria-hidden="true">
		<span>{parts.phase.toUpperCase()}</span><span class="nj-hud__clock">{parts.clock}</span>
	</div>
	{#if weather}<span class="nj-hud__wx">{weather.toUpperCase()}</span>{/if}
</div>
