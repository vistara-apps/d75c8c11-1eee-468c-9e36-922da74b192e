'use client';

import { useState } from 'react';
import { Zap, TrendingUp, Shield, DollarSign, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useCompounder } from '@/hooks/useCompounder';
import { ILUtils } from '@/lib/blockchain';

export function AerodromeCompounder() {
  const {
    positions,
    analysis,
    autoCompound,
    setAutoCompound,
    compoundFrequency,
    setCompoundFrequency,
    executeCompound,
    executeAllCompounds,
    isExecuting,
  } = useCompounder();

  const [isCompounding, setIsCompounding] = useState(false);

  const handleCompoundAll = async () => {
    if (!analysis?.actions.length) return;

    setIsCompounding(true);
    try {
      await executeAllCompounds();
    } catch (error) {
      console.error('Error compounding:', error);
    } finally {
      setIsCompounding(false);
    }
  };

  const handleSingleCompound = async (action: any) => {
    try {
      await executeCompound(action);
    } catch (error) {
      console.error('Error executing compound action:', error);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Aerodrome LP Compounder</h2>
        <button
          onClick={handleCompoundAll}
          disabled={isCompounding || !analysis?.actions.length}
          className="btn-primary flex items-center gap-2 disabled:opacity-50"
        >
          <Zap className={`w-4 h-4 ${isCompounding ? 'animate-spin' : ''}`} />
          {isCompounding ? 'Compounding...' : 'Compound All'}
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

      {/* Compound Actions */}
      {analysis?.actions && analysis.actions.length > 0 && (
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold">Compound Actions</h3>
            <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
              {analysis.actions.length} pending
            </span>
          </div>
          <div className="space-y-3">
            {analysis.actions.map((action, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-bg/30 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  action.action === 'compound' ? 'bg-green-400/20 text-green-400' :
                  action.action === 'rebalance' ? 'bg-yellow-400/20 text-yellow-400' :
                  'bg-blue-400/20 text-blue-400'
                }`}>
                  {action.action === 'compound' ? 'C' :
                   action.action === 'rebalance' ? 'R' : 'H'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{action.reason}</p>
                  <p className="text-xs text-muted mt-1">
                    {action.action} {formatCurrency(action.amount)} • Expected yield: {formatCurrency(action.expectedYield)}/day
                  </p>
                </div>
                <button
                  onClick={() => handleSingleCompound(action)}
                  disabled={isExecuting}
                  className="btn-secondary text-xs px-3 py-1"
                >
                  Execute
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LP Positions */}
      <div className="space-y-3">
        {positions.map((position, index) => (
          <div key={index} className="glass-card p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{position.pair}</h3>
                  <p className="text-sm text-muted">Aerodrome LP • {position.token0}/{position.token1}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {position.pendingRewards >= 10 && (
                  <div className="px-2 py-1 bg-green-400/20 text-green-400 text-xs rounded-full">
                    Ready to compound
                  </div>
                )}
                <button className="btn-secondary text-sm">
                  Manage
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted mb-1">Liquidity</p>
                <p className="text-lg font-bold">{formatCurrency(position.liquidity)}</p>
              </div>
              <div>
                <p className="text-sm text-muted mb-1">APY</p>
                <p className="text-lg font-bold text-accent">{position.apy.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-muted mb-1">Pending Rewards</p>
                <p className="text-lg font-bold text-green-400">{formatCurrency(position.pendingRewards)}</p>
              </div>
              <div>
                <p className="text-sm text-muted mb-1">Impermanent Loss</p>
                <p className={`text-lg font-bold ${ILUtils.getILColor(position.impermanentLoss)}`}>
                  {ILUtils.formatIL(position.impermanentLoss)}
                </p>
              </div>
            </div>

            {/* IL Status */}
            <div className="flex items-start gap-2 p-3 bg-accent/10 border border-accent/20 rounded-lg">
              <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-accent">IL Protection Active</p>
                <p className="text-muted mt-1">
                  Monitoring impermanent loss. Auto-rebalancing enabled to minimize losses while maximizing yield.
                </p>
              </div>
            </div>

            {/* IL Warning */}
            {Math.abs(position.impermanentLoss) > 2 && (
              <div className="mt-3 flex items-start gap-2 p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-400">IL Threshold Exceeded</p>
                  <p className="text-muted mt-1">
                    Consider rebalancing to reduce impermanent loss exposure.
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Compound Stats */}
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Compound Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-bg/30 rounded-lg">
            <DollarSign className="w-8 h-8 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold">
              {formatCurrency(analysis?.totalPendingRewards || 0)}
            </p>
            <p className="text-sm text-muted mt-1">Pending Rewards</p>
          </div>
          <div className="text-center p-4 bg-bg/30 rounded-lg">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold">
              {ILUtils.formatIL(analysis?.totalIL || 0)}
            </p>
            <p className="text-sm text-muted mt-1">Net IL Impact</p>
          </div>
          <div className="text-center p-4 bg-bg/30 rounded-lg">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold">
              {analysis?.gasSavings ? formatCurrency(analysis.gasSavings * 0.000000001) : '$0.00'}
            </p>
            <p className="text-sm text-muted mt-1">Gas Savings</p>
          </div>
        </div>

        {/* Auto-compound status */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${autoCompound ? 'bg-green-400' : 'bg-gray-400'}`}></div>
              <span className="text-sm font-medium">
                Auto-Compound: {autoCompound ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <span className="text-sm text-muted capitalize">
              {compoundFrequency} compounding
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
