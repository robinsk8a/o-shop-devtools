<script>
	import Copy2Clipboard from '../Copy2Clipboard.svelte';
	let primColor = '#039bba';
	let hovColor = '#3cbcdd';
	let textColor = '#FFFFFF';
	let boxShadow = true;


	function hexEdit(event) {
		let input = event.target;
        if (input.value.startsWith('#')) {
            input.setSelectionRange(1, input.value.length);
        } else {
            input.select();
        }
	}


	$: navbars = {
		container: `{"color":"#000000",${boxShadow ? '"box-shadow":"#0000005b 0rem 0.05rem 0.3rem 0",' : ''}"font-weight":"800","border-radius":"0","background-color":"${primColor}"}`,
		item: `{"color":"#444",":hover":{"border":"none","background-color":"#EEE"},"padding":"0.4rem 1rem","font-weight":"400","background-color":"#FFF"}`,
		header: `{"color":"${textColor}",":hover":{"border":"none","border-radius":"0","background-color":"${hovColor}"},"border":"none","padding":"1rem 2rem","margin-block":"0","background-color":"${primColor}"}`
	};
</script>

<section class="nav-coloring">
	<form class="coloring-form">
		<div class="form__item">
			<label for="container-color">Container Color:</label>
			<input id="container-color" type="color" bind:value={primColor} placeholder="container" />
			<input type="text" on:focus={hexEdit} bind:value={primColor} />
		</div>
		<div class="form__item">
			<label for="hover-color">Hover Color:</label>
			<input id="hover-color" type="color" bind:value={hovColor} placeholder="container" />
			<input type="text" bind:value={hovColor} />
		</div>
		<div class="form__item">
			<label for="text-color">Text Color:</label>
			<input id="text-color" type="color" bind:value={textColor} placeholder="container" />
			<input type="text" bind:value={textColor} />
		</div>
		<div class="form__item">
			<label for="box-shadow">Box Shadow:</label>
			<input id="box-shadow" type="checkbox" bind:checked={boxShadow} />
		</div>
	</form>

	<p><strong>NOTE:</strong> The use of box shadow is recommended for the situations where the navigation sub-menu blends with the background.</p>

	<nav
		style="--nav-color: {primColor}; --nav-text-color: {textColor}; --nav-hover-color: {hovColor};"
	>
		<ul>
			<li>Some</li>
			<li>Items</li>
			<li>Need</li>
			<li>To Go</li>
			<li>Here</li>
		</ul>
	</nav>

	<pre><code>{navbars.container}</code></pre>
	<Copy2Clipboard text={navbars.container} />
	<pre><code>{navbars.item}</code></pre>
	<Copy2Clipboard text={navbars.item} />
	<pre><code>{navbars.header}</code></pre>
	<Copy2Clipboard text={navbars.header} />
</section>

<style>
	.nav-coloring {
		max-width: 1600px;
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		grid-gap: 1rem;
		padding-block: 1rem;
		font-size: 1rem;
		color: rgb(1, 41, 28);
	}
	nav ul {
		display: flex;
		justify-content: space-around;
		background-color: var(--side-bar-color);
		color: white;
		font-size: 1.4rem;
		font-weight: 500;
		background-color: var(--nav-color);
		color: var(--nav-text-color);
	}
	nav ul li {
		list-style: none;
		padding: 0.5rem 1rem;
		font-size: 1rem;
		text-align: center;
		cursor: pointer;
		text-transform: capitalize;
	}
	nav ul li:hover {
		background-color: var(--nav-hover-color);
	}
	strong {
		color: rgb(1, 59, 66);
	}
	.coloring-form {
		background-color: rgb(0, 82, 88);
		color: white;
		padding: 2rem;
		border-radius: 0.5rem;
	}
	.coloring-form,
	.form__item {
		display: flex;
		gap: 2rem;
		flex-wrap: wrap;
		align-items: center;
	}
</style>
