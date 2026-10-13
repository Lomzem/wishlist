<script lang="ts">
	import ThemeToggle from '$lib/components/theme-toggle.svelte';
	import { wishList } from '$lib/wish-list';
</script>

<svelte:head>
	<title>Lawjay's Wish List</title>
</svelte:head>

<main class="mx-auto max-w-xl px-6 pt-16 pb-12 sm:pt-24">
	<header class="flex items-start justify-between gap-4">
		<h1 class="pt-1 text-2xl leading-tight font-medium tracking-tight">
			Lawjay's Christmas Wish List 🎄
		</h1>
		<ThemeToggle />
	</header>

	<ul class="mt-10 space-y-5">
		{#each wishList as wish, i (i)}
			<li>
				{#if wish.link}
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external purchase link -->
					<a href={wish.link} class="underline underline-offset-4">{wish.name}</a>
				{:else}
					{wish.name}
				{/if}
			</li>
		{/each}
	</ul>
</main>
