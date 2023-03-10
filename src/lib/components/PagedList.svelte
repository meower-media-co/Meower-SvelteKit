<script lang="ts" context="module">
	export interface Item {
		id: any;
		[index: string]: any;
	}

	export interface LoadPageReturn {
		numPages: number;
		result: Array<Item>;
	}
</script>

<script lang="ts">
	import Loading from "$lib/ui/Loading.svelte";

	export let items: Item[] = [];

	export let loadPage: (
		page: number
	) => Promise<LoadPageReturn> = async () => ({numPages: 0, result: []});

	export const addItem = function (item: Item) {
		id++;
		items.unshift(item);
		items = items;
		itemOffset++;
	};

	export let itemsPerPage: number = 25;

	let id = 0;

	async function loadPageWithOverflow(page: number) {
		pageLoading = true;
		try {
			// 25 posts per page...
			let realPage = page + Math.floor(itemOffset / itemsPerPage);
			let realOffset = itemOffset % itemsPerPage;
			const first = await loadPage(page);
			let realItems = first.result;
			realItems.splice(0, realOffset);
			numPages = first.numPages;
			let overflow;
			if (realOffset > 0 && pagesLoaded < numPages) {
				overflow = await loadPage(page + 1);
				realItems = realItems.concat(overflow.result.slice(0, realOffset));
			}
			items = items.concat(realItems);
			pagesLoaded = page;
			return items.map((o) => {
				id++;
				return o;
			});
		} finally {
			pageLoading = false;
		}
	}
	let pagesLoaded = 0;
	let pageLoading = false;
	let numPages: number | null = null;
	// As we use a Load More button and the home is sorted newest-first,
	// we need an offset for posts to be continuous.
	let itemOffset = 0;
</script>

<div>
	{#await loadPageWithOverflow(1)}
		<div class="center loading-start">
			<Loading />
		</div>
	{:then}
		{#if !items || items.length === 0}
			<slot name="empty" {items} />
		{:else}
			<slot name="loaded" {items}>
				{#each items as item (item.id)}
					<slot name="item" {item} {items} />
				{/each}
			</slot>

			<div class="center">
				{#if pageLoading}
					<div class="loading-page">
						<Loading />
					</div>
				{:else if (numPages && numPages > pagesLoaded) || true}
					<button
						class="load-more"
						on:click={() => loadPageWithOverflow(pagesLoaded + 1)}
					>
						Load More
					</button>
				{/if}
			</div>
		{/if}
	{:catch error}
		<slot name="error" {error} />
	{/await}
</div>

<style>
	.center {
		text-align: center;
	}
	.load-more {
		width: 100%;
		margin-bottom: 2em;
	}
	.loading-start {
		margin-top: 2em;
	}
	.loading-page {
		margin-bottom: 0.5em;
	}
</style>
