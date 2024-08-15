<script>
	import {
		epicProImg,
		epicProtecHtml,
		epicProtecCss,
		epicProtecJs,
		synchImagesLink,
		viewSelector
	} from '$lib/components/templates/templates-stores';
	import { textSelect, injectCss, injectJs } from './shared-functions';
	import TemplateRender from '$lib/components/templates/TemplateRender.svelte';
	import ViewSelector from '../ViewSelector.svelte';
	let example = 'E.g.: ';
	let synchImgInit = 'https://cdn.nmg-platform.com/grayfurniture/media/epic-protection-plan/';
	import { onMount } from 'svelte';


  const headersInteractives = () => {
		const headerEls = document.querySelectorAll('.by-category__item');
		headerEls.forEach((el) => {
			el.addEventListener('click', (event) => {
				// remove active class elements
				const activeEls = document.querySelectorAll('.active');
				activeEls.forEach((activeEl) => {
					activeEl.classList.remove('active');
				});
				// get the target id and add active classes
				const targetId = event.target.id;
				const targetEls = document.querySelectorAll('#' + targetId);
				targetEls.forEach((targetEl) => {
					targetEl.classList.add('active');
				});
			});
		});
	};


	onMount(() => {
		injectCss($epicProtecCss);
    // injectJs(epicProtecJs);
    headersInteractives();
	});
</script>

<section class="epic-protect-template template-section">
	<form class="synchrony-form temp-form">
		<div class="temp-item">
			<label for="synchImagesLink">Epic Protection Plan Images Link</label>
			<p><span class="example-pre">{example}</span>{synchImgInit}</p>
			<p>
				<input
					type="text"
					id="synchImagesLink"
					bind:value={$epicProImg}
					on:focus={textSelect}
				/>/epic-logo.webp
			</p>
		</div>
	</form>

	<ViewSelector optJs={true} />

	<section class="template-viewer">
    {#if $viewSelector === 'liveView'}
      <div style="background-color: white;">{@html $epicProtecHtml}</div>
    {:else if $viewSelector === 'html'}
      <TemplateRender htmlCode={$epicProtecHtml} />
    {:else if $viewSelector === 'css'}
      <TemplateRender cssCode={$epicProtecCss} />
    {:else if $viewSelector === 'js'}
      <TemplateRender jsCode={epicProtecJs} />
    {/if}
  </section>
</section>

<style>
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
