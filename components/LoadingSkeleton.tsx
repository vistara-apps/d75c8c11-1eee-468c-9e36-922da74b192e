'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-bg/50",
        className
      )}
    />
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="metric-card animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-accent/10"></div>
        <div className="w-16 h-6 bg-bg/50 rounded"></div>
      </div>
      <div className="w-20 h-4 bg-bg/50 rounded mb-1"></div>
      <div className="w-24 h-8 bg-bg/50 rounded"></div>
    </div>
  );
}

export function ProtocolCardSkeleton() {
  return (
    <div className="glass-card p-6 rounded-xl animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-accent/10"></div>
          <div className="space-y-2">
            <div className="w-24 h-4 bg-bg/50 rounded"></div>
            <div className="w-16 h-3 bg-bg/50 rounded"></div>
          </div>
        </div>
        <div className="w-24 h-10 bg-bg/50 rounded-lg"></div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-1">
            <div className="w-12 h-3 bg-bg/50 rounded"></div>
            <div className="w-16 h-5 bg-bg/50 rounded"></div>
          </div>
        ))}
      </div>
      <div className="w-full h-2 bg-bg/50 rounded-full"></div>
    </div>
  );
}

export function PositionCardSkeleton() {
  return (
    <div className="glass-card p-6 rounded-xl animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-bg/50"></div>
          <div className="space-y-2">
            <div className="w-20 h-4 bg-bg/50 rounded"></div>
            <div className="w-16 h-3 bg-bg/50 rounded"></div>
          </div>
        </div>
        <div className="text-right space-y-1">
          <div className="w-20 h-5 bg-bg/50 rounded"></div>
          <div className="w-16 h-4 bg-bg/50 rounded"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="w-24 h-3 bg-bg/50 rounded"></div>
          <div className="w-12 h-4 bg-bg/50 rounded"></div>
        </div>
        <div className="w-full h-2 bg-bg/50 rounded-full"></div>
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="glass-card p-6 rounded-xl animate-pulse">
      <div className="w-48 h-6 bg-bg/50 rounded mb-4"></div>
      <div className="h-64 flex items-end justify-between gap-2 mb-4">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-accent/20 to-accent/10 rounded-t"
            style={{ height: `${Math.random() * 60 + 20}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <div className="w-20 h-4 bg-bg/50 rounded"></div>
        <div className="w-16 h-4 bg-bg/50 rounded"></div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="glass-card p-6 rounded-xl animate-pulse">
      <div className="w-32 h-6 bg-bg/50 rounded mb-4"></div>
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex items-center justify-between p-3 bg-bg/30 rounded-lg">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="space-y-1">
                <div className="w-16 h-3 bg-bg/50 rounded"></div>
                <div className="w-20 h-4 bg-bg/50 rounded"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

