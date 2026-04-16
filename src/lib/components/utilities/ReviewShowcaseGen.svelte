<script>
	import Copy2Clipboard from '../Copy2Clipboard.svelte';
	import TemplateRender from '../templates/TemplateRender.svelte';
	import ViewSelector from '../ViewSelector.svelte';
	import { viewSelector } from '../templates/templates-stores';
	import ReviewsSnipetGeneratiors from './ReviewsSnipetGeneratiors.svelte';
	import { onMount, tick } from 'svelte';

	let csvFile = null;
	let reviewLimit = 15;
	let selectedStyle = '1';
	let parsedReviews = [];
	let errorMessage = '';

	let fileInput;

	// View/UI State
	let currentHtml = '';
	let currentCss = '';

	const starSvg = `<span class="material-icons" style="color: #FFC107; font-size: 20px;">star</span>`;
	const quoteLeftSvg = `<span class="material-icons" style="color: #ccc; font-size: 18px; transform: scaleX(-1); display: inline-block;">format_quote</span>`;
	const quoteRightSvg = `<span class="material-icons" style="color: #ccc; font-size: 18px;">format_quote</span>`;

	function getStarsHtml(rating) {
		let num = parseInt(rating, 10);
		if (isNaN(num) || num < 1) num = 5;
		if (num > 5) num = 5;
		let html = '';
		for (let i = 0; i < num; i++) {
			html += starSvg;
		}
		return html;
	}

	function getSiteIconHtml(site) {
		const siteLower = (site || '').toLowerCase();
		if (siteLower.includes('google')) {
			return '<img src="https://cdn.nmg-platform.com/Global/additional-resources/reviews/google.svg" alt="Google Logo" class="site-icon-img">';
		} else if (siteLower.includes('facebook')) {
			return '<img src="https://cdn.nmg-platform.com/Global/additional-resources/reviews/facebook.svg" alt="Facebook Logo" class="site-icon-img">';
		} else if (siteLower.includes('yelp')) {
			return '<img src="https://cdn.nmg-platform.com/Global/additional-resources/reviews/yelp.svg" alt="Yelp Logo" class="site-icon-img">';
		}
		// default fallback
		const siteCap = site ? site.charAt(0).toUpperCase() + site.slice(1) : 'Review';
		return `<img src="https://via.placeholder.com/20" alt="${siteCap} Logo" class="site-icon-img">`;
	}

	function parseCSV(text) {
		if (!text) return [];

		// Extract lines ignoring newlines wrapped in double quotes
		const rowStrings = text
			.split(/\r?\n(?=(?:(?:[^"]*"){2})*[^"]*$)/)
			.filter((line) => line.trim() !== '');
		if (rowStrings.length < 2) return [];

		// Split line by commas ignoring commas in double quotes
		const splitLine = (line) => {
			const matches = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g) || [];
			return matches.map((m) => {
				let val = m.startsWith(',') ? m.substring(1) : m;
				val = val.trim();
				if (val.startsWith('"') && val.endsWith('"')) {
					val = val.substring(1, val.length - 1).replace(/""/g, '"');
				}
				return val;
			});
		};

		const headers = splitLine(rowStrings[0]).map((h) => h.trim());
		const jsonResult = [];

		for (let i = 1; i < rowStrings.length; i++) {
			const record = splitLine(rowStrings[i]);
			if (record.length === 0 || (record.length === 1 && record[0] === '')) continue;

			const obj = {};
			for (let j = 0; j < headers.length; j++) {
				obj[headers[j]] = record[j] || '';
			}
			jsonResult.push(obj);
		}

		return jsonResult;
	}

	function handleFileUpload(event) {
		errorMessage = '';
		const file = event.target.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const text = reader.result;
				const jsonData = parseCSV(typeof text === 'string' ? text : '');
				if (jsonData.length === 0) {
					throw new Error('CSV file must contain a header row and at least one data row.');
				}

				const headers = Object.keys(jsonData[0]).map((k) => k.toLowerCase());
				const hasReviewText = headers.some((k) =>
					['review', 'text', 'body', 'content'].includes(k)
				);
				const hasReviewerName = headers.some(
					(k) => k.includes('reviewer') || k.includes('name') || k.includes('author')
				);

				if (!hasReviewText) {
					throw new Error(
						"Missing text column. CSV must contain a 'Review', 'Text', or 'Body' header."
					);
				}
				if (!hasReviewerName) {
					throw new Error(
						"Missing name column. CSV must contain a 'Reviewer', 'Name', or 'Author' header."
					);
				}

				let extracted = [];
				for (const row of jsonData) {
					// Helper to find keys via flexible includes
					const getVal = (keywords) => {
						const key = Object.keys(row).find((k) =>
							keywords.some((kw) => k.toLowerCase().includes(kw.toLowerCase()))
						);
						return key ? row[key] : '';
					};
					// Helper to find keys strictly matching (so 'review' doesn't match 'reviewer')
					const getStrictVal = (keywords) => {
						const key = Object.keys(row).find((k) =>
							keywords.some((kw) => k.toLowerCase() === kw.toLowerCase())
						);
						return key ? row[key] : '';
					};

					let textVal = getStrictVal(['review', 'text', 'body', 'content']);
					if (!textVal || textVal.length < 2) continue; // skip empty reviews

					let dateVal = getVal(['date']);
					let year = String(new Date().getFullYear());
					if (dateVal) {
						let match = dateVal.match(/\d{4}/);
						if (match) year = match[0];
					}

					let ratingStr = String(getVal(['rating', 'stars']) || '5');
					let ratingMatch = ratingStr.match(/\d+/);
					let ratingNum = ratingMatch ? parseInt(ratingMatch[0], 10) : 5;

					let nameVal =
						getStrictVal(['reviewer', 'name', 'author']) ||
						getVal(['reviewer', 'name']) ||
						'Customer';

					extracted.push({
						site: getVal(['site']) || 'Google',
						date: dateVal,
						year: year,
						name: nameVal,
						rating: ratingNum,
						text: textVal
					});
				}

				if (extracted.length === 0) {
					errorMessage =
						'No valid reviews could be extracted. Please check your CSV format and columns.';
				}
				parsedReviews = extracted;
			} catch (error) {
				console.error(error);
				errorMessage =
					'Error parsing CSV file: ' + (error instanceof Error ? error.message : String(error));
			}
		};
		reader.onerror = () => {
			errorMessage = 'Error reading the file. Please try again.';
		};
		reader.readAsText(file);
	}

	function generateStyle1() {
		let html = '<div class="container py-4">\n  <div class="d-flex flex-column gap-4">\n';
		parsedReviews.slice(0, reviewLimit).forEach((rev) => {
			let iconHtml = getSiteIconHtml(rev.site);

			html += `    <div class="review-item-s1 border-bottom pb-4">
      <div class="d-flex gap-1 mb-2">
        ${getStarsHtml(rev.rating)}
      </div>
      <div class="fs-6 lh-base text-secondary mb-3">
        <span class="d-inline-block opacity-50 mx-1">${quoteLeftSvg}</span> ${rev.text} <span class="d-inline-block opacity-50 mx-1">${quoteRightSvg}</span>
      </div>
      <div class="d-flex justify-content-between align-items-center small mb-3">
        <div class="d-flex align-items-center gap-2">
          ${iconHtml}
          <span class="text-muted mx-1">|</span>
          <span class="fw-bold text-dark">${rev.name}</span>
        </div>
        <div class="text-muted">${rev.date}</div>
      </div>
      <div class="p-3 border bg-light text-muted fst-italic small">
        Thanks for sharing your experience!
      </div>
    </div>\n`;
		});
		html += '  </div>\n</div>';
		const css = `@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.site-icon-img {
  width: 16px;
  height: 16px;
  display: inline-block;
}
.review-item-s1:last-child {
  border-bottom: none !important;
  padding-bottom: 0;
}`;
		return { html, css };
	}

	function generateStyle2() {
		let html = '<div class="container py-4">\n  <div class="d-flex flex-column gap-3">\n';
		parsedReviews.slice(0, reviewLimit).forEach((rev) => {
			html += `    <div class="card">
      <div class="card-body">
        <div class="d-flex gap-1 mb-3">
          ${getStarsHtml(rev.rating)}
        </div>
        <div class="lh-lg text-dark mb-4">
          &ldquo;${rev.text}&rdquo;
        </div>
        <div class="small text-secondary fw-medium">
          &mdash; ${rev.name}
        </div>
      </div>
    </div>\n`;
		});
		html += '  </div>\n</div>';

		const css = `@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.site-icon-img {
  width: 16px;
  height: 16px;
  display: inline-block;
}`;
		return { html, css };
	}

	function generateStyle3() {
		let html =
			'<div class="container py-4">\n  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">\n';
		parsedReviews.slice(0, reviewLimit).forEach((rev) => {
			const words = rev.text.split(' ');
			let limit = 7;
			if (words.length < 7) limit = words.length;
			let title = words
				.slice(0, limit)
				.join(' ')
				.replace(/[^a-zA-Z0-9 ]/g, '')
				.toUpperCase();
			let excerpt = rev.text.length > 150 ? rev.text.substring(0, 150) + '...' : rev.text;
			html += `    <div class="col">
      <div class="card h-100">
        <div class="card-body d-flex flex-column">
          <div class="d-flex gap-1 mb-3">
            ${getStarsHtml(rev.rating)}
          </div>
          <h3 class="fw-bolder fs-6 text-dark mb-2">${title}</h3>
          <p class="small lh-lg text-secondary flex-grow-1 mb-4">${excerpt}</p>
          <div class="small fw-bold text-muted">
            <span class="text-dark me-2">${rev.name}</span>
            <span>${getSiteIconHtml(rev.site)} &middot; ${rev.year}</span>
          </div>
        </div>
      </div>
    </div>\n`;
		});
		html += '  </div>\n</div>';

		const css = `@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.site-icon-img {
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
}`;
		return { html, css };
	}

	$: {
		// Trigger reactivity on reviewLimit changes
		reviewLimit;

		let res = { html: '', css: '' };
		if (parsedReviews.length > 0) {
			if (selectedStyle === '1') res = generateStyle1();
			else if (selectedStyle === '2') res = generateStyle2();
			else if (selectedStyle === '3') res = generateStyle3();
		}
		currentHtml = res.html;
		currentCss = res.css;
	}

	onMount(() => {
		if ($viewSelector === 'js') {
			$viewSelector = 'liveView';
		}
	});
</script>

<section class="review-showcase-gen template-section">
	<h2 class="h1 fw-bold mb-5">Review Showcase Generator</h2>

	<!-- Helper Snippets Section -->
	<div class="container-fluid mb-3 px-4">
		<div class="mt-3 border rounded bg-white shadow-sm">
			<ReviewsSnipetGeneratiors />
		</div>
	</div>

	<form class="temp-form" on:submit|preventDefault>
		<div class="row g-4">
			<div class="col-12">
				<label class="form-label" for="csvUpload">Upload Reviews CSV</label>
				<p class="mb-1">
					Expected columns: <code
						>Site, Date Created, Reviewer, Rating, Store Location, Review, Share</code
					>
				</p>
				<input
					class="form-control"
					type="file"
					id="csvUpload"
					accept=".csv"
					bind:this={fileInput}
					on:change={handleFileUpload}
				/>
				{#if errorMessage}
					<div class="alert alert-danger mt-2 mb-0 py-2 fw-medium" role="alert">
						{errorMessage}
					</div>
				{/if}
			</div>
			<div class="col-12 col-md-6 d-flex flex-column gap-2">
				<label class="form-label" for="reviewLimit">Number of Reviews</label>
				<input
					class="form-control"
					type="number"
					id="reviewLimit"
					bind:value={reviewLimit}
					min="1"
					max="100"
				/>
			</div>
			<div class="col-12 col-md-6 d-flex flex-column gap-2">
				<label class="form-label" for="styleSelect">Select Style</label>
				<select class="form-select" id="styleSelect" bind:value={selectedStyle}>
					<option value="1">Style 1 (Nielsen - Stacked List)</option>
					<option value="2">Style 2 (Kerby's - Stacked Cards)</option>
					<option value="3">Style 3 (Hannon - Grid Cards)</option>
				</select>
			</div>
		</div>
	</form>

	<ViewSelector />

	<section class="template-viewer">
		{#if parsedReviews.length === 0}
			<div class="py-5 text-center text-secondary fs-5">
				Please upload a CSV file to generate reviews.
			</div>
		{:else if $viewSelector === 'liveView'}
			<div class="live-preview-container p-4">
				{@html '<style>' + currentCss + '</style>'}
				{@html currentHtml}
			</div>
		{:else if $viewSelector === 'html'}
			<TemplateRender htmlCode={currentHtml} />
		{:else if $viewSelector === 'css'}
			<TemplateRender cssCode={currentCss} />
		{/if}
	</section>
</section>

<style>
	/* Unique layout & brand styles not covered by Bootstrap */
	.template-viewer {
		max-height: 80svh;
		overflow-y: auto;
		border-radius: 0.5rem;
		margin: 2rem 1rem;
		background: #fff;
		border: 1px solid #ddd;
	}
	.live-preview-container {
		background: #fdfdfd;
		color: #000;
	}
	.temp-form {
		max-width: 1600px;
		margin-inline: auto;
		padding: 1.5rem 1rem;
		color: rgb(1, 41, 28);
	}
	/* Brand colors for form controls */
	.temp-form .form-control,
	.temp-form .form-select {
		background-color: rgba(225, 255, 245, 0.418);
		color: rgb(4, 48, 33);
		border: none;
	}
	.temp-form p {
		color: rgb(5, 122, 30);
		font-size: 0.9rem;
	}
	.temp-form p code {
		background: #eef9f2;
		padding: 2px 4px;
		border-radius: 3px;
		color: #025721;
	}
	.temp-form .form-label {
		font-size: 1.1rem;
		color: rgb(0, 120, 189);
		font-weight: bold;
		margin-bottom: 0;
	}
</style>
