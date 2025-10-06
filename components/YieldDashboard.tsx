'use client';

import { useState } from 'react';
import { TrendingUp, DollarSign, Percent, Activity, RefreshCw } from 'lucide-react';
import { useYieldData } from '@/hooks/useYieldData';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  positive?: boolean;
}

function MetricCard({ title, value, change, icon, positive = true }: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
          {icon}
        </div>
        <span className={`text-sm font-medium ${positive ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-sm text-muted mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export function YieldDashboard() {
  const { metrics, history, isLoading } = useYieldData();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Trigger refetch
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Portfolio Overview</h2>
          <div className="w-32 h-10 bg-bg/50 rounded-lg animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="metric-card animate-pulse">
              <div className="w-full h-20 bg-bg/50 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Portfolio Overview</h2>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="btn-secondary text-sm flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Value Locked"
          value={formatCurrency(metrics.totalValue)}
          change="+12.3%"
          icon={<DollarSign className="w-6 h-6 text-accent" />}
        />
        <MetricCard
          title="Average APY"
          value={formatPercentage(metrics.totalAPY)}
          change="+2.1%"
          icon={<Percent className="w-6 h-6 text-accent" />}
        />
        <MetricCard
          title="Daily Earnings"
          value={formatCurrency(metrics.dailyEarnings)}
          change="+8.5%"
          icon={<TrendingUp className="w-6 h-6 text-accent" />}
        />
        <MetricCard
          title="Active Positions"
          value={metrics.activePositions.toString()}
          change="+1"
          icon={<Activity className="w-6 h-6 text-accent" />}
        />
      </div>

      {/* Yield Chart */}
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Yield Performance (30 Days)</h3>
        <div className="h-64 flex items-end justify-between gap-1">
          {history.slice(-30).map((data, i) => {
            const maxValue = Math.max(...history.map(d => d.value));
            const height = (data.value / maxValue) * 100;
            return (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-accent/50 to-accent rounded-t min-w-[2px] hover:from-accent/70 hover:to-accent transition-all duration-200"
                style={{ height: `${Math.max(height, 2)}%` }}
                title={`${data.date}: ${formatCurrency(data.value)}`}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-4 text-sm text-muted">
          <span>30 days ago</span>
          <span>Today</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted">Total Growth: </span>
            <span className="text-green-400 font-semibold">
              +{formatCurrency(history[history.length - 1]?.value - history[0]?.value || 0)}
            </span>
          </div>
          <div>
            <span className="text-muted">Avg Daily: </span>
            <span className="text-accent font-semibold">
              {formatCurrency(history.reduce((sum, d) => sum + d.earnings, 0) / history.length || 0)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
