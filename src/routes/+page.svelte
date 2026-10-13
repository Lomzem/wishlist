<script lang="ts">
	import StarIcon from '@lucide/svelte/icons/star';
	import ThemeToggle from '$lib/components/theme-toggle.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { wishList } from '$lib/wish-list';
</script>

<svelte:head>
	<title>Lawjay's Wish List</title>
</svelte:head>

<main class="mx-auto max-w-xl px-6 pt-16 pb-12 sm:pt-24">
	<header class="flex items-start justify-between gap-4">
		<h1 class="pt-1 text-2xl leading-tight font-medium tracking-tight text-balance">
			Lawjay's Christmas <span class="whitespace-nowrap">Wish List 🎄</span>
		</h1>
		<ThemeToggle />
	</header>

	<ul class="mt-10 space-y-5">
		{#each wishList as wish, i (i)}
			<li class="flex items-center gap-4">
				{#if wish.image}
					<enhanced:img
						src={wish.image}
						alt={wish.name}
						sizes="96px"
						class="size-24 max-w-none rounded-xl border bg-tile object-contain p-1"
					/>
				{/if}
				<div class="flex flex-wrap items-center gap-x-2 gap-y-1">
					{#if wish.link}
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external purchase link -->
						<a href={wish.link} class="underline underline-offset-4">{wish.name}</a>
					{:else}
						{wish.name}
					{/if}
					{#if wish.reallyWant}
						<Badge>
							<StarIcon data-icon="inline-start" class="fill-current" aria-hidden="true" />
							really want!
						</Badge>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
</main>
