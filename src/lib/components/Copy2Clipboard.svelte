<script>
  export let text = "";
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  }
</script>

<button on:click={() => copyToClipboard(text)}>Copy to Clipboard</button>




