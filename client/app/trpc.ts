import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@repo/server/src/trpc/router';

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:5001/trpc',
    }),
  ],
}); 