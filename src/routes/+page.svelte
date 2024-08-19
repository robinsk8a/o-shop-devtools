<script>
	import SynchronyTemp from '$lib/components/templates/SynchronyTemp.svelte';
	import EpicProtectTemp from '$lib/components/templates/EpicProtectTemp.svelte';
	import { activeTool } from '$lib/components/templates/templates-stores';
	import NavColoring from '$lib/components/utilities/NavColoring.svelte';
	import Downloads from '$lib/components/templates/Downloads.svelte';
	import ServicesHack from '$lib/components/hack/ServicesHack.svelte';
</script>

<div class="body">
	<nav class="side-bar">
		<h3 class="side-bar--greetings">Greetings Tigers</h3>
		<ul class="menu">
			<li class="cat-menu">
				<button
					class={$activeTool === 'synchrony-template' || $activeTool === 'epic-protect-template'
						? 'active'
						: ''}>templates</button
				>
				<ul class="sub-menu">
					<li>
						<button
							class={$activeTool === 'synchrony-template' ? 'active' : ''}
							on:click={() => ($activeTool = 'synchrony-template')}>Synchrony</button
						>
					</li>
					<li>
						<button
							class={$activeTool === 'epic-protect-template' ? 'active' : ''}
							on:click={() => ($activeTool = 'epic-protect-template')}>Epic Protect</button
						>
					</li>
				</ul>
			</li>
			<!-- Utilities -->
			<li class="cat-menu">
				<button>Utilities</button>
				<ul class="sub-menu">
					<li class="non-active">
						<button>Video / Embed generator</button>
					</li>
					<li class="non-active">
						<button>Galery generator</button>
					</li>
					<li>
						<button
							class={$activeTool === 'nav-coloring' ? 'active' : ''}
							on:click={() => ($activeTool = 'nav-coloring')}>Nav Coloring</button
						>
					</li>
				</ul>
			</li>
			<!-- Hack-kind -->
			<li class="cat-menu">
				<button>Hack-kind</button>
				<ul class="sub-menu">
					<li class="non-active">
						<button on:click={() => ($activeTool = 'services-hack')}>Service Fixes</button>
					</li>
					<li class="non-active">
						<button>Highlights Fixes</button>
					</li>
				</ul>
			</li>
		</ul>
		<div class="downloads">
			<button on:click={() => ($activeTool = 'downloads')}>Downloads</button>
		</div>
	</nav>
	<main class="main">
		{#if $activeTool === 'synchrony-template'}
			<SynchronyTemp />
		{:else if $activeTool === 'epic-protect-template'}
			<EpicProtectTemp />
		{:else if $activeTool === 'nav-coloring'}
			<NavColoring />
		{:else if $activeTool === 'downloads'}
			<Downloads />
		{:else if $activeTool === 'services-hack'}
			<ServicesHack />
		{/if}
	</main>
</div>

<style>
	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	:global(:root) {
		--backgorund-color: #a7cece;
		--side-bar-color: #196c72;
		--side-bar-button-color: #077575;
		--side-bar-button-color-active: #049257;
		--side-bar-accent-color: #0bbe56;
		--side-bar-accent-color-hover: #0bbeb5;
		--main-button-color: #12b1a9;
		--main-button-color-hover: #19484e;
		--main-button-color-active: #06c5df;
	}
	:global(body) {
		background-color: var(--backgorund-color);
		font-family: 'roboto', sans-serif;
	}
	:global(button) {
		border: none;
		background-color: var(--main-button-color);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		font-size: 1rem;
		text-align: center;
		cursor: pointer;
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
		overflow-x: hidden;
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
	.side-bar .active {
		background-color: var(--side-bar-button-color-active);
	}
	.main {
		padding: 2rem;
	}
	.downloads {
		margin-top: auto;
		margin-bottom: 2rem;
		background-color: var(--side-bar-accent-color);
		& > button {
			background-color: transparent;
			color: hsl(var(--side-bar-color), 0.2);
			width: 100%;
			height: 100%;
			padding: 1rem 2rem;
			border-radius: 0;
			font-size: 1.4rem;
			font-weight: 800;
		}
		&:hover {
			background-color: var(--side-bar-accent-color-hover);
		}
	}
	.non-active button {
		background-color: grey;
		color: #cfcfcf;
	}
</style>
