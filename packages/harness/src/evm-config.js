import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'

// Flow EVM chains configuration
export const flowMainnet = {
  id: 747,
  name: 'Flow EVM',
  nativeCurrency: {
    decimals: 18,
    name: 'Flow',
    symbol: 'FLOW',
  },
  rpcUrls: {
    default: {
      http: ['https://mainnet.evm.nodes.onflow.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Flow EVM Explorer',
      url: 'https://evm.flowscan.org',
    },
  },
}

export const flowTestnet = {
  id: 545,
  name: 'Flow EVM Testnet',  
  nativeCurrency: {
    decimals: 18,
    name: 'Flow',
    symbol: 'FLOW',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet.evm.nodes.onflow.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Flow EVM Testnet Explorer',
      url: 'https://evm-testnet.flowscan.org',
    },
  },
  testnet: true,
}

export const evmConfig = getDefaultConfig({
  appName: 'Flow EVM Harness',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [flowMainnet, flowTestnet],
  transports: {
    [flowMainnet.id]: http(),
    [flowTestnet.id]: http(),
  },
})