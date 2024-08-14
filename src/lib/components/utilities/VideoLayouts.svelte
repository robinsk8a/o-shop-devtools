<!-- <div id="page-content-wrap" class="boxed-container">
	<div class="row">
		<div class="col-md-12">
			<div class="page-header">
				<h1>Videos</h1>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-6 m-b-20">
			<div class="embed-responsive embed-responsive-16by9">
				<iframe
					class="embed-responsive-item"
					src="https://www.youtube.com/embed/yG1-yPKsGQ0?rel=0"
					allowfullscreen="allowfullscreen"
				></iframe>
			</div>
		</div>
		<div class="col-md-6 m-b-20">
			<div class="embed-responsive embed-responsive-16by9">
				<iframe
					class="embed-responsive-item"
					src="https://www.youtube.com/embed/_fWgQ21vOWY?rel=0"
					allowfullscreen="allowfullscreen"
				></iframe>
			</div>
		</div>
		<div class="col-md-6 m-b-20">
			<div class="embed-responsive embed-responsive-16by9">
				<iframe
					class="embed-responsive-item"
					src="https://www.youtube.com/embed/koeenFREJUM?rel=0"
					allowfullscreen="allowfullscreen"
				></iframe>
			</div>
		</div>
	</div>
</div> -->
<script>
	import Highlight from 'svelte-highlight';
	import { css } from 'svelte-highlight/languages';
	import vbscriptHtml from 'svelte-highlight/languages/vbscript-html';
	import atlas from 'svelte-highlight/styles/atlas';

	let videos = [];
	let videoId = 0;
	export let url = '';
	function newVideo() {
		videos = [...videos, { id: videoId++, url: url }];
		url = '';
		console.log(videos);
		return videos;
	}
	function restart() {
		videos = [];
	}
	$: videoCode = videos
		.map((video) => {
			return `<div class="yt-video">
      <iframe
        class="yt-video-link"
        src="${video.url}"
        allowfullscreen="allowfullscreen"></iframe>
    </div>`;
		})
		.join('\n');

	$: videoTemp = `<div class="video-grid container my-3">
  ${videoCode}
</div>`;
</script>

<svelte:head>
	{@html atlas}
</svelte:head>

<form on:submit|preventDefault={newVideo} class="my-3">
	<input type="text" bind:value={url} />
	<input type="submit" value="Add video" />
	<input type="button" value="Restart" on:click={restart} />
</form>

<h5>These are the videos added so far:</h5>
{#each videos as video}
	<p>{video.url}</p>
{/each}

<div class="video-grid container my-3">
	<div class="yt-video">
		<iframe
			class="yt-video-link"
			src="https://www.youtube.com/embed/dsjqjJ5yzS4?rel=0&ecver=1"
			allowfullscreen="allowfullscreen"
		></iframe>
	</div>
</div>
{@html videoTemp}
<Highlight language={vbscriptHtml} code={videoTemp} class="code-box" />

<style>
	.video-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(20rem, 100%), 1fr));
		gap: 1rem;
	}
	.yt-video {
		position: relative;
		overflow: hidden;
		width: 100%;
		padding-top: 56.25%;
	}
	.yt-video-link {
		position: absolute;
		inset: 0;
		width: none;
		width: 100%;
		height: 100%;
	}
</style>
