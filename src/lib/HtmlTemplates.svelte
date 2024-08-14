<script>
  import { onMount } from 'svelte';
  
  /**
 * @type {string}
 */
  export let htmlPath;
  export let urlMediaPath = '%%%PlaceHolder%%%';
  
  let tempHtml = "";
  const loadHtml = async () => {
    try {
        const response = await fetch(htmlPath);
        if (response.ok) {
            tempHtml = await response.text();
        } else {
            tempHtml = 'Error al cargar el archivo HTML.';
        }
    } catch (error) {
        tempHtml = 'Error al realizar la peticion del archivo HTML.';
    }
  }
  onMount(loadHtml);
  // tempHtml = tempHtml.replace('%%%PlaceHolder%%%', urlMediaPath);
</script>

<input type="text" bind:value={urlMediaPath}>

<div class="box-code">
  <pre>
    <code>
      {tempHtml}
    </code>
  </pre>
</div>

<style>
  pre {
    background-color: #f5f5f5;
    padding: 10px;
    border: 1px solid #ddd;
    white-space: pre-wrap; /* Mantiene los saltos de línea */
    word-wrap: break-word; /* Permite el ajuste de línea */
  }
</style>