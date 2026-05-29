import { json } from '@sveltejs/kit';
import prisma from '$lib/server/prisma.js';

export async function POST({ request }) {
	const body = await request.json();

	const iteration = await prisma.iteration.create({
		data: {
			skill: body.skill,
			version: body.version,
			summary: body.summary,
			rationale: body.rationale,
			analysis: body.analysis,
			filesChanged: body.filesChanged,
			triggerRunIds: body.triggerRunIds
		}
	});

	return json(iteration, { status: 201 });
}

export async function GET() {
	const iterations = await prisma.iteration.findMany({
		orderBy: { createdAt: 'desc' },
		take: 100
	});
	return json(iterations);
}
