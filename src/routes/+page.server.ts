import prisma from '$lib/server/prisma.js';

export async function load() {
	const runs = await prisma.testRun.findMany({
		orderBy: { createdAt: 'desc' },
		take: 200
	});

	const total = runs.length;
	const passed = runs.filter(r => r.passed).length;
	const ratings = runs.filter(r => r.rating != null).map(r => r.rating!);
	const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length) : null;
	const recentFailed = runs.filter(r => !r.passed).slice(0, 3);

	return {
		runs: runs.map(r => ({ ...r, createdAt: r.createdAt.toISOString() })),
		stats: { total, passed, failed: total - passed, avgRating, recentFailed }
	};
}
