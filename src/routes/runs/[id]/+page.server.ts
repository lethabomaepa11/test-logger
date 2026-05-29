import prisma from '$lib/server/prisma.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const run = await prisma.testRun.findUnique({ where: { id: params.id } });
	if (!run) error(404, 'Run not found');

	const allRuns = await prisma.testRun.findMany({
		where: { skill: run.skill, version: run.version },
		orderBy: { createdAt: 'desc' }
	});

	const relatedIterations = await prisma.iteration.findMany({
		where: { skill: run.skill },
		orderBy: { createdAt: 'desc' },
		take: 10
	});

	return {
		run: { ...run, createdAt: run.createdAt.toISOString() },
		allRunsForVersion: allRuns.map(r => ({ ...r, createdAt: r.createdAt.toISOString() })),
		relatedIterations: relatedIterations.map(i => ({ ...i, createdAt: i.createdAt.toISOString() }))
	};
}
