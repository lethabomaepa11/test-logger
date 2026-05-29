import type { PrismaClient } from '@prisma/client';

declare global {
	var __prisma: PrismaClient | undefined;

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
