<script lang="ts">
	let { data } = $props();
	let runs = $derived(data.runs);
	let stats = $derived(data.stats);

	function truncate(s: string | null | undefined, n: number) {
		if (!s) return '-';
		return s.length > n ? s.slice(0, n) + '…' : s;
	}
</script>

<h1>Runs</h1>
<p class="subtitle">Test results across all skill versions</p>

<div class="card-grid">
	<div class="card stat">
		<div class="stat-value">{stats.total}</div>
		<div class="stat-label">Total Runs</div>
	</div>
	<div class="card stat">
		<div class="stat-value" style="color: var(--success)">{stats.passed}</div>
		<div class="stat-label">Passed</div>
	</div>
	<div class="card stat">
		<div class="stat-value" style="color: var(--danger)">{stats.failed}</div>
		<div class="stat-label">Failed</div>
	</div>
	<div class="card stat">
		<div class="stat-value">{stats.avgRating != null ? stats.avgRating.toFixed(1) : '-'}</div>
		<div class="stat-label">Avg Rating</div>
	</div>
</div>

{#if runs.length === 0}
	<div class="card" style="text-align: center; padding: 48px; color: var(--text-muted);">
		No runs yet. Run <code>npm run test</code> from the skill directory to create one.
	</div>
{:else}
	<table>
		<thead>
			<tr>
				<th>Date</th>
				<th>Version</th>
				<th>Model</th>
				<th>Prompt</th>
				<th>Tokens</th>
				<th>Rating</th>
				<th>Passed</th>
				<th>Findings</th>
			</tr>
		</thead>
		<tbody>
			{#each runs as run}
				<tr>
					<td style="white-space: nowrap">{new Date(run.createdAt).toLocaleDateString()}</td>
					<td><a href="/runs/{run.id}">{run.version}</a></td>
					<td>{run.model ?? '-'}</td>
					<td title={run.prompt ?? ''}>{truncate(run.prompt, 50)}</td>
					<td>{run.tokensUsed ?? '-'}</td>
					<td>{run.rating != null ? '★'.repeat(run.rating) + '☆'.repeat(5 - run.rating) : '-'}</td>
					<td>
						<span class="badge {run.passed ? 'badge-pass' : 'badge-fail'}">
							{run.passed ? '✓' : '✗'}
						</span>
					</td>
					<td title={run.findings ?? ''}>{truncate(run.findings, 60)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
