import { json } from '@sveltejs/kit';
import prisma from '$lib/server/prisma.js';

export async function POST({ request }) {
	const body = await request.json();

	const run = await prisma.testRun.create({
		data: {
			skill: body.skill,
			version: body.version,
			branch: body.branch,
			githubUrl: body.githubUrl,
			model: body.model,
			prompt: body.prompt,
			tokensUsed: body.tokensUsed ? parseInt(body.tokensUsed) : null,
			timeTakenSecs: body.timeTakenSecs ? parseInt(body.timeTakenSecs) : null,
			rating: body.rating ? parseInt(body.rating) : null,
			passed: body.passed ?? false,
			findings: body.findings
		}
	});

	return json(run, { status: 201 });
}

export async function GET() {
	const runs = await prisma.testRun.findMany({
		orderBy: { createdAt: 'desc' },
		take: 100
	});
	return json(runs);
}
