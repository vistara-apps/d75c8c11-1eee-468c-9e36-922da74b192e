'use client';

import { useState } from 'react';
import { Search, TrendingUp, Shield, Zap } from 'lucide-react';

interface Protocol {
  name: string;
  apy: string;
  tvl: string;
  risk: 'Low' | 'Medium' | 'High';
  category: string;
}

const protocols: Protocol[] = [
  { name: 'Aave', apy: '12.5%', tvl: '$2.4B', risk: 'Low', category: 'Lending' },
  { name: 'Aerodrome', apy: '24.8%', tvl: '$890M', risk: 'Medium', category: 'DEX' },
  { name: 'Moonwell', apy: '15.2%', tvl: '$450M', risk: 'Low', category: 'Lending' },
  { name: 'BaseSwap', apy: '32.1%', tvl: '$120M', risk: 'High', category: 'DEX' },
  { name: 'Seamless', apy: '18.7%', tvl: '$340M', risk: 'Medium', category: 'Lending' },
];

export function ProtocolScanner() {
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
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{protocol.name}</h3>
                  <p className="text-sm text-muted">{protocol.category}</p>
                </div>
              </div>
              <button className="btn-primary text-sm">
                Deploy
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted mb-1">APY</p>
                <p className="text-xl font-bold text-accent">{protocol.apy}</p>
              </div>
              <div>
                <p className="text-sm text-muted mb-1">TVL</p>
                <p className="text-xl font-bold">{protocol.tvl}</p>
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
                  style={{ width: `${parseFloat(protocol.apy)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
