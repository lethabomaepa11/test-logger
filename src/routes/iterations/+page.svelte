<script lang="ts">
	let { data } = $props();

	let iterations = $state(data.iterations);

	function truncate(s: string, n: number) {
		return s.length > n ? s.slice(0, n) + '…' : s;
	}
</script>

<h1>Iterations</h1>

{#if iterations.length === 0}
	<p>No iterations yet.</p>
{:else}
	<table>
		<thead>
			<tr>
				<th>Date</th>
				<th>Version</th>
				<th>Summary</th>
				<th>Rationale</th>
				<th>Analysis</th>
				<th>Files Changed</th>
				<th>Triggered By</th>
			</tr>
		</thead>
		<tbody>
			{#each iterations as i}
				<tr>
					<td>{new Date(i.createdAt).toLocaleDateString()}</td>
					<td>{i.version}</td>
					<td title={i.summary}>{truncate(i.summary, 50)}</td>
					<td title={i.rationale}>{truncate(i.rationale, 60)}</td>
					<td title={i.analysis}>{truncate(i.analysis, 80)}</td>
					<td title={i.filesChanged ?? ''}>{i.filesChanged ? truncate(i.filesChanged, 50) : '-'}</td>
					<td title={i.triggerRunIds ?? ''}>{i.triggerRunIds ? truncate(i.triggerRunIds, 40) : '-'}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

<style>
	table { width: 100%; border-collapse: collapse; }
	th, td { padding: 6px 10px; border-bottom: 1px solid #eee; text-align: left; font-size: 13px; vertical-align: top; }
	th { position: sticky; top: 0; background: #f5f5f5; }
</style>
