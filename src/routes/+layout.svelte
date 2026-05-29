<script lang="ts">
	import '$lib/../app.css';
	import { page } from '$app/stores';

	let { children } = $props();
</script>

<svelte:head>
	<title>Test Tracker</title>
</svelte:head>

<nav>
	<div class="nav-inner">
		<a href="/" class="brand">
			<span class="brand-icon">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
					<path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
				</svg>
			</span>
			Test Tracker
		</a>
		<div class="links">
			<a href="/" class="link" data-active={$page.url.pathname === '/'}>Runs</a>
			<a href="/iterations" class="link" data-active={$page.url.pathname.startsWith('/iterations')}>Iterations</a>
		</div>
	</div>
</nav>

<main>
	{@render children()}
</main>

<footer>
	<div class="footer-inner">
		<span>Test Tracker &mdash; skill test dashboard</span>
		<a href="/api/runs" target="_blank">API</a>
	</div>
</footer>

<style>
	nav {
		background: var(--bg-primary);
		border-bottom: 1px solid var(--border);
		position: sticky;
		top: 0;
		z-index: 10;
	}
	.nav-inner {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 24px;
		height: 54px;
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 16px;
		font-weight: 700;
		color: var(--text-primary);
	}
	.brand:hover { text-decoration: none; }
	.brand-icon {
		color: var(--orange);
		display: flex;
	}
	.links { display: flex; gap: 4px; }
	.link {
		position: relative;
		font-size: 14px;
		font-weight: 500;
		color: var(--text-secondary);
		padding: 6px 14px;
		border-radius: var(--radius-sm);
		transition: color var(--transition), background var(--transition);
	}
	.link:hover {
		color: var(--orange);
		background: var(--orange-light);
		text-decoration: none;
	}
	.link[data-active="true"] {
		color: var(--orange);
		background: var(--orange-light);
	}
	.link[data-active="true"]::after {
		content: '';
		position: absolute;
		bottom: -14px;
		left: 50%;
		transform: translateX(-50%);
		width: 20px;
		height: 2px;
		background: var(--orange);
		border-radius: 2px;
	}
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 32px 24px;
		min-height: calc(100vh - 98px);
	}
	footer {
		border-top: 1px solid var(--border);
		background: var(--bg-primary);
	}
	.footer-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 16px 24px;
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		color: var(--text-muted);
	}
</style>
