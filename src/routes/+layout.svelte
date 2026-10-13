<script lang="ts">
	import './layout.css';
	import { asset } from '$app/paths';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={asset('/favicon.svg')} type="image/svg+xml" />
</svelte:head>

<ModeWatcher />
{@render children()}
