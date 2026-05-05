<script>
	import Copy2Clipboard from '../Copy2Clipboard.svelte';

	const snippets = [
		{
			id: 'breadcrumbs',
			title: 'Reviews Breadcrumbs',
			code: `<div class="container">
<div class="row d-none d-sm-block"><nav aria-label="breadcrumb">
<ol class="breadcrumb">
<li class="breadcrumb-item"><a href="/">Home</a></li>
<li class="breadcrumb-item active" aria-current="page">Reviews Showcase</li>
</ol>
</nav></div>
</div>`
		},
		{
			id: 'title-divider',
			title: 'Reviews Title and Divider',
			code: `<div class="container mb-4">
<h1 class="nmg-color-primary fw-bold h1">Reviews Showcase</h1>
<hr></div>`
		}
	];

	/** @type {null | typeof snippets[0]} */
	let activeSnippet = null;

	function openModal(snippet) {
		activeSnippet = snippet;
	}

	function closeModal() {
		activeSnippet = null;
	}

	/** @param {KeyboardEvent} e */
	function handleBackdropKey(e) {
		if (e.key === 'Escape') closeModal();
	}
</script>

<!-- Snippet Cards -->
<div class="container py-3">
	<div class="row row-cols-1 row-cols-md-2 g-3">
		{#each snippets as snippet (snippet.id)}
			<div class="col">
				<div class="snippet-card card h-100 border-0 shadow-sm">
					<div class="card-body d-flex flex-column justify-content-between gap-3">
						<h5 class="snippet-title mb-0">{snippet.title}</h5>
						<div class="d-flex gap-2 flex-wrap">
							<Copy2Clipboard marginBlock="0" text={snippet.code} />
							<button
								type="button"
								class="btn btn-open-snippet"
								on:click={() => openModal(snippet)}
							>
								<span class="material-icons" aria-hidden="true">code</span>
								Open Snippet
							</button>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<!-- Modal -->
{#if activeSnippet}
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<div
		class="snippet-backdrop"
		role="dialog"
		aria-modal="true"
		aria-label="{activeSnippet.title} snippet"
		on:click|self={closeModal}
		on:keydown={handleBackdropKey}
	>
		<div class="snippet-modal">
			<div class="snippet-modal-header">
				<span class="snippet-modal-title">{activeSnippet.title}</span>
				<button
					type="button"
					class="btn-modal-close"
					aria-label="Close snippet"
					on:click={closeModal}
				>
					<span class="material-icons">close</span>
				</button>
			</div>
			<pre class="snippet-code"><code>{activeSnippet.code}</code></pre>
			<div class="snippet-modal-footer">
				<Copy2Clipboard text={activeSnippet.code} />
				<button type="button" class="btn btn-modal-dismiss" on:click={closeModal}> Close </button>
			</div>
		</div>
	</div>
{/if}

<style>
	@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

	/* ── Card ── */
	.snippet-card {
		background: #f8fffe;
		border-left: 3px solid #0078bd !important;
		transition: box-shadow 0.2s ease;
	}
	.snippet-card:hover {
		box-shadow: 0 4px 16px rgba(0, 120, 189, 0.12) !important;
	}
	.snippet-title {
		font-size: 0.95rem;
		font-weight: 700;
		color: rgb(1, 41, 28);
	}

	/* ── Open Snippet button ── */
	.btn-open-snippet {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.85rem;
		font-weight: 600;
		padding: 0.35rem 0.8rem;
		border: 1.5px solid #0078bd;
		border-radius: 0.4rem;
		color: #0078bd;
		background: transparent;
		transition:
			background 0.18s ease,
			color 0.18s ease;
	}
	.btn-open-snippet:hover {
		background: #0078bd;
		color: #fff;
	}
	.btn-open-snippet .material-icons {
		font-size: 1rem;
	}

	/* ── Backdrop ── */
	.snippet-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.45);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1055;
		padding: 1rem;
		animation: fade-in 0.15s ease;
	}
	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* ── Modal ── */
	.snippet-modal {
		background: #fff;
		border-radius: 0.6rem;
		box-shadow: 0 8px 40px rgba(0, 0, 0, 0.18);
		width: 100%;
		max-width: 680px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		animation: slide-up 0.18s ease;
	}
	@keyframes slide-up {
		from {
			transform: translateY(12px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
	.snippet-modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.85rem 1.1rem;
		border-bottom: 1px solid #e9ecef;
		background: #f0f9ff;
	}
	.snippet-modal-title {
		font-weight: 700;
		font-size: 0.95rem;
		color: rgb(0, 120, 189);
	}
	.btn-modal-close {
		display: flex;
		align-items: center;
		background: transparent;
		border: none;
		color: #6c757d;
		padding: 0.2rem;
		border-radius: 0.3rem;
		cursor: pointer;
		transition:
			color 0.15s ease,
			background 0.15s ease;
	}
	.btn-modal-close:hover {
		color: #dc3545;
		background: #fff0f0;
	}
	.snippet-code {
		margin: 0;
		padding: 1rem 1.1rem;
		background: #f8f9fa;
		border-top: none;
		border-bottom: 1px solid #e9ecef;
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
		font-size: 0.8rem;
		color: #025721;
		max-height: 55vh;
		overflow-y: auto;
		white-space: pre-wrap;
		word-break: break-all;
	}
	.snippet-modal-footer {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.75rem 1.1rem;
		background: #fff;
		justify-content: flex-end;
	}
	.btn-modal-dismiss {
		font-size: 0.85rem;
		font-weight: 600;
		padding: 0.35rem 1rem;
		border: 1.5px solid #adb5bd;
		border-radius: 0.4rem;
		color: #6c757d;
		background: transparent;
		transition:
			background 0.15s ease,
			color 0.15s ease;
	}
	.btn-modal-dismiss:hover {
		background: #6c757d;
		color: #fff;
	}
</style>
