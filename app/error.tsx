'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg to-blue-950 flex items-center justify-center">
      <div className="glass-card p-8 rounded-xl max-w-md text-center space-y-4">
        <h2 className="text-2xl font-bold text-accent">Something went wrong!</h2>
        <p className="text-muted">{error.message}</p>
        <button
          onClick={reset}
          className="btn-primary w-full"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
