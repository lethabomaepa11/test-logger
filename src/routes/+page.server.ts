import prisma from '$lib/server/prisma.js';

export async function load() {
	const runs = await prisma.testRun.findMany({
		orderBy: { createdAt: 'desc' },
		take: 200
	});
	return { runs: runs.map(r => ({
		...r,
		createdAt: r.createdAt.toISOString()
	}))};
}
