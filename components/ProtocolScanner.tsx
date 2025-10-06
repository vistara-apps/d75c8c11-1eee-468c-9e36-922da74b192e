'use client';

import { useState } from 'react';
import { Search, TrendingUp, Shield, Zap, ExternalLink } from 'lucide-react';
import { useProtocolData } from '@/hooks/useProtocolData';

export function ProtocolScanner() {
  const { protocols, isLoading } = useProtocolData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProtocols = protocols.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'High': return 'text-red-400';
      default: return 'text-muted';
    }
  };

  const formatAPY = (apy: number) => {
    return `${apy.toFixed(1)}%`;
  };

  const formatTVL = (tvl: string) => {
    // This would format the TVL string properly
    return tvl;
  };

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Cross-Protocol Yield Scanner</h2>
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-20 h-10 bg-bg/50 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="glass-card p-4 rounded-xl animate-pulse">
          <div className="w-full h-12 bg-bg/50 rounded-lg"></div>
        </div>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-card p-6 rounded-xl animate-pulse">
              <div className="w-full h-32 bg-bg/50 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Cross-Protocol Yield Scanner</h2>
        <div className="flex gap-2">
          {['All', 'Lending', 'DEX'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-accent text-bg'
                  : 'glass-card hover:bg-opacity-20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="glass-card p-4 rounded-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            placeholder="Search protocols..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-bg/50 border border-border rounded-lg focus:outline-none focus:border-accent transition-colors duration-200"
          />
        </div>
      </div>

      {/* Protocol List */}
      <div className="space-y-3">
        {filteredProtocols.map((protocol) => (
          <div key={protocol.name} className="glass-card p-6 rounded-xl hover:bg-opacity-15 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${protocol.color}20` }}
                >
                  <TrendingUp className="w-6 h-6" style={{ color: protocol.color }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{protocol.name}</h3>
                  <p className="text-sm text-muted">{protocol.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`https://basescan.org/address/${protocol.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-muted hover:text-accent" />
                </a>
                <button className="btn-primary text-sm">
                  Deploy Position
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted mb-1">APY</p>
                <p className="text-xl font-bold text-accent">{formatAPY(protocol.apy)}</p>
              </div>
              <div>
                <p className="text-sm text-muted mb-1">TVL</p>
                <p className="text-xl font-bold">{formatTVL(protocol.tvl)}</p>
              </div>
              <div>
                <p className="text-sm text-muted mb-1">Risk</p>
                <p className={`text-xl font-bold ${getRiskColor(protocol.risk)}`}>
                  {protocol.risk}
                </p>
              </div>
            </div>

            {/* Yield Bar */}
            <div className="mt-4">
              <div className="h-2 bg-bg/50 rounded-full overflow-hidden">
                <div
                  className="yield-bar"
                  style={{ width: `${Math.min(protocol.apy * 2, 100)}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Risk Indicator */}
            <div className="mt-4 flex items-center gap-2">
              <Shield className={`w-4 h-4 ${
                protocol.risk === 'Low' ? 'text-green-400' :
                protocol.risk === 'Medium' ? 'text-yellow-400' : 'text-red-400'
              }`} />
              <span className="text-sm text-muted">
                {protocol.risk === 'Low' ? 'Conservative yield strategy' :
                 protocol.risk === 'Medium' ? 'Balanced risk-reward' :
                 'High yield potential'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
