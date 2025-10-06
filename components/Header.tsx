'use client';

import { TrendingUp } from 'lucide-react';
import { WalletConnect } from './WalletConnect';

export function Header() {
  return (
    <header className="border-b border-border backdrop-blur-sm bg-bg/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-bg" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">YieldPilot</h1>
              <p className="text-xs text-muted">DeFi Yield Optimizer</p>
            </div>
          </div>

          <WalletConnect />
        </div>
      </div>
    </header>
  );
}
