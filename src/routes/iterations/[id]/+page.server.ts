import prisma from '$lib/server/prisma.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const iteration = await prisma.iteration.findUnique({ where: { id: params.id } });
	if (!iteration) error(404, 'Iteration not found');

	const relatedRuns = iteration.triggerRunIds
		? await prisma.testRun.findMany({
			where: { id: { in: iteration.triggerRunIds.split(',').map(s => s.trim()) } },
			orderBy: { createdAt: 'desc' }
		})
		: [];

	return {
		iteration: { ...iteration, createdAt: iteration.createdAt.toISOString() },
		relatedRuns: relatedRuns.map(r => ({ ...r, createdAt: r.createdAt.toISOString() }))
	};
}
