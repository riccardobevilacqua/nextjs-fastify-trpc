import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { initTRPC } from '@trpc/server';

export function createContext({ req, res }: CreateFastifyContextOptions) {
  return { req, res };
}

export type Context = ReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure; 