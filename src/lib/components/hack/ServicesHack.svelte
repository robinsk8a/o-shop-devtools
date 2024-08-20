<script>
	import Highlight from 'svelte-highlight';
	import css from 'svelte-highlight/languages/css';
	import { atlas } from 'svelte-highlight/styles';
	import Copy2Clipboard from '../Copy2Clipboard.svelte';

	// let comaSecond = highlighterInit()
	// onMount(highlighterInit)

	let itemNum = 4;
	$: colNum = 4;
	let gridAutoFlow = false;

	let backgroundColorRed = 'background-color: red;';
	
	let layoutStyle = 'inline';
	$: secondRowExtended = layoutStyle === 'second-row-extended'? `grid-column: span ${itemNum - 1};`: '';
	
	/**
	 * Handle layout change event
	 * @param {Event} event - The change event from the select input
	 */
	function handleLayoutChange(event) {
		layoutStyle = event.target.value;
		switch (layoutStyle) {
			case 'inline':
				colNum = itemNum;
				gridAutoFlow = false;
				break;
			case 'rows2':
				colNum = 2;
				gridAutoFlow = true;
				break;
			case 'second-row-extended':
				if (itemNum < 3) {
					itemNum = 3;
				} else {
					colNum = itemNum - 1;
					gridAutoFlow = true;
					break;
				}
		}
	}

	const servicesItems = [
		{
			id: '88fca8fe-a8a6-4872-82a6-2be5888e877d',
			imgSrc: 'images/samples/bathroom.jpg',
			alt: 'Bathroom',
			title: 'Bathroom',
			subtitle: 'Test text',
			description: 'Test description',
			buttonText: 'Learn More'
		},
		{
			id: 'eeb0a749-ca9a-4e81-9890-e58556c3d0de',
			imgSrc: 'images/samples/mattress_hp.jpg',
			alt: 'Mattresses',
			title: 'Mattresses',
			subtitle: 'Test subheading',
			description: 'Test Description',
			buttonText: 'View More'
		},
		{
			id: '97f99ae7-d01e-4643-a8ca-7419fae26269',
			imgSrc: 'images/samples/ironwork.jpg',
			alt: 'Custom Iron Doors & Windows',
			title: 'Custom Iron Doors & Windows',
			subtitle: '',
			description: '',
			buttonText: 'Shop Now'
		},
		{
			id: '8649bc55-9a58-4162-a57e-1b40de0dbf46',
			imgSrc:
				'images/samples/frog-pad-showroom.jpg',
			alt: 'OWN YOUR OWN FROG PAG KITCHEN AND BATH DESIGNER SHOWROOM',
			title: 'OWN YOUR OWN FROG PAG KITCHEN AND BATH DESIGNER SHOWROOM',
			subtitle: '',
			description: '',
			buttonText: 'Shop Now'
		}
	];

	let hackCss = `& > div {
  & > div {
    & > div {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: 1fr auto;
      & > div {
        max-width: 100%;
        grid-row: span 2;
        display: grid;
        grid-template-rows: subgrid;
        & > div {
          grid-row: span 2;
          display: grid;
          grid-template-rows: subgrid;
        }
      }
    }
  }
}
}`;

	let codeIndent = 3;

	$: contentContainer = `display: grid;
${'	'.repeat(codeIndent)}grid-template-columns: repeat(${layoutStyle === 'inline' ? itemNum : colNum}, 1fr);
${'	'.repeat(codeIndent)}grid-template-rows: 1fr auto; ${gridAutoFlow ? '\n\t\t\tgrid-auto-flow: row;' : ''}`;

	let childContainerOne = `max-width: 100%;
  ${'	'.repeat(codeIndent + 1)}grid-row: span 2;
  ${'	'.repeat(codeIndent + 1)}display: grid;
  ${'	'.repeat(codeIndent + 1)}grid-template-rows: subgrid;`;

	let childContainerTwo = `grid-row: span 2;
  ${'	'.repeat(codeIndent + 2)}display: grid;
  ${'	'.repeat(codeIndent + 2)}grid-template-rows: subgrid;`;

	$: finalCSS = `& > div {
	& > div {
		& > div {
			${contentContainer}
			${layoutStyle === 'second-row-extended' ? `& > div:last-child {${secondRowExtended}}` : ''}
			& > div {
				${childContainerOne}
				& > div {
					${childContainerTwo}
				}
			}
			@media screen and (max-width: 1005px) {
				display: grid;
				grid-template-columns: 1fr;
				${layoutStyle === 'second-row-extended' ? '& > * { grid-column: span 1; }' : ''}
			}
		}
	}
}`;
</script>

