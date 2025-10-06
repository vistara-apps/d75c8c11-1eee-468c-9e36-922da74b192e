# YieldPilot 🏆

**AI-Powered DeFi Yield Optimization on Base**

YieldPilot is a comprehensive DeFi yield optimization platform that dynamically rebalances lending/borrowing positions and automates LP reward compounding, making it effortless to earn optimal yields on the Base network.

![YieldPilot](https://img.shields.io/badge/YieldPilot-DeFi-blue?style=for-the-badge)
![Base Network](https://img.shields.io/badge/Network-Base-orange?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)

## ✨ Features

### 🚀 Dynamic Rebalancing Engine
- **Health Factor Monitoring**: Real-time position health tracking
- **Automated Rebalancing**: AI-driven position optimization
- **Risk Management**: Intelligent risk assessment and mitigation
- **Gas Optimization**: Minimize transaction costs

### 🏦 Cross-Protocol Yield Scanner
- **Multi-Protocol Support**: Aave, Moonwell, Seamless, Aerodrome
- **Real-Time APY Tracking**: Live yield rate monitoring
- **Risk Assessment**: Protocol risk evaluation
- **Position Deployment**: One-click position creation

### ⚡ Aerodrome LP Compounder
- **Auto-Compounding**: Automated reward harvesting
- **IL Mitigation**: Impermanent loss protection
- **Gas-Efficient**: Batch transaction processing
- **Yield Forecasting**: Performance prediction

### 📊 Gas-Optimized Backtester
- **Historical Analysis**: Strategy performance testing
- **Market Conditions**: Bull/bear/sideways scenario testing
- **Risk Metrics**: Sharpe ratio, max drawdown analysis
- **Strategy Comparison**: Multiple strategy evaluation

### 🔒 Security & Audit
- **Real-Time Monitoring**: Continuous security checks
- **Input Validation**: Comprehensive data sanitization
- **Contract Verification**: Verified smart contract interactions
- **Health Factor Alerts**: Liquidation prevention

## 🏗️ Architecture

```
YieldPilot/
├── components/          # React components
│   ├── Header.tsx      # Navigation & wallet connection
│   ├── YieldDashboard.tsx    # Portfolio overview
│   ├── ProtocolScanner.tsx   # Yield opportunity scanner
│   ├── RebalanceEngine.tsx   # Position rebalancing
│   ├── AerodromeCompounder.tsx # LP reward compounding
│   ├── Backtester.tsx       # Strategy backtesting
│   └── SecurityAudit.tsx    # Security monitoring
├── hooks/             # Custom React hooks
│   ├── useProtocolData.ts   # Protocol data fetching
│   ├── useYieldData.ts      # Portfolio metrics
│   ├── useRebalancing.ts    # Rebalancing logic
│   ├── useCompounder.ts     # Compounding logic
│   ├── useBacktester.ts     # Backtesting logic
│   └── useNotifications.ts  # User notifications
├── lib/               # Core utilities
│   ├── blockchain.ts       # Web3 interactions
│   ├── contracts.ts        # Contract ABIs & addresses
│   ├── rebalancing.ts      # Rebalancing algorithms
│   ├── compounder.ts       # Compounding logic
│   ├── backtester.ts       # Backtesting engine
│   ├── validation.ts       # Input validation
│   └── utils.ts           # General utilities
├── docs/              # Documentation
│   ├── api.md         # API documentation
│   └── deployment.md  # Deployment guide
└── public/            # Static assets
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/vistara-apps/d75c8c11-1eee-468c-9e36-922da74b192e.git
cd yieldpilot
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
```

4. **Start development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_ONCHAINKIT_API_KEY` | OnchainKit API key | Yes |
| `NEXT_PUBLIC_BASE_RPC_URL` | Base network RPC URL | No |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect project ID | No |

### Supported Networks

- **Base Mainnet** (default)
- **Base Sepolia** (testnet)

## 📊 Usage

### 1. Connect Wallet
Connect your wallet to access DeFi positions and start optimizing yields.

### 2. Portfolio Overview
View your current positions, APY, and portfolio health in the dashboard.

### 3. Scan Protocols
Discover yield opportunities across supported protocols with real-time data.

### 4. Rebalance Positions
Let AI automatically optimize your lending/borrowing positions for maximum yield.

### 5. Compound Rewards
Automate LP reward compounding with impermanent loss protection.

### 6. Backtest Strategies
Test different yield strategies against historical data.

## 🔒 Security

YieldPilot implements multiple security measures:

- **Contract Verification**: All interactions with verified contracts
- **Input Validation**: Comprehensive input sanitization
- **Health Monitoring**: Real-time position health checks
- **Rate Limiting**: Protection against spam transactions
- **Error Boundaries**: Graceful error handling

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Run linting
npm run lint
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Manual Deployment
```bash
npm run build
npm start
```

See [deployment guide](./docs/deployment.md) for detailed instructions.

## 📚 API Documentation

Comprehensive API documentation available at [docs/api.md](./docs/api.md)

### Key Endpoints

- `GET /api/protocols/stats` - Protocol statistics
- `POST /api/rebalance/analyze` - Portfolio analysis
- `POST /api/compound/execute` - Execute compounding
- `POST /api/backtest/run` - Run strategy backtests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

**This software is for educational and research purposes. Always do your own research and understand the risks involved in DeFi protocols. The developers are not responsible for any financial losses.**

## 🆘 Support

- **Documentation**: [docs/](./docs/)
- **Issues**: [GitHub Issues](https://github.com/vistara-apps/d75c8c11-1eee-468c-9e36-922da74b192e/issues)
- **Discussions**: [GitHub Discussions](https://github.com/vistara-apps/d75c8c11-1eee-468c-9e36-922da74b192e/discussions)

## 🙏 Acknowledgments

- [OnchainKit](https://onchainkit.xyz/) - React components for blockchain
- [Base](https://base.org/) - The network powering YieldPilot
- [Vercel](https://vercel.com/) - Deployment platform
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework

---

**Built with ❤️ for the DeFi community on Base**
