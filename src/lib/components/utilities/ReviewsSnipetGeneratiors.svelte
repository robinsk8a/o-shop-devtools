<script>
	import Copy2Clipboard from '../Copy2Clipboard.svelte';

	const breadcrumbSnippet = `<div class="container">
<div class="row d-none d-sm-block"><nav aria-label="breadcrumb">
<ol class="breadcrumb">
<li class="breadcrumb-item"><a href="/">Home</a></li>
<li class="breadcrumb-item active" aria-current="page">Reviews Showcase</li>
</ol>
</nav></div>
</div>`;

	const titleSnippet = `<div class="container mb-4">
<h1 class="nmg-color-primary fw-bold h1">Reviews Showcase</h1>
<hr class="mb-5"></div>`;
</script>

<div class="container py-4">
	<div class="row row-cols-1 row-cols-md-2 g-4">
		<!-- Breadcrumbs Snippet Column -->
		<div class="col-lg-6">
			<div class="card h-100 shadow-sm border-0 bg-light">
				<div class="card-body d-flex flex-column">
					<div class="d-flex flex-wrap justify-content-between align-items-center mb-0">
						<h5 class="card-title mb-0 fw-bold text-secondary">Breadcrumbs</h5>
						<Copy2Clipboard text={breadcrumbSnippet} />
					</div>
					<pre
						class="bg-white p-3 rounded border text-muted small flex-grow-1 overflow-auto mt-2"><code
							>{breadcrumbSnippet}</code
						></pre>
				</div>
			</div>
		</div>

		<!-- Title Snippet Column -->
		<div class="col-lg-6">
			<div class="card h-100 shadow-sm border-0 bg-light">
				<div class="card-body d-flex flex-column">
					<div class="d-flex flex-wrap justify-content-between align-items-center mb-0">
						<h5 class="card-title mb-0 fw-bold text-secondary">Title & Divider</h5>
						<Copy2Clipboard text={titleSnippet} />
					</div>
					<pre
						class="bg-white p-3 rounded border text-muted small flex-grow-1 overflow-auto mt-2"><code
							>{titleSnippet}</code
						></pre>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Scoped styles can go here if needed, but Bootstrap covers most styling */
	pre {
		margin-bottom: 0;
        max-height: 9rem;
	}
	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
	}
</style>
