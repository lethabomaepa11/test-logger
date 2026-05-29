<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>Test Tracker</title>
</svelte:head>

<nav>
	<a href="/">Runs</a>
	<a href="/iterations">Iterations</a>
	<a href="/api/runs" target="_blank">API</a>
</nav>

<main>
	{@render children()}
</main>

<style>
	nav { display: flex; gap: 16px; padding: 12px 20px; background: #1a1a2e; }
	nav a { color: #e0e0e0; text-decoration: none; font-size: 14px; font-weight: 500; }
	nav a:hover { color: #fff; }
	main { padding: 20px; }
</style>
