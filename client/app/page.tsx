'use client';

import { useEffect, useState } from 'react';
import { trpc } from './trpc';

export default function Home() {
  const [apiResponse, setApiResponse] = useState<{ message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [trpcResponse, setTrpcResponse] = useState<string | null>(null);
  const [trpcError, setTrpcError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

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

  const generateText = async () => {
    try {
      setIsGenerating(true);
      const result = await trpc.generateText.mutate({ prompt });
      setGeneratedText(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
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

      <div className="mt-12 w-full max-w-md">
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isGenerating) {
                generateText();
              }
            }}
            placeholder="Enter your prompt..."
            className="flex-1 px-4 py-2 border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none placeholder-indigo-300 text-indigo-900 bg-white"
          />
          <button
            onClick={generateText}
            disabled={isGenerating}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
          >
            {isGenerating ? 'Generating...' : 'Generate'}
          </button>
        </div>

        {generatedText && (
          <div className="mt-4 p-6 bg-indigo-50 border border-indigo-200 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-indigo-900 mb-2">Generated Text:</h2>
            <p className="text-indigo-800 whitespace-pre-wrap">{generatedText}</p>
          </div>
        )}
      </div>
    </main>
  );
}
