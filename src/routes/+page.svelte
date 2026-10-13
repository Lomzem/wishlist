<script lang="ts">
	import GiftIcon from '@lucide/svelte/icons/gift';
	import StarIcon from '@lucide/svelte/icons/star';
	import ThemeToggle from '$lib/components/theme-toggle.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
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

	<ul class="mt-10 space-y-4">
		{#each wishList as wish, i (i)}
			<li>
				{#snippet tile()}
					{#if wish.image}
						<enhanced:img
							src={wish.image}
							alt={wish.name}
							sizes="(min-width: 640px) 96px, 64px"
							class="size-16 max-w-none shrink-0 rounded-lg border bg-tile object-contain p-1 sm:size-24"
						/>
					{:else}
						<div
							class="flex size-16 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground sm:size-24"
						>
							<GiftIcon class="size-6 sm:size-8" aria-hidden="true" />
						</div>
					{/if}
				{/snippet}
				<Card.Root size="sm">
					<Card.Content class="flex-row items-start gap-4">
						{#if wish.link}
							<!-- Duplicates the name link for pointer users; hidden so it isn't announced twice. -->
							<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external purchase link -->
							<a href={wish.link} aria-hidden="true" tabindex="-1" class="shrink-0">
								{@render tile()}
							</a>
						{:else}
							{@render tile()}
						{/if}
						<div class="flex min-w-0 flex-col items-start gap-2">
							<span class="text-base leading-snug font-medium">
								{#if wish.link}
									<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external purchase link -->
									<a href={wish.link} class="underline underline-offset-4">{wish.name}</a>
								{:else}
									{wish.name}
								{/if}
							</span>
							{#if wish.reallyWant}
								<Badge>
									<StarIcon data-icon="inline-start" class="fill-current" aria-hidden="true" />
									really want!
								</Badge>
							{/if}
							{#if wish.note?.trim()}
								<div class="space-y-2 text-sm text-muted-foreground">
									{#each wish.note.trim().split(/\n\s*\n/) as paragraph, j (j)}
										<p>{paragraph}</p>
									{/each}
								</div>
							{/if}
						</div>
					</Card.Content>
				</Card.Root>
			</li>
		{/each}
	</ul>
</main>
