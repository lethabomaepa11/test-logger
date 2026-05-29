<script lang="ts">
	let { data } = $props();
	let iterations = $derived(data.iterations);

	function truncate(s: string | null | undefined, n: number) {
		if (!s) return '-';
		return s.length > n ? s.slice(0, n) + '…' : s;
	}
</script>

<h1>Iterations</h1>
<p class="subtitle">Skill updates prompted by test run findings</p>

{#if iterations.length === 0}
	<div class="card" style="text-align: center; padding: 48px; color: var(--text-muted);">
		No iterations yet. Run <code>npm run iterate</code> from the skill directory to create one.
	</div>
{:else}
	<table>
		<thead>
			<tr>
				<th>Date</th>
				<th>Version</th>
				<th>Summary</th>
				<th>Rationale</th>
				<th>Files Changed</th>
			</tr>
		</thead>
		<tbody>
			{#each iterations as i}
				<tr>
					<td style="white-space: nowrap">{new Date(i.createdAt).toLocaleDateString()}</td>
					<td><a href="/iterations/{i.id}">{i.version}</a></td>
					<td title={i.summary}>{truncate(i.summary, 60)}</td>
					<td title={i.rationale}>{truncate(i.rationale, 80)}</td>
					<td title={i.filesChanged ?? ''}>{truncate(i.filesChanged, 40)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
