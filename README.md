<p align="center">
  <h1 align="center">Flow Chrome Extension Wallet Example</h1>
  <p align="center">
    <i>An example and guide showing how to build an FCL-compatible wallet extension on Flow with EVM support.</i>
    <br />
    <a href="docs/index.md"><strong>Read the docs »</strong></a>
    <br />
    <br />
    <a href="https://docs.onflow.org/fcl/">What is FCL?</a>
    ·
    <a href="https://github.com/onflow/fcl-js/issues">Report a Bug</a>
  </p>
</p>

## 🚀 Architecture

This project consists of two main components:

- **Extension** (`packages/extension/`): Chrome extension wallet built with React + Vite
- **Harness** (`packages/harness/`): Testing dApp built with Next.js, featuring dual Flow/EVM support with RainbowKit

## 🛠 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended package manager)

### Installation

Run all commands from the root directory.

```shell
# Install pnpm globally if you haven't already
npm install -g pnpm

# Install dependencies
pnpm install
```

### Build the Extension

```shell
# Development build (with watch mode)
cd packages/extension
pnpm run dev

# Production build
pnpm run build
```

### Add the Extension to Chrome

1. In Chrome, navigate to `chrome://extensions`
2. Enable the "Developer mode" toggle
3. Click on "Load unpacked"
4. Select the `packages/extension/dist` folder

### Refreshing the Extension

If you make changes to the code:
1. Rebuild with `pnpm run build` (or use `pnpm run dev` for watch mode)
2. Click the refresh icon in the Chrome extensions page

### Start the Harness App

The harness is a Next.js web app with dual Flow/EVM support for testing wallet functionality.

```shell
# Development server
cd packages/harness
pnpm run dev

# Production build
pnpm run build
pnpm run start
```

Open [http://localhost:3000](http://localhost:3000) to view the harness.

## 🌐 Flow EVM Support

The harness includes built-in support for Flow EVM networks:

- **Flow EVM Mainnet** (Chain ID: 747)
  - RPC: `https://mainnet.evm.nodes.onflow.org`
  - Explorer: `https://evm.flowscan.org`

- **Flow EVM Testnet** (Chain ID: 545)  
  - RPC: `https://testnet.evm.nodes.onflow.org`
  - Explorer: `https://evm-testnet.flowscan.org`

The harness displays both Flow and EVM connection details side-by-side, making it easy to test both networks simultaneously.

---

## Build your own wallet

See the full guide to building an extension on Flow [here](docs/index.md).

- [Overview](docs/index.md#overview)
  - [FCL Fundamentals](docs/index.md#fcl-fundamentals)
    - [Discovery](docs/index.md#discovery)
    - [Service Methods](docs/index.md#service-methods)
    - [Wallet Services](docs/index.md#wallet-services)
  - [Browser & Extension Requirements](docs/index.md#browser---extension-requirements)
  - [Key Scripts](docs/index.md#key-scripts)
- [Implementation](docs/index.md#implementation)
  - [Manifest V3 configurations](docs/index.md#manifest-v3-configurations)
  - [FCL Installation & Configuration](docs/index.md#fcl-installation---configuration)
  - [Harness & Testing](docs/index.md#harness---testing)
  - [FCL Discovery](docs/index.md#fcl-discovery)
  - [Account Creation](docs/index.md#account-creation)
  - [FCL Authentication](docs/index.md#fcl-authentication)
  - [FCL Authorization](docs/index.md#fcl-authorization)
  - [Other Services](docs/index.md#other-services)
  - [Transaction History & Event Indexing](docs/index.md#transaction-history---event-indexing)
  - [NFT Viewing & Metadata](docs/index.md#nft-viewing---metadata)
  - [Other Resources](docs/index.md#other-resources)
