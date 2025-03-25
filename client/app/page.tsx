'use client';

import { useEffect, useState } from 'react';
import { trpc } from './trpc';

export default function Home() {
  const [apiResponse, setApiResponse] = useState<{ message: string } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [trpcResponse, setTrpcResponse] = useState<string | null>(null);
  const [trpcError, setTrpcError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5001/ping")
      .then((res) => res.json())
      .then((data) => setApiResponse(data))
      .catch((err) => setError(err.message));
  }, []);

  const checkTrpc = async () => {
    try {
      const health = await trpc.healthcheck.query();
      setTrpcResponse(`Status: ${health.status} at ${health.timestamp}`);
      setTrpcError(null);
    } catch (e) {
      setTrpcError(e instanceof Error ? e.message : 'Unknown error');
      setTrpcResponse(null);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Next.js + Fastify Integration Test</h1>
      <p className="text-xl text-gray-700 mb-8">If you can see this, the integration is working!</p>
      
      {apiResponse && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-green-800 mb-2">REST API Response:</h2>
          <p className="text-green-700">{apiResponse.message}</p>
        </div>
      )}

      {error && (
        <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-red-800 mb-2">REST Error:</h2>
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="mt-12">
        <button
          onClick={checkTrpc}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test tRPC Connection
        </button>

        {trpcResponse && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-green-800 mb-2">tRPC Response:</h2>
            <p className="text-green-700">{trpcResponse}</p>
          </div>
        )}

        {trpcError && (
          <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-red-800 mb-2">tRPC Error:</h2>
            <p className="text-red-700">{trpcError}</p>
          </div>
        )}
      </div>
    </main>
  );
}
