<script>
	export let text = '';
	/** Controls the button's margin-block. Accepts any valid CSS length (e.g. '0', '0.5rem'). */
	export let marginBlock = '1rem';
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

<button style:--mb={marginBlock} on:click={() => copyToClipboard(text)}>Copy to Clipboard</button>

<style>
	button {
		margin-block: var(--mb, 1rem);
	}
	
</style>
