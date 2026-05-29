<script lang="ts">
	let { data } = $props();

	let runs = $state(data.runs);
</script>

<h1>Test Runs</h1>
<p style="margin-top: -12px; font-size: 13px; color: #666;">See <a href="/iterations">iterations</a> for skill updates prompted by these runs.</p>

{#if runs.length === 0}
	<p>No runs yet.</p>
{:else}
	<table>
		<thead>
			<tr>
				<th>Date</th>
				<th>Skill</th>
				<th>Version</th>
				<th>Branch</th>
				<th>Model</th>
				<th>Prompt</th>
				<th>Tokens</th>
				<th>Time (s)</th>
				<th>Rating</th>
				<th>Passed</th>
				<th>Findings</th>
			</tr>
		</thead>
		<tbody>
			{#each runs as run}
				<tr>
					<td>{new Date(run.createdAt).toLocaleDateString()}</td>
					<td>{run.skill}</td>
					<td>{run.version}</td>
					<td>
						{#if run.githubUrl}
							<a href={run.githubUrl}>{run.branch}</a>
						{:else}
							{run.branch}
						{/if}
					</td>
					<td>{run.model ?? '-'}</td>
					<td title={run.prompt ?? ''}>{run.prompt ? run.prompt.slice(0, 40) + (run.prompt.length > 40 ? '…' : '') : '-'}</td>
					<td>{run.tokensUsed ?? '-'}</td>
					<td>{run.timeTakenSecs ?? '-'}</td>
					<td>{run.rating != null ? '★'.repeat(run.rating) + '☆'.repeat(5 - run.rating) : '-'}</td>
					<td>{run.passed ? '✓' : '✗'}</td>
					<td>{run.findings ?? '-'}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

<style>
	table { width: 100%; border-collapse: collapse; }
	th, td { padding: 6px 10px; border-bottom: 1px solid #eee; text-align: left; font-size: 13px; }
	th { position: sticky; top: 0; background: #f5f5f5; }
	a { color: #0066cc; text-decoration: none; }
	a:hover { text-decoration: underline; }
</style>
