<script lang="ts">
	let { data } = $props();
	let run = $derived(data.run);
	let allRunsForVersion = $derived(data.allRunsForVersion);
	let relatedIterations = $derived(data.relatedIterations);

	function truncate(s: string | null | undefined, n: number) {
		if (!s) return '-';
		return s.length > n ? s.slice(0, n) + '…' : s;
	}
</script>

<h1>Run {run.version}</h1>
<p class="subtitle">{new Date(run.createdAt).toLocaleString()}</p>

<div class="card-grid" style="grid-template-columns: repeat(auto-fit, minmax(140px, 1fr))">
	<div class="card stat">
		<div class="stat-value">{run.model ?? '-'}</div>
		<div class="stat-label">Model</div>
	</div>
	<div class="card stat">
		<div class="stat-value">{run.tokensUsed ?? '-'}</div>
		<div class="stat-label">Tokens</div>
	</div>
	<div class="card stat">
		<div class="stat-value">{run.timeTakenSecs ?? '-'}s</div>
		<div class="stat-label">Duration</div>
	</div>
	<div class="card stat">
		<div class="stat-value">{run.rating != null ? '★'.repeat(run.rating) + '☆'.repeat(5 - run.rating) : '-'}</div>
		<div class="stat-label">Rating</div>
	</div>
	<div class="card stat">
		<div class="stat-value">
			<span class="badge {run.passed ? 'badge-pass' : 'badge-fail'}" style="font-size: 16px; padding: 4px 18px;">
				{run.passed ? 'Passed' : 'Failed'}
			</span>
		</div>
		<div class="stat-label">Result</div>
	</div>
</div>

<div style="display: flex; flex-direction: column; gap: 24px;">
	{#if run.branch}
		<div class="card">
			<h2>Branch</h2>
			{#if run.githubUrl}
				<a href={run.githubUrl} target="_blank">{run.branch}</a>
			{:else}
				<span>{run.branch}</span>
			{/if}
		</div>
	{/if}

	{#if run.prompt}
		<div class="card">
			<h2>Prompt</h2>
			<pre>{run.prompt}</pre>
		</div>
	{/if}

	{#if run.findings}
		<div class="card">
			<h2>Findings</h2>
			<pre>{run.findings}</pre>
		</div>
	{/if}

	{#if allRunsForVersion.length > 1}
		<div class="card">
			<h2>All Runs for {run.version}</h2>
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Model</th>
						<th>Rating</th>
						<th>Passed</th>
					</tr>
				</thead>
				<tbody>
					{#each allRunsForVersion as r}
						<tr>
							<td>{new Date(r.createdAt).toLocaleDateString()}</td>
							<td><a href="/runs/{r.id}">{r.model ?? '-'}</a></td>
							<td>{r.rating != null ? '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating) : '-'}</td>
							<td><span class="badge {r.passed ? 'badge-pass' : 'badge-fail'}">{r.passed ? '✓' : '✗'}</span></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}

	{#if relatedIterations.length > 0}
		<div class="card">
			<h2>Related Iterations</h2>
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Summary</th>
					</tr>
				</thead>
				<tbody>
					{#each relatedIterations as i}
						<tr>
							<td>{new Date(i.createdAt).toLocaleDateString()}</td>
							<td><a href="/iterations/{i.id}">{truncate(i.summary, 80)}</a></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<p style="margin-top: 28px;"><a href="/" style="display: inline-flex; align-items: center; gap: 4px;">&larr; Back to Runs</a></p>