<svelte:head>
	{@html atlas}
</svelte:head>

<form class="services-section-manager">
	<label for="col-num">Number of items</label>
	<input id="col-num" type="number" min="1" max="4" bind:value={itemNum} />
	<input id="col-num" type="range" min="1" max="4" bind:value={itemNum} />
	<label for="layout">Select Layout Style</label>
	<select name="layout" id="layout" bind:value={layoutStyle} on:change={handleLayoutChange}>
		<option value="inline">Inline (default)</option>
		<option value="rows2">2 rows</option>
		<!-- <option value="second-row-extended">2nd line extended</option> -->
	</select>
</form>
<Copy2Clipboard text={finalCSS} />

<Highlight language={css} code={finalCSS} class="code-box" />

<div class="srvice-section-liveview">
	<div style="position: relative;">
		<!-- Fist css adaptable container -->
		<!-- the FSLAxx class is for the container -->
		<div class="sc-eXsaLi fSLAxx MuiBox-root css-0" data-testid="section-wrapper">
			<!-- Fist flex container used just for center the element -->
			<div class="MuiBox-root css-gmuwbf">
				<div
					class="MuiContainer-root MuiContainer-maxWidthLg sc-jXbUNg cXlowt sc-kbdlSk bhwMBs css-134smbk"
					data-testid="container-section-wrapper"
				>
					<!-- ================================================================= -->
					<!-- Second flex container used to define the elements layout -->
					<div
						class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2 css-1n6kzm8"
						style={contentContainer}
					>
						{#each servicesItems.slice(0, Math.min(Math.max(itemNum, 1), 4)) as item}
							<div
								class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 MuiGrid-grid-lg-4 css-1br4gth"
								style={childContainerOne}
							>
								<div
									class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root sc-dGCmGc hdmwwU sc-fIGJwM cTIRAs css-gq325o"
									id={item.id}
									style={childContainerTwo}
								>
									<img
										src={item.imgSrc}
										alt={item.alt}
										class="sc-deXhhX jywkkK sc-iA-DsXs jSjsGC"
									/>
									<div class="sc-kCMKrZ hZJDNg MuiBox-root css-0" align="left">
										<h2
											class="MuiTypography-root MuiTypography-body1 sc-fqkvVR fLbJvt sc-dQEtJz eyNmZl css-p2t810"
											size="5"
											type="secondary"
										>
											{item.title}
										</h2>
										{#if item.subtitle}
											<p
												class="MuiTypography-root MuiTypography-body1 sc-fqkvVR fimmnS sc-imwsjW kjBNTA css-6cnsq1"
												size="4"
												type="main"
											>
												{item.subtitle}
											</p>
										{/if}
										{#if item.description}
											<p
												class="MuiTypography-root MuiTypography-body1 sc-fqkvVR hdvTJy css-p2t810"
												type="main"
											>
												{item.description}
											</p>
										{/if}
										<div class="sc-dJiZtA bgdeH MuiBox-root css-0">
											<a href="/"
												><button
													class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSm MuiButton-containedSizeSm MuiButton-fullWidth sc-eqUAAy bstEwZ css-1efgpqj"
													tabindex="0"
													type="button"
													appearance="white"
													>{item.buttonText}<span class="MuiTouchRipple-root css-w0pj6f"
													></span></button
												></a
											>
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style scoped>
	:root {
		--swiper-navigation-size: 44px;
	}
	:root {
		--swiper-theme-color: #007aff;
	}
	:root {
		--bs-blue: #0d6efd;
		--bs-indigo: #6610f2;
		--bs-purple: #6f42c1;
		--bs-pink: #d63384;
		--bs-red: #dc3545;
		--bs-orange: #fd7e14;
		--bs-yellow: #ffc107;
		--bs-green: #198754;
		--bs-teal: #20c997;
		--bs-cyan: #0dcaf0;
		--bs-white: #fff;
		--bs-gray: #6c757d;
		--bs-gray-dark: #343a40;
		--bs-gray-100: #f8f9fa;
		--bs-gray-200: #e9ecef;
		--bs-gray-300: #dee2e6;
		--bs-gray-400: #ced4da;
		--bs-gray-500: #adb5bd;
		--bs-gray-600: #6c757d;
		--bs-gray-700: #495057;
		--bs-gray-800: #343a40;
		--bs-gray-900: #212529;
		--bs-primary: #0d6efd;
		--bs-secondary: #6c757d;
		--bs-success: #198754;
		--bs-info: #0dcaf0;
		--bs-warning: #ffc107;
		--bs-danger: #dc3545;
		--bs-light: #f8f9fa;
		--bs-dark: #212529;
		--bs-primary-rgb: 13, 110, 253;
		--bs-secondary-rgb: 108, 117, 125;
		--bs-success-rgb: 25, 135, 84;
		--bs-info-rgb: 13, 202, 240;
		--bs-warning-rgb: 255, 193, 7;
		--bs-danger-rgb: 220, 53, 69;
		--bs-light-rgb: 248, 249, 250;
		--bs-dark-rgb: 33, 37, 41;
		--bs-white-rgb: 255, 255, 255;
		--bs-black-rgb: 0, 0, 0;
		--bs-body-color-rgb: 33, 37, 41;
		--bs-body-bg-rgb: 255, 255, 255;
		--bs-font-sans-serif: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
			'Noto Sans', 'Liberation Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
			'Segoe UI Symbol', 'Noto Color Emoji';
		--bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
			monospace;
		--bs-gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));
		--bs-body-font-family: var(--bs-font-sans-serif);
		--bs-body-font-size: 1rem;
		--bs-body-font-weight: 400;
		--bs-body-line-height: 1.5;
		--bs-body-color: #212529;
		--bs-body-bg: #fff;
	}
	body {
		margin: 0px;
		color: rgb(0, 0, 0);
		font-family: Helvetica, Helvetica;
		font-weight: 400;
		font-size: 1rem;
		line-height: 1.5;
		background-color: rgb(244, 244, 245);
	}
	div {
		display: block;
		unicode-bidi: isolate;
	}
	/* ======================================================================== */
	/* Fist css adaptable container */
	.fSLAxx {
		padding-top: 1.5rem;
		color: rgb(0, 0, 0);
		background-color: #d1d1d1;
	}
	/* Fist css adaptable container */
	/* ======================================================================== */

	.css-gmuwbf {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: center;
		justify-content: center;
	}
	@media (min-width: 960px) {
		.bhwMBs {
			margin-bottom: 1rem;
			margin-top: 1rem;
		}
	}
	.bhwMBs {
		margin-bottom: 0.5rem;
		margin-top: 0.5rem;
		max-width: 1440px !important;
	}

	@media (min-width: 1280px) {
		.cXlowt {
			max-width: 1440px;
		}
	}
	.cXlowt {
		max-width: 1440px;
		margin: auto;
		padding: 2rem 1.5rem;
	}
	@media (min-width: 1280px) {
		.css-134smbk {
			max-width: 1280px;
		}
	}
	@media (min-width: 800px) {
		.css-134smbk {
			padding-left: 24px;
			padding-right: 24px;
		}
	}
	.css-134smbk {
		width: 100%;
		margin-left: auto;
		box-sizing: border-box;
		margin-right: auto;
		display: block;
		padding-left: 16px;
		padding-right: 16px;
	}
	/* Class that defines the layout of the elements */
	.css-1n6kzm8 {
		box-sizing: border-box;
		display: flex;
		flex-flow: wrap;
		margin-top: -16px;
		width: calc(100% + 16px);
		margin-left: -16px;
		-webkit-box-align: stretch;
		align-items: stretch;
		-webkit-box-pack: center;
		justify-content: center;
	}
	/* Class that defines the layout of the elements */

	/* >>> Next section >>> */
	@media (min-width: 640px) {
		.css-1br4gth {
			flex-basis: 100%;
			-webkit-box-flex: 0;
			flex-grow: 0;
			max-width: 100%;
		}
	}
	@media (min-width: 800px) {
		.css-1br4gth {
			flex-basis: 50%;
			-webkit-box-flex: 0;
			flex-grow: 0;
			max-width: 50%;
		}
	}
	@media (min-width: 960px) {
		.css-1br4gth {
			flex-basis: 33.3333%;
			-webkit-box-flex: 0;
			flex-grow: 0;
			max-width: 33.3333%;
		}
	}
	@media (min-width: 960px) {
		.css-1br4gth {
			flex-basis: 33.3333%;
			-webkit-box-flex: 0;
			flex-grow: 0;
			max-width: 33.3333%;
		}
	}
	.css-1n6kzm8 > .MuiGrid-item {
		padding-left: 16px;
	}
	.css-1n6kzm8 > .MuiGrid-item {
		padding-top: 16px;
	}
	.css-1br4gth {
		box-sizing: border-box;
		margin: 0px;
		flex-direction: row;
	}
	/* >>>> Next section >>> */
	.css-gq325o {
		background-color: rgb(255, 255, 255);
		color: rgb(0, 0, 0);
		box-shadow:
			rgba(0, 0, 0, 0.2) 0px 2px 1px -1px,
			rgba(0, 0, 0, 0.14) 0px 1px 1px 0px,
			rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
		transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
		border-radius: 6px;
		overflow: hidden;
	}
	.hdmwwU {
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: rgb(255, 255, 255);
		text-align: center;
		color: inherit;
		box-shadow: unset;
	}
	/* ========================================================================= */
	/* Class that defines the layout of the elements */
	.cTIRAs {
		background: skyblue;
		
	}
	/* Class that defines the layout of the elements */
	/* ========================================================================= */

	*,
	::after,
	::before {
		box-sizing: border-box;
	}
	/* >>>> Next section >>> */
	/* Img Element */
	img,
	svg {
		vertical-align: middle;
	}
	img {
		border-style: none;
	}
	.jywkkK {
		height: 100%;
		width: 100%;
	}
	.jSjsGC {
		height: 320px;
		object-fit: cover;
		width: 100%;
	}
	/* >>>> Next section >>> */
	/* Text contents section */
	.hZJDNg {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 1.5rem;
		height: 100%;
		text-align: left;
	}
	/* Text contents section */

	/* >>>> Next section >>> */
	h2 {
		display: block;
		font-size: 1.5em;
		margin-block-start: 0.83em;
		margin-block-end: 0.83em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		font-weight: bold;
		unicode-bidi: isolate;
	}
	.h1,
	.h2,
	.h3,
	.h4,
	.h5,
	.h6,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin-top: 0;
		margin-bottom: 0.5rem;
		font-weight: 500;
		line-height: 1.2;
	}
	@media (min-width: 1200px) {
		.h2,
		h2 {
			font-size: 2rem;
		}
	}
	.css-p2t810 {
		margin: 0px;
		font-family: Helvetica, Helvetica;
		font-weight: 400;
		font-size: 1rem;
		line-height: 1.5;
	}
	.fLbJvt {
		font-family: Helvetica;
		font-size: 1.562rem;
		font-weight: 700;
	}
	.eyNmZl {
		margin-bottom: 0px;
	}
	/* >>>> Sibiling section >>> */
	p {
		display: block;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		unicode-bidi: isolate;
	}
	p {
		margin-top: 0;
		margin-bottom: 1rem;
	}
	.css-6cnsq1 {
		font-family: Helvetica, Helvetica;
		font-weight: 400;
		font-size: 1rem;
		line-height: 1.5;
		margin: 0px;
	}
	.fimmnS {
		font-family: Helvetica;
		font-size: 1.25rem;
		color: rgb(0, 0, 0);
		font-weight: 500;
	}
	.kjBNTA {
		margin-bottom: 0px;
	}
	/* >>>> Sibiling section >>> */
	p {
		display: block;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		unicode-bidi: isolate;
	}
	p {
		margin-top: 0;
		margin-bottom: 1rem;
	}
	.css-p2t810 {
		margin: 0px;
		font-family: Helvetica, Helvetica;
		font-weight: 400;
		font-size: 1rem;
		line-height: 1.5;
	}
	.hdvTJy {
		font-family: Helvetica;
	}
	/* >>>> Sibiling section >>> */
	/* Link container */
	.bgdeH {
		margin-top: auto;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	/* Link container */

	/* >>> Next section >>> */
	a:-webkit-any-link {
		color: -webkit-link;
		cursor: pointer;
		text-decoration: underline;
	}
	a {
		color: #0d6efd;
		text-decoration: underline;
	}
	a {
		background-color: transparent;
	}
	/* >>> Next section >>> */
	/* Button */
	button {
		appearance: auto;
		/* font-style:;
		font-variant-ligatures:;
		font-variant-caps:;
		font-variant-numeric:;
		font-variant-east-asian:;
		font-variant-alternates:;
		font-variant-position:;
		font-weight:;
		font-stretch:;
		font-size:;
		font-family:;
		font-optical-sizing:;
		font-size-adjust:;
		font-kerning:;
		font-feature-settings:;
		font-variation-settings:; */
		text-rendering: auto;
		color: buttontext;
		letter-spacing: normal;
		word-spacing: normal;
		line-height: normal;
		text-transform: none;
		text-indent: 0px;
		text-shadow: none;
		display: inline-block;
		text-align: center;
		align-items: flex-start;
		cursor: default;
		box-sizing: border-box;
		background-color: buttonface;
		margin: 0em;
		padding-block: 1px;
		padding-inline: 6px;
		border-width: 2px;
		border-style: outset;
		border-color: buttonborder;
		border-image: initial;
	}
	button {
		border-radius: 0;
	}
	button,
	input,
	optgroup,
	select,
	textarea {
		margin: 0;
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
	}
	button,
	select {
		text-transform: none;
	}
	button,
	input,
	optgroup,
	select,
	textarea {
		font-family: inherit;
		font-size: 100%;
		line-height: 1.15;
		margin: 0;
	}
	button,
	input {
		overflow: visible;
	}
	button,
	select {
		text-transform: none;
	}
	.css-1efgpqj {
		display: inline-flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: center;
		justify-content: center;
		position: relative;
		box-sizing: border-box;
		-webkit-tap-highlight-color: transparent;
		cursor: pointer;
		user-select: none;
		vertical-align: middle;
		appearance: none;
		text-transform: none;
		font-family: Helvetica, Helvetica;
		font-weight: 500;
		font-size: 0.875rem;
		line-height: 1.75;
		min-width: 64px;
		color: rgb(255, 255, 255);
		background-color: rgb(25, 118, 210);
		box-shadow:
			rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
			rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
			rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
		width: 100%;
		outline: 0px;
		border-width: 0px;
		border-style: initial;
		border-color: initial;
		border-image: initial;
		margin: 0px;
		text-decoration: none;
		padding: 6px 16px;
		border-radius: 6px;
		transition:
			background-color 250ms cubic-bezier(0.4, 0, 0.2, 1),
			box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1),
			border-color 250ms cubic-bezier(0.4, 0, 0.2, 1),
			color 250ms cubic-bezier(0.4, 0, 0.2, 1);
	}
	[type='button'],
	[type='reset'],
	[type='submit'],
	button {
		-webkit-appearance: button;
	}
	.bstEwZ {
		text-align: center;
		font-family: Helvetica;
		letter-spacing: 1px;
		background: rgb(255, 255, 255);
		border: 2px solid rgb(255, 255, 255);
		color: rgb(0, 0, 0);
		font-size: 0.812rem;
		padding: 0.5rem 0.75rem;
		font-weight: 700;
	}
	[type='button']:not(:disabled),
	[type='reset']:not(:disabled),
	[type='submit']:not(:disabled),
	button:not(:disabled) {
		cursor: pointer;
	}
	/* Button */

	.services-section-manager {
		margin: 1rem;
	}
</style>

