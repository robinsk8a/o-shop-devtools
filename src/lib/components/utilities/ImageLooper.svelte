<script>
	import { taggerscript } from 'svelte-highlight/languages';

	const imageLooper = document.getElementById('image-looper-input');

	let imageArray = [];
	let imgGalleryPath = '';
	let customAlt = '';
	let openParentTag = '';
	let closeParentTag = '';
	let openChildTag = '';
	let closeChildTag = '';

	let imgCode = '';

	function extractImageLinks(html) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		let images = Array.from(doc.querySelectorAll('img')).map((img) => img.src);
    if (imageArray.length > 0) {
      imageArray = [];
    }
    images.map((url) => {
      let fileName = extractImageName(url);
      imageArray.push(`<img src="${imgGalleryPath}${fileName}.webp" alt="${customAlt}" />`);
    })
    console.log(imageArray)
		return images;
	}

  function handleLooperPaste(event) {
		event.preventDefault();
		const clipboardData = event.clipboardData || window.clipboardData;
		const pastedData = clipboardData.getData('text/html');
		event.target.value = pastedData;
		extractImageLinks(pastedData)
	}

	function extractImageName(url) {
		const parts = url.split('/');
		const fileName = parts[parts.length - 1];
		const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
		return nameWithoutExtension;
	}


	function formatCode() {
		let imgTagFormat = [];
		if (imageArray.length > 0) {
			imageArray.forEach((image) => {
				const newTag = `${openChildTag}
          ${image}
          ${closeChildTag}`;
				imgTagFormat.push(newTag);
			});
		}
		const newimgCode = `${openParentTag}
      ${imgTagFormat}
      ${closeParentTag}`;
		console.log(newimgCode);
    imgCode = newimgCode;
		return newimgCode;
	}

	function closeHtmlTag(event) {
		const text = event.target.value;
		const tags = text.split('\n');
		const regex = /<([a-zA-Z]+)(?=\s|>)/g;
		const closureTags = tags.map((tag) => {
			const match = tag.match(regex);
			if (match) {
				const tagName = match[0].substring(1); // Remove the '<' character
				return `</${tagName}>`;
			}
			return tag;
		});
		return closureTags.join('\n');
	}

  function copyToClipboard() {
    const code = formatCode();
    navigator.clipboard.writeText(code);
  }
</script>

<div class="image-looper">
	<h3>Image Looper</h3>
	<input
		type="text"
		id="image-path-input"
		placeholder="Paste here your NEW image url path"
		bind:value={imgGalleryPath}
	/>
	<input
		type="text"
		id="custom-alt-input"
		placeholder="Here you can add your custom alt for ALL the images"
		bind:value={customAlt}
	/>
	<textarea
		name="Image Looper"
		id="image-looper-input"
		placeholder="Select and copy to the clipboard your live site's images and paste them here"
		on:paste={handleLooperPaste}
	></textarea>
  <p>Images: {imageArray}</p>
	<textarea
		name="Parent Element"
		id="parent-element-input"
		placeholder="Paste here the the tags or elements that are going to contain your images code"
		bind:value={openParentTag}
		on:blur={(event) => (closeParentTag = closeHtmlTag(event))}
	></textarea>
	<h5>Parent element:</h5>
	<p>{openParentTag} {closeParentTag}</p>
	<textarea
		name="Images aditional tags"
		id="child-element-input"
		placeholder="Paste here additional tags that you want EVERY image be wrapped in with"
		bind:value={openChildTag}
		on:input={(event) => (closeChildTag = closeHtmlTag(event))}
	></textarea>
	<h5>Child element:</h5>
	<p>{openChildTag} {closeChildTag}</p>
	<br />
	<button on:click={formatCode}>Generate code</button>
	<p>Code:</p>
  {#each imgCode.split(',') as line}
    <p>{line}</p>
  {/each}
  <button on:click={copyToClipboard}>Copy to clipboard</button>
</div>

<style>
	.image-looper {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.image-looper input {
		width: 100%;
		height: 2.5rem;
		font-size: 1rem;
		padding: 0.5rem;
	}
	.image-looper textarea {
		width: 100%;
		height: 5lh;
		font-size: 1rem;
		resize: vertical;
		padding: 0.5rem;
	}
</style>