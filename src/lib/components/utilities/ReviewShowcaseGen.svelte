<script>
	import Copy2Clipboard from '../Copy2Clipboard.svelte';
	import TemplateRender from '../templates/TemplateRender.svelte';
	import ViewSelector from '../ViewSelector.svelte';
	import { viewSelector } from '../templates/templates-stores';
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

	const starSvg = `<svg viewBox="0 0 24 24" fill="#FFC107" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
	const quoteLeftSvg = `<svg fill="#ccc" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>`;
	const quoteRightSvg = `<svg fill="#ccc" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.57-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/></svg>`;

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
			return '<img src="https://img.freepik.com/free-psd/adorable-yellow-rubber-ducky-toy-bath-time-fun_191095-77534.jpg?semt=ais_hybrid&w=740&q=80" alt="Google Logo" class="site-icon-img">';
		} else if (siteLower.includes('facebook')) {
			return '<img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Facebook Logo" class="site-icon-img">';
		} else if (siteLower.includes('yelp')) {
			return '<img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Yelp_Logo.svg" alt="Yelp Logo" class="site-icon-img">';
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
		let html = '<div class="reviews-s1-container">\n';
		parsedReviews.slice(0, reviewLimit).forEach((rev) => {
			let iconHtml = getSiteIconHtml(rev.site);

			html += `  <div class="review-item-s1">
    <div class="review-stars-s1">
      ${getStarsHtml(rev.rating)}
    </div>
    <div class="review-text-s1">
      <span class="r-quote-s1-l">${quoteLeftSvg}</span> ${rev.text} <span class="r-quote-s1-r">${quoteRightSvg}</span>
    </div>
    <div class="review-footer-s1">
      <div class="reviewer-info-s1">
        ${iconHtml}
        <span class="separator-s1">|</span>
        <span class="reviewer-name-s1">${rev.name}</span>
      </div>
      <div class="review-date-s1">${rev.date}</div>
    </div>
    <div class="review-reply-s1">
      Thanks for sharing your experience!
    </div>
  </div>\n`;
		});
		html += '</div>';
		const css = `.reviews-s1-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  font-family: sans-serif;
}
.review-item-s1 {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 1.5rem;
}
.review-item-s1:last-child {
  border-bottom: none;
}
.review-stars-s1 {
  margin-bottom: 0.8rem;
  display: flex;
  gap: 0.2rem;
}
.review-text-s1 {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #333;
  margin-bottom: 1rem;
}
.r-quote-s1-l, .r-quote-s1-r {
  display: inline-block;
  opacity: 0.5;
  margin: 0 4px;
}
.review-footer-s1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  margin-bottom: 0.8rem;
}
.reviewer-info-s1 {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.reviewer-info-s1 i {
  font-size: 1.1rem;
}
.site-icon-img {
  width: 16px;
  height: 16px;
  display: inline-block;
}
.separator-s1 {
  color: #ccc;
  margin: 0 0.1rem;
}
.reviewer-name-s1 {
  font-weight: bold;
  color: #222;
}
.review-date-s1 {
  color: #888;
}
.review-reply-s1 {
  background-color: #f7f7f7;
  padding: 1rem;
  border: 1px solid #eaeaea;
  color: #aaa;
  font-style: italic;
  font-size: 0.85rem;
}`;
		return { html, css };
	}

	function generateStyle2() {
		let html = '<div class="reviews-s2-container">\n';
		parsedReviews.slice(0, reviewLimit).forEach((rev) => {
			html += `  <div class="review-card-s2">
    <div class="review-stars-s2">
      ${getStarsHtml(rev.rating)}
    </div>
    <div class="review-text-s2">
      "${rev.text}"
    </div>
    <div class="reviewer-name-s2">
      - ${rev.name}
    </div>
  </div>\n`;
		});
		html += '</div>';

		const css = `.reviews-s2-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
  font-family: serif;
}
.review-card-s2 {
  border: 1px solid #eaeaea;
  padding: 1.5rem 2rem;
  border-radius: 4px;
  background-color: #fff;
}
.review-stars-s2 {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.2rem;
}
.review-text-s2 {
  font-size: 1rem;
  line-height: 1.6;
  color: #222;
  margin-bottom: 1.5rem;
}
.reviewer-name-s2 {
  font-size: 0.95rem;
  color: #444;
  font-weight: 500;
}`;
		return { html, css };
	}

	function generateStyle3() {
		let html = '<div class="reviews-s3-container">\n';
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
			html += `  <div class="review-grid-card-s3">
    <div class="review-stars-s3">
      ${getStarsHtml(rev.rating)}
    </div>
    <h3 class="review-title-s3">${title}</h3>
    <p class="review-text-s3">${excerpt}</p>
    <div class="reviewer-footer-s3">
      <span class="name-s3">${rev.name}</span> <span class="site-detail-s3">${getSiteIconHtml(rev.site)} &middot; ${rev.year}</span>
    </div>
  </div>\n`;
		});
		html += '</div>';

		const css = `.reviews-s3-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: sans-serif;
}
.review-grid-card-s3 {
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 1.5rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
.review-stars-s3 {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.2rem;
}
.review-title-s3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 800;
  color: #111;
}
.review-text-s3 {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 2rem;
  flex-grow: 1;
}
.reviewer-footer-s3 {
  font-size: 0.75rem;
  font-weight: 700;
  color: #777;
}
.name-s3 {
  color: #000;
  margin-right: 0.5rem;
}
.site-icon-img {
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
}`;
		return { html, css };
	}

	$: {
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
	<form class="rs-form temp-form" on:submit|preventDefault>
		<div class="temp-item full-width">
			<label for="csvUpload">Upload Reviews CSV</label>
			<p>
				Expected columns: <code
					>Site, Date Created, Reviewer, Rating, Store Location, Review, Share</code
				>
			</p>
			<input
				type="file"
				id="csvUpload"
				accept=".csv"
				bind:this={fileInput}
				on:change={handleFileUpload}
			/>
			{#if errorMessage}
				<div class="error-msg">{errorMessage}</div>
			{/if}
		</div>
		<div class="temp-item">
			<label for="reviewLimit">Number of Reviews</label>
			<input type="number" id="reviewLimit" bind:value={reviewLimit} min="1" max="100" />
		</div>
		<div class="temp-item">
			<label for="styleSelect">Select Style</label>
			<select id="styleSelect" bind:value={selectedStyle}>
				<option value="1">Style 1 (Nielsen - Stacked List)</option>
				<option value="2">Style 2 (Kerby's - Stacked Cards)</option>
				<option value="3">Style 3 (Hannon - Grid Cards)</option>
			</select>
		</div>
	</form>
	<ViewSelector />

	<section class="template-viewer">
		{#if parsedReviews.length === 0}
			<div class="empty-state">Please upload a CSV file to generate reviews.</div>
		{:else if $viewSelector === 'liveView'}
			<div class="live-preview-container">
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
	.template-viewer {
		max-height: 80svh;
		overflow-y: auto;
		border-radius: 0.5rem;
		margin: 2rem 1rem;
		background: #fff;
		border: 1px solid #ddd;
	}
	.empty-state {
		padding: 4rem;
		text-align: center;
		color: #777;
		font-size: 1.2rem;
	}
	.live-preview-container {
		padding: 2rem;
		background: #fdfdfd;
		color: #000;
	}
	.temp-form {
		max-width: 1600px;
		margin-inline: auto;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
		grid-gap: 1.5rem;
		padding: 1.5rem 1rem;
		font-size: 1rem;
		color: rgb(1, 41, 28);
	}
	.full-width {
		grid-column: 1 / -1;
	}
	.temp-form input[type='number'],
	.temp-form select {
		width: 100%;
		box-sizing: border-box;
		border: none;
		background-color: rgba(225, 255, 245, 0.418);
		padding: 0.8rem;
		color: rgb(4, 48, 33);
		border-radius: 4px;
		font-size: 1rem;
	}
	.temp-form input[type='file'] {
		padding: 0.8rem 0;
	}
	.temp-form p {
		color: rgb(5, 122, 30);
		margin: 0.2rem 0;
		font-size: 0.9rem;
	}
	.temp-form p code {
		background: #eef9f2;
		padding: 2px 4px;
		border-radius: 3px;
		color: #025721;
	}
	.temp-form label {
		font-size: 1.1rem;
		color: rgb(0, 120, 189);
		font-weight: bold;
	}
	.temp-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.error-msg {
		background-color: #fee2e2;
		color: #991b1b;
		padding: 0.8rem;
		border-radius: 4px;
		border: 1px solid #f87171;
		margin-top: 0.5rem;
		font-weight: 500;
	}
</style>
