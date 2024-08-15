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

<style>
  .view-selector {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-block: 0.5rem;
  }
</style>