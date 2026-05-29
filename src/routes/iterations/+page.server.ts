import prisma from '$lib/server/prisma.js';

export async function load() {
	const iterations = await prisma.iteration.findMany({
		orderBy: { createdAt: 'desc' },
		take: 200
	});
	return { iterations: iterations.map(i => ({ ...i, createdAt: i.createdAt.toISOString() })) };
}
