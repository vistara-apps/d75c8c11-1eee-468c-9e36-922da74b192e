'use client';

import { useTheme } from '@/components/ThemeProvider';
import { TrendingUp } from 'lucide-react';

export default function ThemePreview() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'default', name: 'YieldPilot Finance', description: 'Wall Street meets Crypto' },
    { id: 'celo', name: 'Celo', description: 'Black & Yellow' },
    { id: 'solana', name: 'Solana', description: 'Purple Gradient' },
    { id: 'base', name: 'Base', description: 'Base Blue' },
    { id: 'coinbase', name: 'Coinbase', description: 'Coinbase Blue' },
  ] as const;

  return (
    <main className="min-h-screen bg-gradient-to-br from-bg via-bg to-blue-950 p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gradient">Theme Preview</h1>
          <p className="text-muted">Select a theme to see how YieldPilot looks</p>
        </div>

        {/* Theme Selector */}
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Available Themes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id as any)}
                className={`p-4 rounded-lg text-left transition-all duration-200 ${
                  theme === t.id
                    ? 'bg-accent text-bg'
                    : 'glass-card hover:bg-opacity-20'
                }`}
              >
                <h3 className="font-semibold mb-1">{t.name}</h3>
                <p className={`text-sm ${theme === t.id ? 'text-bg/70' : 'text-muted'}`}>
                  {t.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Preview Components */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Component Preview</h2>
          
          {/* Buttons */}
          <div className="glass-card p-6 rounded-xl space-y-4">
            <h3 className="font-semibold mb-2">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary">Primary Button</button>
              <button className="btn-secondary">Secondary Button</button>
            </div>
          </div>

          {/* Cards */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="font-semibold mb-4">Metric Card</h3>
            <div className="metric-card">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <span className="text-sm font-medium text-green-400">+12.3%</span>
              </div>
              <h3 className="text-sm text-muted mb-1">Total Value Locked</h3>
              <p className="text-2xl font-bold">$125,432.50</p>
            </div>
          </div>

          {/* Typography */}
          <div className="glass-card p-6 rounded-xl space-y-2">
            <h3 className="font-semibold mb-2">Typography</h3>
            <h1 className="text-4xl font-bold">Heading 1</h1>
            <h2 className="text-3xl font-bold">Heading 2</h2>
            <h3 className="text-2xl font-bold">Heading 3</h3>
            <p className="text-fg">Body text in foreground color</p>
            <p className="text-muted">Muted text for secondary information</p>
            <p className="text-accent">Accent text for highlights</p>
          </div>
        </div>
      </div>
    </main>
  );
}
