import { Web3ReactProvider } from '@web3-react/core'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { ConnectionType, PRIORITIZED_CONNECTORS, getConnection, switchNetwork as _switchNetwork, tryDeactivateConnector } from '../connections'
import { Connector } from '@web3-react/types'

declare type Maybe<T> = T | null | undefined

export interface IWeb3ReactContext {
  connectionType: ConnectionType | null
  isOpenConnectModal: boolean
  setConnectionType: (v: ConnectionType | null) => void
  setIsOpenConnectModal: (v: boolean) => void
  disconnect: () => Promise<any>
  switchNetwork: (chainId: number) => Promise<any>
}

const Web3ReactContext = React.createContext<Maybe<IWeb3ReactContext>>(null)

async function connect(connector: Connector) {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly()
      connector.deactivate?.()
      connector.resetState()
    } else {
      await connector.activate()
    }
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`)
  }
}

const connectEagerly = async () => {
  await connect(getConnection(ConnectionType.NETWORK).connector)
  await connect(getConnection(ConnectionType.GNOSIS_SAFE).connector)
  await connect(getConnection(ConnectionType.WALLET_CONNECT_MAINNET).connector)
  await connect(getConnection(ConnectionType.WALLET_CONNECT_BSC).connector)
  await connect(getConnection(ConnectionType.WALLET_CONNECT_ARBITRUM).connector)
  await connect(getConnection(ConnectionType.WALLET_CONNECT_AVALANCHE).connector)
  await connect(getConnection(ConnectionType.WALLET_CONNECT_CRONOS).connector)
  await connect(getConnection(ConnectionType.WALLET_CONNECT_POLYGON).connector)
  await connect(getConnection(ConnectionType.WALLET_CONNECT_GOERLI).connector)
}

export const Web3WalletProvider = ({ children }: { children: ReactNode }) => {
  const [connectionType, setConnectionType] = useState<ConnectionType | null>(null)
  const [isOpenConnectModal, setIsOpenConnectModal] = useState(false)

  useEffect(() => {
    connectEagerly()
  }, [])

  const disconnect = async () => {
    if (connectionType !== null) {
      try {
        const deactivation = await tryDeactivateConnector(getConnection(connectionType).connector)
        // undefined means the deactivation failed               
        if (deactivation !== undefined) {
          setConnectionType(deactivation)
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  const switchNetwork = async (chainId: number) => {
    await _switchNetwork(chainId, connectionType)
  }

  return (
    <Web3ReactProvider
      connectors={Object.values(PRIORITIZED_CONNECTORS).map((connector) => [connector.connector, connector.hooks])}
    >
      <Web3ReactContext.Provider
        value={{
          connectionType,
          isOpenConnectModal,
          setConnectionType,
          setIsOpenConnectModal,
          disconnect,
          switchNetwork
        }}
      >
        {children}
      </Web3ReactContext.Provider>
    </Web3ReactProvider>
  )
}

export const useWallet = () => {
  const context = useContext(Web3ReactContext)

  if (!context) {
    throw new Error('Component rendered outside the provider tree')
  }

  return context
}