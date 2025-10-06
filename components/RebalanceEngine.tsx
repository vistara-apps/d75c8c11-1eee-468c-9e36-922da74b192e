'use client';

import { useState } from 'react';
import { RefreshCw, AlertCircle, CheckCircle2, Settings2, TrendingUp, Zap } from 'lucide-react';
import { useRebalancing } from '@/hooks/useRebalancing';
import { useProtocolData } from '@/hooks/useProtocolData';
import { HealthFactorUtils } from '@/lib/blockchain';

export function RebalanceEngine() {
  const { positions, isLoading: positionsLoading } = useProtocolData();
  const {
    analysis,
    recommendations,
    isAnalyzing,
    analyzePortfolio,
    executeRebalance,
    executeAllRebalances,
    isExecuting,
  } = useRebalancing();

  const [autoRebalance, setAutoRebalance] = useState(true);
  const [isRebalancing, setIsRebalancing] = useState(false);

  const handleRebalance = async () => {
    if (!recommendations.length) return;

    setIsRebalancing(true);
    try {
      await executeAllRebalances();
    } catch (error) {
      console.error('Error executing rebalance:', error);
    } finally {
      setIsRebalancing(false);
    }
  };

  const handleSingleRebalance = async (recommendation: any) => {
    try {
      await executeRebalance(recommendation);
    } catch (error) {
      console.error('Error executing single rebalance:', error);
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-400';
    if (health >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (positionsLoading) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dynamic Rebalancer</h2>
          <div className="w-40 h-10 bg-bg/50 rounded-lg animate-pulse"></div>
        </div>
        <div className="glass-card p-6 rounded-xl animate-pulse">
          <div className="w-full h-32 bg-bg/50 rounded"></div>
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-card p-6 rounded-xl animate-pulse">
              <div className="w-full h-24 bg-bg/50 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

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
            disabled={isRebalancing || !recommendations.length}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRebalancing ? 'animate-spin' : ''}`} />
            {isRebalancing ? 'Rebalancing...' : 'Rebalance Now'}
          </button>
        </div>
      </div>

      {/* Portfolio Analysis */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Portfolio Analysis</h3>
          {isAnalyzing && <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>}
        </div>
        {analysis ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-bg/30 rounded-lg">
              <p className="text-sm text-muted mb-1">Health Factor</p>
              <p className={`text-2xl font-bold ${
                analysis.healthFactor >= 2.0 ? 'text-green-400' :
                analysis.healthFactor >= 1.5 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {analysis.healthFactor.toFixed(2)}
              </p>
              <p className="text-xs text-muted mt-1">
                {HealthFactorUtils.getHealthFactorStatus(analysis.healthFactor)}
              </p>
            </div>
            <div className="text-center p-4 bg-bg/30 rounded-lg">
              <p className="text-sm text-muted mb-1">Total APY</p>
              <p className="text-2xl font-bold text-accent">
                {analysis.totalApy.toFixed(1)}%
              </p>
              <p className="text-xs text-muted mt-1">Weighted average</p>
            </div>
            <div className="text-center p-4 bg-bg/30 rounded-lg">
              <p className="text-sm text-muted mb-1">Risk Score</p>
              <p className={`text-2xl font-bold ${
                analysis.riskScore <= 2 ? 'text-green-400' :
                analysis.riskScore <= 3 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {analysis.riskScore.toFixed(1)}/5
              </p>
              <p className="text-xs text-muted mt-1">
                {analysis.riskScore <= 2 ? 'Conservative' :
                 analysis.riskScore <= 3 ? 'Balanced' : 'Aggressive'}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted">Analyzing portfolio...</p>
          </div>
        )}
      </div>

      {/* Rebalance Recommendations */}
      {recommendations.length > 0 && (
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold">Rebalance Recommendations</h3>
            <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
              {recommendations.length} actions
            </span>
          </div>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-bg/30 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  rec.riskLevel === 'Low' ? 'bg-green-400/20 text-green-400' :
                  rec.riskLevel === 'Medium' ? 'bg-yellow-400/20 text-yellow-400' :
                  'bg-red-400/20 text-red-400'
                }`}>
                  {rec.action === 'deposit' ? '+' :
                   rec.action === 'withdraw' ? '-' :
                   rec.action === 'borrow' ? 'B' : 'R'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{rec.reason}</p>
                  <p className="text-xs text-muted mt-1">
                    {rec.action} {formatCurrency(rec.amount)} {rec.token} on {rec.protocol}
                    {rec.expectedApy > 0 && ` • Expected APY: ${rec.expectedApy.toFixed(1)}%`}
                  </p>
                </div>
                <button
                  onClick={() => handleSingleRebalance(rec)}
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
                  <p className="text-sm text-muted">{position.type} • {position.token}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{formatCurrency(position.amount)}</p>
                <p className="text-sm text-accent">{position.apy}% APY</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Position Health</span>
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
                  <p className="font-medium text-yellow-400">Health Check Required</p>
                  <p className="text-muted mt-1">
                    Position health is below optimal threshold. Rebalancing recommended to maintain portfolio stability.
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
