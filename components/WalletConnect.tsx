'use client';

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Wallet, ChevronDown, ExternalLink } from 'lucide-react';

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="btn-secondary flex items-center gap-2"
        >
          <Wallet className="w-4 h-4" />
          <span className="font-mono text-sm">{formatAddress(address)}</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 glass-card rounded-xl p-4 z-50">
            <div className="space-y-3">
              <div className="text-sm text-muted">
                Connected to Base Network
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Address</span>
                <a
                  href={`https://basescan.org/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-accent hover:text-accent-hover text-sm"
                >
                  View on BaseScan
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <button
                onClick={() => {
                  disconnect();
                  setIsDropdownOpen(false);
                }}
                className="w-full btn-secondary text-sm"
              >
                Disconnect Wallet
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="btn-primary flex items-center gap-2"
        disabled={isPending}
      >
        <Wallet className="w-4 h-4" />
        {isPending ? 'Connecting...' : 'Connect Wallet'}
        <ChevronDown className="w-4 h-4" />
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 glass-card rounded-xl p-4 z-50">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold mb-3">Choose Wallet</h3>
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => {
                  connect({ connector });
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent/10 transition-colors duration-200 text-sm"
                disabled={isPending}
              >
                {connector.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

