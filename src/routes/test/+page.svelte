<script>
	import { onMount } from 'svelte';

	let htmlContent = '';
	let extractedContent = '';

	function handlePaste(event) {
		event.preventDefault();
		const clipboardData = event.clipboardData || window.clipboardData;
		const pastedData = clipboardData.getData('text/html');
		htmlContent = pastedData;
		extractContent(pastedData);
	}

	function extractContent(html) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		const links = Array.from(doc.querySelectorAll('a')).map(a => a.href);
		const images = Array.from(doc.querySelectorAll('img')).map(img => img.src);
		const iframes = Array.from(doc.querySelectorAll('iframe')).map(iframe => iframe.src);

		extractedContent = `
			Links:
			${links.map(link => `- ${link}`).join('\n')}
			
			Images:
			${images.map(src => `- ${src}`).join('\n')}
			
			Iframes:
			${iframes.map(src => `- ${src}`).join('\n')}
		`;
	}

	onMount(() => {
		document.addEventListener('paste', handlePaste);
	});

</script>

<h3>Hello and welcome to</h3>
<h2>The Experimental Page</h2>

<p>TextArea to HTML</p>
<textarea
	name="HTML Text Input"
	bind:value={htmlContent}
></textarea>

<p>Extracted Content:</p>
<pre>{extractedContent}</pre>

<style>
	textarea {
		width: 100%;
		height: 200px;
		font-size: 1rem;
		resize: vertical;
	}
</style>