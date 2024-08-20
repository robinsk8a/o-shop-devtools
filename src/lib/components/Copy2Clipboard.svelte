<script>
	export let text = '';
/**
 * Copies the given text to the clipboard and updates the button appearance for 1 second.
 *
 * @param {string} text - The text to be copied to the clipboard.
 * @return {void}
 */
export function copyToClipboard(text) {
	navigator.clipboard.writeText(text);
	const button = event.target;
	button.style.background = 'green';
	button.innerText = 'Copied!';
	setTimeout(() => {
		button.style.background = '';
		button.innerText = 'Copy to Clipboard';
	}, 1000);
}
</script>

<button on:click={() => copyToClipboard(text)}>Copy to Clipboard</button>

<style>
	button {
		margin-block: 1rem;
	}
	
</style>
