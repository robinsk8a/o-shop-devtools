<script>
	import SynchronyTemp from '$lib/components/templates/SynchronyTemp.svelte';
	import EpicProtectTemp from '$lib/components/templates/EpicProtectTemp.svelte';
	import CPSWarranty from '$lib/components/templates/CPSWarranty.svelte';
	import { activeTool } from '$lib/components/templates/templates-stores';
	import NavColoring from '$lib/components/utilities/NavColoring.svelte';
	import Downloads from '$lib/components/templates/Downloads.svelte';
	import ServicesHack from '$lib/components/hack/ServicesHack.svelte';
	import MediaInfoExtractor from '$lib/components/utilities/MediaInfoExtractor.svelte';
	import VideoLayouts from '$lib/components/utilities/VideoLayouts.svelte';
	import ImageLooper from '$lib/components/utilities/ImageLooper.svelte';
	import { onMount } from 'svelte';

	const DEFAULT_TOOL = 'synchrony-template';

	const categoryMap = {
		templates: ['synchrony-template', 'epic-protect-template', 'CPS-template'],
		utilities: ['nav-coloring', 'video-generator', 'media-extractor', 'image-looper'],
		hack: ['services-hack']
	};

	/** @type {Record<string, boolean>} */
	let openCategories = { templates: true, utilities: false, hack: false };

	function toggle(cat) {
		openCategories[cat] = !openCategories[cat];
	}

	function getHashTool() {
		const hash = window.location.hash.replace('#', '').trim();
		return hash || DEFAULT_TOOL;
	}

	function autoOpenCategory(tool) {
		for (const [cat, tools] of Object.entries(categoryMap)) {
			if (tools.includes(tool)) {
				openCategories[cat] = true;
			}
		}
	}

	onMount(() => {
		const initial = getHashTool();
		$activeTool = initial;
		autoOpenCategory(initial);

		const onHashChange = () => {
			const tool = getHashTool();
			$activeTool = tool;
			autoOpenCategory(tool);
		};
		window.addEventListener('hashchange', onHashChange);
		return () => window.removeEventListener('hashchange', onHashChange);
	});
</script>

<div class="body">
	<nav class="side-bar">
		<h3 class="side-bar--greetings">Greetings Tigers</h3>
		<ul class="menu">
			<li class="cat-menu">
				<button class="cat-toggle" on:click={() => toggle('templates')}>templates</button>
				{#if openCategories.templates}
				<ul class="sub-menu">
					<li>
						<a
							class="nav-link {$activeTool === 'synchrony-template' ? 'active' : ''}"
							href="#synchrony-template">Synchrony</a
						>
					</li>
					<li>
						<a
							class="nav-link {$activeTool === 'epic-protect-template' ? 'active' : ''}"
							href="#epic-protect-template">Epic Protect</a
						>
					</li>
					<li>
						<a
							class="nav-link {$activeTool === 'CPS-template' ? 'active' : ''}"
							href="#CPS-template">CPS Warranty</a
						>
					</li>
				</ul>
				{/if}
			</li>
			<!-- Utilities -->
			<li class="cat-menu">
				<button class="cat-toggle" on:click={() => toggle('utilities')}>Utilities</button>
				{#if openCategories.utilities}
				<ul class="sub-menu">
					<li>
						<a
							class="nav-link {$activeTool === 'nav-coloring' ? 'active' : ''}"
							href="#nav-coloring">Nav Coloring</a
						>
					</li>
					<li>
						<a
							class="nav-link {$activeTool === 'video-generator' ? 'active' : ''}"
							href="#video-generator">Video / Embed generator</a
						>
					</li>
					<li class="non-active">
						<button>Galery generator</button>
					</li>
					<li>
						<a
							class="nav-link {$activeTool === 'media-extractor' ? 'active' : ''}"
							href="#media-extractor"
							>Media Extractor (Iframes and images)</a
						>
					</li>
					<li>
						<a
							class="nav-link {$activeTool === 'image-looper' ? 'active' : ''}"
							href="#image-looper"
							>Image Looper (Custom Image Extractor)</a
						>
					</li>
				</ul>
				{/if}
			</li>
			<!-- Hack-kind -->
			<li class="cat-menu">
				<button class="cat-toggle" on:click={() => toggle('hack')}>Hack-kind</button>
				{#if openCategories.hack}
				<ul class="sub-menu">
					<li>
						<a
							class="nav-link {$activeTool === 'services-hack' ? 'active' : ''}"
							href="#services-hack">Service Fixes</a
						>
					</li>
					<li class="non-active">
						<button>Highlights Fixes</button>
					</li>
				</ul>
				{/if}
			</li>
		</ul>
		<div class="downloads">
			<a class="nav-link" href="#downloads">Downloads</a>
		</div>
	</nav>
	<main class="main">
		{#if $activeTool === 'synchrony-template'}
			<SynchronyTemp />
		{:else if $activeTool === 'epic-protect-template'}
			<EpicProtectTemp />
		{:else if $activeTool === 'CPS-template'}
			<CPSWarranty />
		{:else if $activeTool === 'nav-coloring'}
			<NavColoring />
		{:else if $activeTool === 'video-generator'}
			<VideoLayouts />
		{:else if $activeTool === 'media-extractor'}
			<MediaInfoExtractor />
		{:else if $activeTool === 'services-hack'}
			<ServicesHack />
		{:else if $activeTool === 'downloads'}
			<Downloads />
		{:else if $activeTool === 'image-looper'}
			<ImageLooper />
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
	.side-bar .nav-link {
		display: block;
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
	/* ── Category toggle buttons (top-level) ── */
	.cat-toggle {
		background-color: var(--side-bar-color);
		border: none;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		color: rgba(255, 255, 255, 0.9);
		padding: 0.8rem 1rem 0.8rem 1.2rem;
		width: 100%;
		text-align: left;
		text-transform: uppercase;
		font-size: 1.4rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		&::before {
			content: '›';
			font-size: 1.1rem;
			line-height: 1;
			transition: transform 0.2s ease;
		}
		&:hover {
			background-color: rgba(255, 255, 255, 0.06);
		}
	}
	/* Rotate arrow when sub-menu is open */
	.cat-menu:has(.sub-menu) .cat-toggle::before {
		transform: rotate(90deg);
	}

	/* ── Sub-menu container ── */
	.sub-menu {
		background-color: rgba(0, 0, 0, 0.18);
		border-left: 3px solid var(--side-bar-accent-color);
		margin: 0;
		padding: 0.3rem 0;
	}

	/* ── Sub-menu nav links ── */
	.sub-menu .nav-link {
		padding: 0.5rem 1rem 0.5rem 1.8rem;
		font-size: 0.95rem;
		font-weight: 400;
		border-block: 1px solid rgba(0, 0, 0, 0.12);
		background-color: transparent;
		&:hover {
			background-color: rgba(255, 255, 255, 0.08);
			animation: sideJump 0.3s ease-in-out;
		}
	}
	.side-bar .active {
		background-color: var(--side-bar-button-color-active) !important;
		border-left-color: var(--side-bar-accent-color);
	}
	.main {
		padding: 2rem;
	}
	.downloads {
		margin-top: auto;
		margin-bottom: 2rem;
		background-color: var(--side-bar-accent-color);
		& > .nav-link {
			background-color: transparent;
			color: white;
			width: 100%;
			height: 100%;
			padding: 1rem 2rem;
			border-radius: 0;
			font-size: 1.4rem;
			font-weight: 800;
			border-block: none;
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
