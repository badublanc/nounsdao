<script>
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import dayjs from 'dayjs';
	import { shortenAddress, checkForENS } from '$lib/utils.js';

	export let noun;

	let loading = true;
	let nounData = {};
	let displayAddress;

	const bg = noun.seed?.background == 0 ? 'cool' : 'warm';

	const getDisplayAddress = async (address) => {
		displayAddress = shortenAddress(address);
		const ens = await checkForENS(address);
		if (ens) displayAddress = ens;
	};

	onMount(async () => {
		try {
			const res = await fetch(`https://beta.noun-api.com/nounsdao/${noun.id}?format=json,b64`);
			const data = await res.json();
			nounData = data;
			getDisplayAddress(nounData.auction?.winner);
			loading = false;
		} catch (error) {
			console.log(error);
		}
	});
</script>

<div class="" class:cool={bg == 'cool'} class:warm={bg == 'warm'} transition:scale>
	<div class="flex flex-col p-5 space-y-5">
		<div class="flex justify-between items-center">
			<p class="secondary">#{noun.id.toString().padStart(3, 0)}</p>
			{#if loading}
				<div class="w-20 h-4 bg-gray-400 rounded-full animate-pulse" />
			{:else}
				<p class="secondary">{dayjs.unix(nounData?.created).format('YYYY.MM.DD')}</p>
			{/if}
		</div>

		<div class="self-center border-b border-gray-600">
			{#if loading}
				<img src="/loading-skull.gif" alt="" class="w-5/6 mx-auto" />
			{:else}
				<img src={nounData.image} alt="" class="w-5/6 mx-auto" />
			{/if}
		</div>

		<div class="flex flex-col">
			<p class="uppercase secondary">Auction Winner</p>
			{#if loading}
				<div class="h-5 w-36 bg-gray-400 rounded-full animate-pulse mt-1.5 mb-2" />
				<div class="h-4 w-16 bg-gray-400 rounded-full animate-pulse" />
			{:else}
				{#if noun.id === 0 || noun.id % 10 === 0}
					<p class="font-medium text-xl">nounders.eth</p>
				{:else}
					<p class="font-medium text-xl">{displayAddress}</p>
				{/if}
				<p class="font-medium opacity-60">
					{nounData?.auction?.amount ? nounData?.auction?.amount + ' ETH' : 'n/a'}
				</p>
			{/if}
		</div>

		<div class="grid grid-cols-2 gap-2.5">
			<a href={`https://nouns.wtf/noun/${noun.id}`} alt="" class="button" target="_blank"
				>More info</a
			>
			<a
				href={`https://opensea.io/assets/0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03/${noun.id}`}
				alt=""
				class="button"
				target="_blank">OpenSea</a
			>
		</div>
	</div>
</div>

<style>
	.cool {
		@apply bg-[#d5d7e1];
	}

	.warm {
		@apply bg-[#e1d7d5];
	}

	.button {
		@apply text-center text-sm text-gray-600 bg-white/30 py-2 hover:bg-white hover:text-gray-900 duration-200 transition-all;
	}

	.secondary {
		@apply text-sm font-medium opacity-60;
	}
</style>
