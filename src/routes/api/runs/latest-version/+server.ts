import { json } from '@sveltejs/kit';
import prisma from '$lib/server/prisma.js';

export async function GET({ url }) {
	const skill = url.searchParams.get('skill') || 'shesha-form-edit';

	const last = await prisma.testRun.findFirst({
		where: { skill },
		orderBy: { createdAt: 'desc' },
		select: { version: true }
	});

	return json({ version: last?.version ?? null });
}
