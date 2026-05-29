<script lang="ts">
	let { data } = $props();
	let i = $derived(data.iteration);
	let relatedRuns = $derived(data.relatedRuns);

	function truncate(s: string | null | undefined, n: number) {
		if (!s) return '-';
		return s.length > n ? s.slice(0, n) + '…' : s;
	}
</script>

<h1>Iteration {i.version}</h1>
<p class="subtitle">{new Date(i.createdAt).toLocaleString()}</p>

<div style="display: flex; flex-direction: column; gap: 24px;">
	<div class="card">
		<h2>Summary</h2>
		<p>{i.summary}</p>
	</div>

	{#if i.rationale}
		<div class="card">
			<h2>Rationale</h2>
			<pre>{i.rationale}</pre>
		</div>
	{/if}

	{#if i.analysis}
		<div class="card">
			<h2>Analysis</h2>
			<pre>{i.analysis}</pre>
		</div>
	{/if}

	{#if i.filesChanged}
		<div class="card">
			<h2>Files Changed</h2>
			<pre>{i.filesChanged}</pre>
		</div>
	{/if}

	{#if i.triggerRunIds}
		<div class="card">
			<h2>Triggered by Runs</h2>
			<p style="margin-bottom: 10px; font-size: 13px; color: var(--text-secondary);">IDs: {i.triggerRunIds}</p>
			{#if relatedRuns.length > 0}
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Version</th>
							<th>Rating</th>
							<th>Passed</th>
							<th>Findings</th>
						</tr>
					</thead>
					<tbody>
						{#each relatedRuns as r}
							<tr>
								<td>{new Date(r.createdAt).toLocaleDateString()}</td>
								<td><a href="/runs/{r.id}">{r.version}</a></td>
								<td>{r.rating != null ? '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating) : '-'}</td>
								<td><span class="badge {r.passed ? 'badge-pass' : 'badge-fail'}">{r.passed ? '✓' : '✗'}</span></td>
								<td title={r.findings ?? ''}>{truncate(r.findings, 60)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</div>
	{/if}
</div>

<p style="margin-top: 28px;"><a href="/iterations" style="display: inline-flex; align-items: center; gap: 4px;">&larr; Back to Iterations</a></p>
