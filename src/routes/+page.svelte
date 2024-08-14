<script>
	import SynchronyTemp from '$lib/components/templates/SynchronyTemp.svelte';
	import EpicProtectTemp from '$lib/components/templates/EpicProtectTemp.svelte';
	import { activeTool } from '$lib/components/templates/templates-stores';

</script>


<h1>{$activeTool}</h1>
<div class="body">
	<nav class="side-bar">
		<h3 class="side-bar--greetings">Greetings Tigers</h3>
		<ul class="menu">
			<li class="cat-menu">
				<button>templates</button>
				<ul class="sub-menu">
					<li><button class="synchrony-template" on:click={$activeTool.set('synchrony-template')}>Synchrony</button></li>
					<li><button class="epic-protect-template" on:click={$activeTool.set('epic-protect-template')}>Epic Protect</button></li>
				</ul>
			</li>
			<li class="cat-menu">
				<button>Utilities</button>
				<ul class="sub-menu">
					<li>
						<button on:click={$activeTool.set('synchrony-template')}>Video / Embed generator</button
						>
					</li>
					<li>
						<button on:click={() => $activeTool.set('epic-protect-template')}>Galery generator</button>
					</li>
				</ul>
			</li>
		</ul>
		<div class="downloads">
			<a href="/downloads">Downloads</a>
		</div>
	</nav>
	<main class="main">
		<h1>Tiger Team tools.</h1>
		{#if $activeTool === 'synchrony-template'}
			<SynchronyTemp />
		{:else if $activeTool === 'epic-protect-template'}
			<EpicProtectTemp />
		{/if}
	</main>
</div>

<style>
	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	:global(body) {
		background-color: #a7cece;
		font-family: 'roboto', sans-serif;
	}
	:global(:root) {
		--backgorund-color: #a7cece;
		--side-bar-color: #196c72;
		--side-bar-button-color: #077575;
		--side-bar-button-color-active: #1d91a0;
		--side-bar-button-color-hover: #12b1a9;
		--side-bar-button-color-active-hover: #19484e;
		--side-bar-button-color-hover-active: #1a4e55;
		--side-bar-button-color-active-hover-active: #19484e;
		--side-bar-accent-color: #76c2be;
	}

	@keyframes sideJump {
		0% {
			transform: translateX(0%);
		}
		50% {
			transform: translateX(2%);
		}
		100% {
			transform: translateX(0);
		}
	}
	.body {
		display: grid;
		grid-template-columns: 20rem 1fr;
		& > * {
			width: 100%;
			height: 100svh;
			overflow-y: scroll;
		}
	}
	.side-bar {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-color: var(--side-bar-color);
		color: white;
		font-size: 1.4rem;
		font-weight: 500;
	}
	.side-bar--greetings {
		font-size: 2rem;
		margin: 2rem;
	}
	.side-bar a {
		color: white;
		text-decoration: none;
	}
	.side-bar li {
		list-style: none;
	}
	.side-bar button {
		background-color: var(--side-bar-button-color);
		border: none;
		border-block: 1px solid #1a4e55;
		color: white;
		padding: 0.5rem;
		padding-left: 2rem;
		width: 100%;
		text-align: left;
		text-transform: capitalize;
		cursor: pointer;
		transform: translateX(0);
		&:hover {
			background-color: var(--side-bar-button-color-hover);
			animation: sideJump 0.3s ease-in-out;
		}
	}
	.cat-menu > button {
		font-size: 1.2rem;
		font-weight: bold;
	}
	.sub-menu button {
		margin-left: 0.6rem;
		width: calc(100% - 0.6rem);
		font-size: 1rem;
		padding-left: 2rem;
		border-radius: 0.4rem;
	}
	.downloads {
		margin-top: auto;
		margin-bottom: 2rem;
		background-color: var(--side-bar-accent-color);
		padding: 1rem 2rem;
		& > a {
			display: block;
			color: hsl(var(--side-bar-color), 0.2);
			width: 100%;
			height: 100%;
		}
		& > a:hover {
			animation: sideJump 0.2s ease-in-out;
		}
	}
</style>
