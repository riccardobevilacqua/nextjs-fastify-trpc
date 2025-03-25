'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [apiResponse, setApiResponse] = useState<{ message: string } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5001/ping")
      .then((res) => res.json())
      .then((data) => setApiResponse(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Next.js + Fastify Integration Test</h1>
      <p className="text-xl text-gray-700 mb-8">If you can see this, the integration is working!</p>
      
      {apiResponse && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-green-800 mb-2">API Response:</h2>
          <p className="text-green-700">{apiResponse.message}</p>
        </div>
      )}

      {error && (
        <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error:</h2>
          <p className="text-red-700">{error}</p>
        </div>
      )}
    </main>
  );
}
