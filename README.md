# YieldPilot - DeFi Yield Optimizer on Base

A sophisticated Base Mini App that helps users maximize DeFi yields through intelligent automation.

## Features

- **Dynamic Lending/Borrowing Rebalancer**: Automatically optimize positions across protocols
- **Aerodrome LP Reward Compounding**: Auto-compound LP rewards with IL mitigation
- **Cross-Protocol Yield Scanner**: Find the best yields across Base DeFi
- **Professional Finance Theme**: Wall Street meets crypto aesthetic

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

3. Add your OnchainKit API key to `.env.local`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Theme Support

YieldPilot supports multiple blockchain themes:
- Default: Professional finance theme (dark navy, gold accents)
- Celo: Black & yellow theme
- Solana: Purple gradient theme
- Base: Base blue theme
- Coinbase: Coinbase blue theme

Visit `/theme-preview` to see all themes in action.

Add `?theme=celo` (or solana/base/coinbase) to any URL to switch themes.

## Tech Stack

- Next.js 15 with App Router
- React 19
- OnchainKit for Base integration
- Tailwind CSS for styling
- TypeScript for type safety

## License

MIT
