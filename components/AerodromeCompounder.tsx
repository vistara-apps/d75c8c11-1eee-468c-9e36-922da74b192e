'use client';

import { useState } from 'react';
import { Zap, TrendingUp, Shield, DollarSign } from 'lucide-react';

interface LPPosition {
  pair: string;
  liquidity: string;
  apy: string;
  rewards: string;
  il: string;
}

const lpPositions: LPPosition[] = [
  { pair: 'ETH/USDC', liquidity: '$28,500', apy: '24.8%', rewards: '$12.45', il: '-0.8%' },
  { pair: 'WETH/DAI', liquidity: '$15,200', apy: '18.2%', rewards: '$6.32', il: '-1.2%' },
];

export function AerodromeCompounder() {
  const [autoCompound, setAutoCompound] = useState(true);
  const [compoundFrequency, setCompoundFrequency] = useState('daily');

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Aerodrome LP Compounder</h2>
        <button className="btn-primary flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Compound All
        </button>
      </div>

      {/* Compound Settings */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Auto-Compound Settings</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoCompound}
                onChange={(e) => setAutoCompound(e.target.checked)}
                className="w-5 h-5 rounded border-border bg-bg/50 checked:bg-accent"
              />
              <span className="text-sm font-medium">Enable Auto-Compound</span>
            </label>
          </div>
          <div>
            <label className="text-sm text-muted mb-2 block">Compound Frequency</label>
            <select
              value={compoundFrequency}
              onChange={(e) => setCompoundFrequency(e.target.value)}
              className="w-full px-4 py-2 bg-bg/50 border border-border rounded-lg focus:outline-none focus:border-accent"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>
      </div>

      {/* LP Positions */}
      <div className="space-y-3">
        {lpPositions.map((position, index) => (
          <div key={index} className="glass-card p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{position.pair}</h3>
                  <p className="text-sm text-muted">Aerodrome LP</p>
                </div>
              </div>
              <button className="btn-secondary text-sm">
                Manage
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted mb-1">Liquidity</p>
                <p className="text-lg font-bold">{position.liquidity}</p>
              </div>
              <div>
                <p className="text-sm text-muted mb-1">APY</p>
                <p className="text-lg font-bold text-accent">{position.apy}</p>
              </div>
              <div>
                <p className="text-sm text-muted mb-1">Pending Rewards</p>
                <p className="text-lg font-bold text-green-400">{position.rewards}</p>
              </div>
              <div>
                <p className="text-sm text-muted mb-1">Impermanent Loss</p>
                <p className={`text-lg font-bold ${
                  parseFloat(position.il) < 0 ? 'text-red-400' : 'text-green-400'
                }`}>
                  {position.il}
                </p>
              </div>
            </div>

            {/* IL Mitigation Info */}
            <div className="flex items-start gap-2 p-3 bg-accent/10 border border-accent/20 rounded-lg">
              <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-accent">IL Mitigation Active</p>
                <p className="text-muted mt-1">
                  Auto-rebalancing enabled to minimize impermanent loss while maximizing yield.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Compound Stats */}
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Compound Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-bg/30 rounded-lg">
            <DollarSign className="w-8 h-8 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold">$1,245.67</p>
            <p className="text-sm text-muted mt-1">Total Compounded</p>
          </div>
          <div className="text-center p-4 bg-bg/30 rounded-lg">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold">+15.8%</p>
            <p className="text-sm text-muted mt-1">Boost vs Manual</p>
          </div>
          <div className="text-center p-4 bg-bg/30 rounded-lg">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold">42</p>
            <p className="text-sm text-muted mt-1">Auto-Compounds</p>
          </div>
        </div>
      </div>
    </section>
  );
}
