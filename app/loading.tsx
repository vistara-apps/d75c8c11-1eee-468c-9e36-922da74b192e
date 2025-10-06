export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg to-blue-950 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-muted">Loading YieldPilot...</p>
      </div>
    </div>
  );
}
