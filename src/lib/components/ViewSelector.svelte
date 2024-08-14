<script>
  import { viewSelector } from "./templates/templates-stores";
  export let optJs = false;
</script>

<div class="view-selector">
  <button on:click={() => viewSelector.set('liveView')}>Live Preview</button>
  <button on:click={() => viewSelector.set('html')}>HTML</button>
  <button on:click={() => viewSelector.set('css')}>CSS</button>
  {#if optJs}
  <button on:click={() => viewSelector.set('js')}>JS</button>
  {/if}
</div>