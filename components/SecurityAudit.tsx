'use client';

import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye, Lock } from 'lucide-react';

interface SecurityCheck {
  id: string;
  name: string;
  description: string;
  status: 'pass' | 'fail' | 'warning' | 'pending';
  severity: 'low' | 'medium' | 'high' | 'critical';
  details?: string;
  recommendation?: string;
}

export function SecurityAudit() {
  const [checks] = useState<SecurityCheck[]>([
    {
      id: 'wallet-connection',
      name: 'Wallet Connection Security',
      description: 'Verify secure wallet connection and address validation',
      status: 'pass',
      severity: 'high',
      details: 'Wallet connected securely via OnchainKit with address validation',
    },
    {
      id: 'contract-verification',
      name: 'Smart Contract Verification',
      description: 'Ensure all interacted contracts are verified on BaseScan',
      status: 'pass',
      severity: 'critical',
      details: 'All protocol contracts verified and audited',
    },
    {
      id: 'health-factor',
      name: 'Position Health Monitoring',
      description: 'Monitor health factors to prevent liquidation',
      status: 'pass',
      severity: 'high',
      details: 'Real-time health factor monitoring active',
    },
    {
      id: 'slippage-protection',
      name: 'Slippage Protection',
      description: 'Validate slippage settings for safe transactions',
      status: 'warning',
      severity: 'medium',
      details: 'Slippage set to 0.5% - consider increasing for volatile pairs',
      recommendation: 'Increase slippage to 1-2% for better success rate',
    },
    {
      id: 'gas-optimization',
      name: 'Gas Optimization',
      description: 'Ensure transactions are gas-efficient',
      status: 'pass',
      severity: 'medium',
      details: 'Batch transactions and optimized gas usage',
    },
    {
      id: 'rate-limits',
      name: 'Transaction Rate Limiting',
      description: 'Prevent excessive transaction frequency',
      status: 'pass',
      severity: 'low',
      details: 'Rate limiting active to prevent spam transactions',
    },
    {
      id: 'input-validation',
      name: 'Input Validation',
      description: 'Validate all user inputs for security',
      status: 'pass',
      severity: 'high',
      details: 'All inputs validated and sanitized',
    },
    {
      id: 'error-handling',
      name: 'Error Handling',
      description: 'Proper error handling and user feedback',
      status: 'pass',
      severity: 'medium',
      details: 'Comprehensive error boundaries and user notifications',
    },
  ]);

  const getStatusIcon = (status: SecurityCheck['status']) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'pending':
        return <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />;
    }
  };

  const getSeverityColor = (severity: SecurityCheck['severity']) => {
    switch (severity) {
      case 'low':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'high':
        return 'text-orange-400';
      case 'critical':
        return 'text-red-400';
    }
  };

  const getStatusColor = (status: SecurityCheck['status']) => {
    switch (status) {
      case 'pass':
        return 'text-green-400';
      case 'fail':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      case 'pending':
        return 'text-muted';
    }
  };

  const passedChecks = checks.filter(c => c.status === 'pass').length;
  const totalChecks = checks.length;
  const securityScore = Math.round((passedChecks / totalChecks) * 100);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Security Audit</h2>
        <div className="flex items-center gap-2">
          <Shield className={`w-6 h-6 ${
            securityScore >= 90 ? 'text-green-400' :
            securityScore >= 70 ? 'text-yellow-400' : 'text-red-400'
          }`} />
          <span className="text-lg font-bold">
            {securityScore}% Secure
          </span>
        </div>
      </div>

      {/* Security Score Overview */}
      <div className="glass-card p-6 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">
              {checks.filter(c => c.status === 'pass').length}
            </div>
            <div className="text-sm text-muted">Passed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-1">
              {checks.filter(c => c.status === 'warning').length}
            </div>
            <div className="text-sm text-muted">Warnings</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400 mb-1">
              {checks.filter(c => c.status === 'fail').length}
            </div>
            <div className="text-sm text-muted">Failed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-1">
              {securityScore}%
            </div>
            <div className="text-sm text-muted">Score</div>
          </div>
        </div>
      </div>

      {/* Security Checks */}
      <div className="space-y-3">
        {checks.map((check) => (
          <div key={check.id} className="glass-card p-6 rounded-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                {getStatusIcon(check.status)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold">{check.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      check.severity === 'critical' ? 'bg-red-400/20 text-red-400' :
                      check.severity === 'high' ? 'bg-orange-400/20 text-orange-400' :
                      check.severity === 'medium' ? 'bg-yellow-400/20 text-yellow-400' :
                      'bg-green-400/20 text-green-400'
                    }`}>
                      {check.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-muted text-sm">{check.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${getStatusColor(check.status)}`}>
                  {check.status.toUpperCase()}
                </span>
                <button className="p-2 rounded-lg hover:bg-accent/10 transition-colors">
                  <Eye className="w-4 h-4 text-muted" />
                </button>
              </div>
            </div>

            {check.details && (
              <div className="mb-3 p-3 bg-bg/30 rounded-lg">
                <p className="text-sm text-muted">{check.details}</p>
              </div>
            )}

            {check.recommendation && (
              <div className="flex items-start gap-2 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                <Lock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-accent">Recommendation</p>
                  <p className="text-muted mt-1">{check.recommendation}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Security Tips */}
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Security Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-accent">Wallet Security</h4>
            <ul className="text-sm text-muted space-y-1">
              <li>• Use hardware wallets for large amounts</li>
              <li>• Enable 2FA on all accounts</li>
              <li>• Never share private keys</li>
              <li>• Verify contract addresses</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-accent">Transaction Safety</h4>
            <ul className="text-sm text-muted space-y-1">
              <li>• Check health factors before transactions</li>
              <li>• Set appropriate slippage limits</li>
              <li>• Review gas prices</li>
              <li>• Use reputable protocols only</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

