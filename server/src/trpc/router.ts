import { router, publicProcedure } from './context';

export const appRouter = router({
  healthcheck: publicProcedure
    .query(() => {
      return {
        status: 'ok',
        timestamp: new Date().toISOString()
      };
    }),
});

export type AppRouter = typeof appRouter; 