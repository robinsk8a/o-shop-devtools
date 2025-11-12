<script>
	import {
		CPSImagesLink,
		CPSorganizationName,
		CPSWarrantyHtml,
		CPSWarrantyCss,
		viewSelector,
		epicProtecHtml
	} from '$lib/components/templates/templates-stores';
	import { textSelect, injectCss } from './shared-functions';
	import TemplateRender from '$lib/components/templates/TemplateRender.svelte';
	import ViewSelector from '../ViewSelector.svelte';

	let example = 'E.g.: ';
	let CPSOrgInit = 'SUNRISE APPLIANCE';
	let CPSImgInit = 'https://cdn.nmg-platform.com/neeleyappliance/Warranty';

	import { onMount } from 'svelte';
	onMount(() => {
		injectCss(CPSWarrantyCss);
		if ($viewSelector === 'js') {
			$viewSelector = 'liveView';
		}
	});
</script>

<section class="CPS-template template-section">
	<form class="CPS-form temp-form">
		<div class="temp-item">
			<label for="organizationName">Organization Name</label>
			<p><span class="example-pre">{example}</span>{CPSOrgInit}</p>
			<input
				type="text"
				id="organizationName"
				bind:value={$CPSorganizationName}
				on:focus={textSelect}
			/>
		</div>

		<div class="temp-item">
			<label for="CPSImagesLink">CPS Images Link</label>
			<p><span class="example-pre">{example}</span>{CPSImgInit}</p>
			<p>
				<input
					type="text"
					id="CPSImagesLink"
					bind:value={$CPSImagesLink}
					on:focus={textSelect}
					on:blur={(event) =>
						event.target.value.trim() === '' ? ($CPSImagesLink = 'images/CPS') : $CPSImagesLink}
				/>/landing_heroSYNC.webp
			</p>
		</div>
	</form>
	<ViewSelector />

	<section class="template-viewer">
		{#if $viewSelector === 'liveView'}
			<div style="background-color: white;">{@html $CPSWarrantyHtml}</div>
		{:else if $viewSelector === 'html'}
			<TemplateRender htmlCode={$CPSWarrantyHtml} />
		{:else if $viewSelector === 'css'}
			<TemplateRender cssCode={CPSWarrantyCss} />
		{/if}
	</section>
</section>

<style global>
	.template-viewer {
		max-height: 80svh;
		overflow-y: scroll;
		border-radius: 0.5rem;
		margin: 2rem 1rem;
	}
	.temp-form {
		max-width: 1600px;
		margin-inline: auto;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
		grid-gap: 1rem;
		padding-block: 1rem;
		font-size: 1rem;
		color: rgb(1, 41, 28);
	}
	.temp-form input {
		min-width: 10ch; /* Establece el ancho mínimo */
		max-width: 30ch; /* Establece el ancho máximo */
		width: auto;
		box-sizing: content-box;
		border: none;
		background-color: rgba(225, 255, 245, 0.418);
		padding: 0.5rem;
		color: rgb(4, 48, 33);
	}
	.temp-form p {
		color: rgb(5, 122, 30);
	}
	.temp-form label {
		font-size: 1.2rem;
		color: rgb(0, 120, 189);
		font-weight: bold;
		&::after {
			content: ':';
		}
	}
	.temp-item {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}
	.example-pre {
		color: rgb(209, 56, 0);
	}
</style>
