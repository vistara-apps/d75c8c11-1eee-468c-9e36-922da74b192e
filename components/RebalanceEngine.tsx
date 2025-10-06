'use client';

import { useState } from 'react';
import { RefreshCw, AlertCircle, CheckCircle2, Settings2 } from 'lucide-react';

interface Position {
  protocol: string;
  type: 'Lending' | 'Borrowing';
  amount: string;
  apy: string;
  health: number;
}

const positions: Position[] = [
  { protocol: 'Aave', type: 'Lending', amount: '$45,000', apy: '12.5%', health: 85 },
  { protocol: 'Moonwell', type: 'Borrowing', amount: '$22,000', apy: '8.2%', health: 72 },
  { protocol: 'Seamless', type: 'Lending', amount: '$38,500', apy: '15.1%', health: 91 },
];

export function RebalanceEngine() {
  const [isRebalancing, setIsRebalancing] = useState(false);
  const [autoRebalance, setAutoRebalance] = useState(true);

  const handleRebalance = () => {
    setIsRebalancing(true);
    setTimeout(() => setIsRebalancing(false), 2000);
  };

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-400';
    if (health >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dynamic Rebalancer</h2>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoRebalance}
              onChange={(e) => setAutoRebalance(e.target.checked)}
              className="w-5 h-5 rounded border-border bg-bg/50 checked:bg-accent"
            />
            <span className="text-sm font-medium">Auto-Rebalance</span>
          </label>
          <button
            onClick={handleRebalance}
            disabled={isRebalancing}
            className="btn-primary flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRebalancing ? 'animate-spin' : ''}`} />
            {isRebalancing ? 'Rebalancing...' : 'Rebalance Now'}
          </button>
        </div>
      </div>

      {/* Rebalance Settings */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <Settings2 className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Rebalance Settings</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-muted mb-2 block">Min Health Factor</label>
            <input
              type="number"
              defaultValue="1.5"
              step="0.1"
              className="w-full px-4 py-2 bg-bg/50 border border-border rounded-lg focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="text-sm text-muted mb-2 block">Target APY</label>
            <input
              type="number"
              defaultValue="15"
              step="0.5"
              className="w-full px-4 py-2 bg-bg/50 border border-border rounded-lg focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="text-sm text-muted mb-2 block">Rebalance Threshold</label>
            <input
              type="number"
              defaultValue="5"
              step="1"
              className="w-full px-4 py-2 bg-bg/50 border border-border rounded-lg focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>

      {/* Active Positions */}
      <div className="space-y-3">
        {positions.map((position, index) => (
          <div key={index} className="glass-card p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${
                  position.type === 'Lending' ? 'bg-green-400' : 'bg-blue-400'
                }`} />
                <div>
                  <h3 className="text-lg font-semibold">{position.protocol}</h3>
                  <p className="text-sm text-muted">{position.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{position.amount}</p>
                <p className="text-sm text-accent">{position.apy} APY</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Health Factor</span>
                <span className={`font-semibold ${getHealthColor(position.health)}`}>
                  {position.health}%
                </span>
              </div>
              <div className="h-2 bg-bg/50 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    position.health >= 80 ? 'bg-green-400' :
                    position.health >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${position.health}%` }}
                />
              </div>
            </div>

            {position.health < 80 && (
              <div className="mt-4 flex items-start gap-2 p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-400">Rebalance Recommended</p>
                  <p className="text-muted mt-1">
                    Position health is below optimal threshold. Consider rebalancing to improve efficiency.
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Rebalance History */}
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Recent Rebalances</h3>
        <div className="space-y-3">
          {[
            { time: '2 hours ago', action: 'Moved $5,000 from Aave to Moonwell', gain: '+2.3% APY' },
            { time: '1 day ago', action: 'Reduced borrowing on Seamless', gain: '+1.8% Health' },
            { time: '3 days ago', action: 'Increased lending on Aave', gain: '+1.5% APY' },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-bg/30 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.action}</p>
                <p className="text-xs text-muted mt-1">{item.time}</p>
              </div>
              <span className="text-sm font-semibold text-green-400">{item.gain}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
