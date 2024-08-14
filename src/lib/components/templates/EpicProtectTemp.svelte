<script>
  	import {
		epicProImg,
		epicProtecHtml,
		epicProtecCss,
		viewSelector,
	} from '$lib/components/templates/templates-stores';
	import { textSelect, injectCss, injectJs } from './shared-functions';
	import TemplateRender from '$lib/components/templates/TemplateRender.svelte';
  import ViewSelector from '../ViewSelector.svelte';
  import { epicProtecJs } from '$lib/components/templates/templates-stores';

	import { onMount } from 'svelte';
	onMount(() => {
		injectCss($epicProtecCss);
    injectJs(epicProtecJs);
	});
</script>



<div style="background-color: white;">{@html $epicProtecHtml}</div>
<p>{$epicProtecHtml}</p>  
<TemplateRender htmlCode={$epicProtecHtml} cssCode={$epicProtecCss} />
<p>{$epicProtecCss}</p>
