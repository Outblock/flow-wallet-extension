import "./config"
import "./decorate"
import {COMMANDS} from "./cmds"
import useCurrentUser from "./hooks/use-current-user"
import useConfig from "./hooks/use-config"
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { wagmiConfig } from './evm-config'
import '@rainbow-me/rainbowkit/styles.css'

const queryClient = new QueryClient()

const renderCommand = d => {
  return (
    <li key={d.LABEL}>
      <button onClick={d.CMD}>{d.LABEL}</button>
    </li>
  )
}

function FlowContainer() {
  const currentUser = useCurrentUser()
  const config = useConfig()

  return (
    <div style={{ 
      border: '2px solid #00D4AA', 
      borderRadius: '8px', 
      padding: '20px', 
      margin: '10px',
      backgroundColor: '#f8fffd'
    }}>
      <h2 style={{ color: '#00D4AA', marginTop: 0 }}>Flow Network</h2>
      <ul>{COMMANDS.map(renderCommand)}</ul>
      <pre style={{ fontSize: '12px', maxHeight: '300px', overflow: 'auto' }}>
        {JSON.stringify({currentUser, config}, null, 2)}
      </pre>
    </div>
  )
}

function EVMContainer() {
  const { address, isConnected, chain } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <div style={{ 
      border: '2px solid #627EEA', 
      borderRadius: '8px', 
      padding: '20px', 
      margin: '10px',
      backgroundColor: '#f7f9ff'
    }}>
      <h2 style={{ color: '#627EEA', marginTop: 0 }}>Flow EVM Network</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <ConnectButton />
      </div>

      {isConnected && (
        <div>
          <h3>Connection Details</h3>
          <pre style={{ fontSize: '12px', maxHeight: '300px', overflow: 'auto' }}>
            {JSON.stringify({
              address,
              chain: chain ? {
                id: chain.id,
                name: chain.name,
                nativeCurrency: chain.nativeCurrency
              } : null,
              isConnected
            }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

function FlowHarness() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Flow & EVM Harness</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '400px' }}>
          <FlowContainer />
        </div>
        <div style={{ flex: '1', minWidth: '400px' }}>
          <EVMContainer />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <FlowHarness />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}