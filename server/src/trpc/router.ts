import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';


import { router, publicProcedure } from './context';

export const appRouter = router({
  healthcheck: publicProcedure
    .query(() => {
      return {
        status: 'ok',
        timestamp: new Date().toISOString()
      };
    }),
  generateText: publicProcedure
    .input(z.object({
      prompt: z.string(),
    }))
    .mutation(async ({ input }) => {
      const { text } = await generateText({
        model: openai('gpt-3.5-turbo'),
        prompt: input.prompt,
      });
      return text;
    }),
});

export type AppRouter = typeof appRouter; 