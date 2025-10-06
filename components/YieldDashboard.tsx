'use client';

import { useState } from 'react';
import { TrendingUp, DollarSign, Percent, Activity } from 'lucide-react';

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
  const [totalValue] = useState('$125,432.50');
  const [apy] = useState('18.4%');
  const [dailyEarnings] = useState('$62.15');
  const [activePositions] = useState('7');

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Portfolio Overview</h2>
        <button className="btn-secondary text-sm">
          Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Value Locked"
          value={totalValue}
          change="+12.3%"
          icon={<DollarSign className="w-6 h-6 text-accent" />}
        />
        <MetricCard
          title="Average APY"
          value={apy}
          change="+2.1%"
          icon={<Percent className="w-6 h-6 text-accent" />}
        />
        <MetricCard
          title="Daily Earnings"
          value={dailyEarnings}
          change="+8.5%"
          icon={<TrendingUp className="w-6 h-6 text-accent" />}
        />
        <MetricCard
          title="Active Positions"
          value={activePositions}
          change="+1"
          icon={<Activity className="w-6 h-6 text-accent" />}
        />
      </div>

      {/* Yield Chart Placeholder */}
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Yield Performance (30 Days)</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {Array.from({ length: 30 }).map((_, i) => {
            const height = Math.random() * 100;
            return (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-accent/50 to-accent rounded-t"
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-4 text-sm text-muted">
          <span>30 days ago</span>
          <span>Today</span>
        </div>
      </div>
    </section>
  );
}
