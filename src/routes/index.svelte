<script>
	import Noun from '$lib/Noun.svelte';
	export let daonouns;

	let nouns = daonouns;
	let max = 11;

	const loadMore = () => {
		max += 12;
	};
</script>

<div>
	<div class="max-w-6xl mx-auto">
		<div class="flex flex-col items-center">
			<div class="py-10 flex flex-col justify-center items-center px-5 md:px-8">
				<img src="/noun-logo.svg" alt="noun logo" class="h-16" />
				<h1 class="font-semibold text-2xl md:text-3xl mt-8 mb-6">The Nouns of Nouns DAO</h1>
				<p class="max-w-xl text-lg">
					The Nouns DAO is the main governing body of the Nouns ecosystem. Each Noun is an
					irrevocable member of Nouns DAO and entitled to one vote in all governance matters. <a
						href="https://nouns.wtf"
						alt="nouns.wtf"
						class="text-red-600 border-b border-red-600 hover:text-red-800 hover:border-red-800 transition-all duration-100"
						>Learn more about Nouns.</a
					>
				</p>
			</div>

			<div class="w-full px-5">
				<div class="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
					{#if nouns.length}
						{#each nouns.slice(0, max) as noun, i (noun.id)}
							<Noun {noun} />

							{#if i == 3}
								<a
									href="https://prop.house"
									target="_blank"
									class="flex flex-col items-center justify-center border-2 border-black p-5 space-y-5 hover:bg-[#E02ECF]/20 duration-200 transition-all"
								>
									<img src="/glasses.svg" alt="noun glasses" class="h-8" />
									<div class="text-center flex flex-col space-y-2">
										<p class="font-semibold text-2xl">Feeling Nounish?</p>
										<p class="text-[14px] text-left">
											Get your ideas funded. Prop House funding rounds are held regularly and are
											available to anyone, anywhere.
										</p>
									</div>
									<p class="text-sm font-medium">Learn more</p>
								</a>
							{/if}
						{/each}
					{/if}
				</div>

				{#if max < nouns.length}
					<div class="flex justify-center py-8">
						<button
							on:click={loadMore}
							class="px-5 py-2 border border-gray-900 text-sm hover:bg-gray-900 hover:text-white"
							>Load more</button
						>
					</div>
				{/if}
			</div>

			<div class="text-sm pb-10">
				<p>
					Powered by <a
						href="https://cloudnouns.com"
						alt="cloudnouns.com"
						class="hover:text-green-700 hover:underline">Cloud Nouns</a
					>
				</p>
			</div>
		</div>
	</div>
</div>
