import { Header } from '@/components/Header';
import { YieldDashboard } from '@/components/YieldDashboard';
import { ProtocolScanner } from '@/components/ProtocolScanner';
import { RebalanceEngine } from '@/components/RebalanceEngine';
import { AerodromeCompounder } from '@/components/AerodromeCompounder';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-bg via-bg to-blue-950">
      <Header />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-12">
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="text-gradient">YieldPilot</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Maximize your DeFi yields on Base with intelligent automation
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="protocol-badge">
              <span className="text-accent">●</span> Dynamic Rebalancing
            </div>
            <div className="protocol-badge">
              <span className="text-accent">●</span> LP Compounding
            </div>
            <div className="protocol-badge">
              <span className="text-accent">●</span> Cross-Protocol Scanning
            </div>
          </div>
        </section>

        {/* Main Dashboard */}
        <YieldDashboard />

        {/* Protocol Scanner */}
        <ProtocolScanner />

        {/* Rebalance Engine */}
        <RebalanceEngine />

        {/* Aerodrome Compounder */}
        <AerodromeCompounder />
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted">
          <p>YieldPilot - Powered by Base • Built with OnchainKit</p>
        </div>
      </footer>
    </main>
  );
}
