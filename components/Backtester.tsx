'use client';

import { useState } from 'react';
import { TrendingUp, BarChart3, Play, Settings, AlertCircle } from 'lucide-react';
import { useBacktester } from '@/hooks/useBacktester';
import { BacktestStrategy, BacktestScenario } from '@/lib/backtester';

export function Backtester() {
  const {
    results,
    isRunning,
    runBacktest,
    getMarketAnalysis,
    getAvailableStrategies,
  } = useBacktester();

  const [scenario, setScenario] = useState<BacktestScenario>({
    initialCapital: 10000,
    duration: 90,
    strategies: [],
    marketConditions: 'sideways',
  });

  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);

  const availableStrategies = getAvailableStrategies();
  const marketAnalysis = getMarketAnalysis();

  const handleRunBacktest = async () => {
    const selectedStrategyObjects = availableStrategies.filter(s =>
      selectedStrategies.includes(s.name)
    );

    const testScenario: BacktestScenario = {
      ...scenario,
      strategies: selectedStrategyObjects,
    };

    await runBacktest(testScenario);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

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
        <h2 className="text-2xl font-bold">Gas-Optimized Backtester</h2>
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full text-sm ${
            marketAnalysis.condition === 'bull' ? 'bg-green-400/20 text-green-400' :
            marketAnalysis.condition === 'bear' ? 'bg-red-400/20 text-red-400' :
            'bg-blue-400/20 text-blue-400'
          }`}>
            {marketAnalysis.condition.toUpperCase()} MARKET ({marketAnalysis.confidence.toFixed(0)}% confidence)
          </div>
        </div>
      </div>

      {/* Market Analysis */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Market Analysis</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted mb-2">Current Conditions</p>
            <p className="text-lg font-semibold capitalize">{marketAnalysis.condition} Market</p>
            <p className="text-sm text-muted mt-1">
              Confidence: {marketAnalysis.confidence.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted mb-2">Key Trends</p>
            <ul className="text-sm space-y-1">
              {marketAnalysis.trends.map((trend, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                  {trend}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Backtest Configuration */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <Settings className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Backtest Configuration</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-sm text-muted mb-2 block">Initial Capital</label>
            <input
              type="number"
              value={scenario.initialCapital}
              onChange={(e) => setScenario(prev => ({
                ...prev,
                initialCapital: Number(e.target.value)
              }))}
              className="w-full px-4 py-2 bg-bg/50 border border-border rounded-lg focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="text-sm text-muted mb-2 block">Duration (Days)</label>
            <input
              type="number"
              value={scenario.duration}
              onChange={(e) => setScenario(prev => ({
                ...prev,
                duration: Number(e.target.value)
              }))}
              className="w-full px-4 py-2 bg-bg/50 border border-border rounded-lg focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="text-sm text-muted mb-2 block">Market Conditions</label>
            <select
              value={scenario.marketConditions}
              onChange={(e) => setScenario(prev => ({
                ...prev,
                marketConditions: e.target.value as any
              }))}
              className="w-full px-4 py-2 bg-bg/50 border border-border rounded-lg focus:outline-none focus:border-accent"
            >
              <option value="bull">Bull Market</option>
              <option value="bear">Bear Market</option>
              <option value="sideways">Sideways Market</option>
            </select>
          </div>
        </div>

        {/* Strategy Selection */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3">Select Strategies to Test</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {availableStrategies.map((strategy) => (
              <div
                key={strategy.name}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedStrategies.includes(strategy.name)
                    ? 'border-accent bg-accent/10'
                    : 'border-border hover:border-accent/50'
                }`}
                onClick={() => {
                  setSelectedStrategies(prev =>
                    prev.includes(strategy.name)
                      ? prev.filter(s => s !== strategy.name)
                      : [...prev, strategy.name]
                  );
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-sm">{strategy.name}</h5>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    strategy.riskLevel === 'Low' ? 'bg-green-400/20 text-green-400' :
                    strategy.riskLevel === 'Medium' ? 'bg-yellow-400/20 text-yellow-400' :
                    'bg-red-400/20 text-red-400'
                  }`}>
                    {strategy.riskLevel}
                  </span>
                </div>
                <p className="text-xs text-muted mb-2">{strategy.description}</p>
                <p className="text-sm font-semibold text-accent">
                  Expected APY: {strategy.expectedApy.toFixed(1)}%
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleRunBacktest}
          disabled={isRunning || selectedStrategies.length === 0}
          className="btn-primary flex items-center gap-2 disabled:opacity-50"
        >
          <Play className={`w-4 h-4 ${isRunning ? 'animate-pulse' : ''}`} />
          {isRunning ? 'Running Backtest...' : 'Run Backtest'}
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Backtest Results</h3>

          {results.map((result, index) => (
            <div key={index} className="glass-card p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">{result.strategy}</h4>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    result.netReturn > 0 ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'
                  }`}>
                    {result.netReturn > 0 ? '+' : ''}{formatCurrency(result.netReturn)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted mb-1">Annualized Return</p>
                  <p className={`text-lg font-bold ${
                    result.annualizedReturn > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {result.annualizedReturn > 0 ? '+' : ''}{formatPercentage(result.annualizedReturn)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Max Drawdown</p>
                  <p className="text-lg font-bold text-red-400">
                    -{formatPercentage(result.maxDrawdown)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Sharpe Ratio</p>
                  <p className="text-lg font-bold text-accent">
                    {result.sharpeRatio.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Win Rate</p>
                  <p className="text-lg font-bold text-green-400">
                    {formatPercentage(result.winRate)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted">
                <span>Total Trades: {result.totalTrades}</span>
                <span>Gas Cost: {formatCurrency(result.gasCost)}</span>
              </div>

              {result.netReturn < 0 && (
                <div className="mt-4 flex items-start gap-2 p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-400">Underperforming Strategy</p>
                    <p className="text-muted mt-1">
                      This strategy resulted in losses. Consider adjusting parameters or market conditions.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

