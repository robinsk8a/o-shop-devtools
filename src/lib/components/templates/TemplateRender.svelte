<script>
	import Copy2Clipboard from "../Copy2Clipboard.svelte";
  import Highlight from "svelte-highlight";
  import vbscriptHtml from "svelte-highlight/languages/vbscript-html";
  import css from "svelte-highlight/languages/css";
  import javascript from "svelte-highlight/languages/javascript";
  import atlas from "svelte-highlight/styles/atlas";
  import { removeComments } from "./shared-functions";



  export let htmlCode= 'Place a code here';
  export let cssCode= 'Place a code here';
  export let jsCode= 'Place a code here';
  $:htmlVar = (htmlCode !== 'Place a code here' && htmlCode !== '') ? true : false;
  $: cssVar = (cssCode !== 'Place a code here' && cssCode !== '') ? true : false;
  $: jsVar = (jsCode !== 'Place a code here' && jsCode !== '') ? true : false;
  
</script>

<svelte:head>
  {@html atlas}
</svelte:head>

{#if !htmlVar && !cssVar && !jsVar}
  <h2 style="color: teal;">No templates at the momment</h2>
{/if}

{#if htmlVar}
  <h2>This is Html</h2>
  <Copy2Clipboard text={removeComments(htmlCode)} />
  <Highlight language={vbscriptHtml} code={htmlCode} />
{/if}

{#if cssVar}
  <h2>This is Css</h2>
  <Copy2Clipboard text={removeComments(cssCode)} />
  <Highlight language={css} code={cssCode} />
{/if}

{#if jsVar}
  <h2>This is Js</h2>
  <Copy2Clipboard text={removeComments(jsCode)} />
  <Highlight language={javascript} code={jsCode} />
{/if}

