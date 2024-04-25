import { Web3ReactHooks } from '@web3-react/core'
import { AddEthereumChainParameter, Connector } from '@web3-react/types'

import { buildCoinbaseWalletConnector } from './coinbase'
import { buildInjectedConnector } from './injected'
import { buildWalletConnectConnector } from './wallet-connect'
import { BlockExplorer_URLS, CHAIN_ID_NAME_MAP, CustomChainId, Native_Currencies, Rpc_URLS } from 'src/constants/AppConstants'
import { buildGnosisSafeConnector } from './gnosis'
import { buildNetworkConnector } from './network'

export interface Connection {
  connector: Connector
  hooks: Web3ReactHooks
  type: ConnectionType
}

export enum ConnectionType {
  COINBASE_WALLET = 'COINBASE_WALLET',
  GNOSIS_SAFE = 'GNOSIS_SAFE',
  INJECTED = 'INJECTED',
  NETWORK = 'NETWORK',
  WALLET_CONNECT_MAINNET = 'WALLET_CONNECT_MAINNET',
  WALLET_CONNECT_GOERLI = 'WALLET_CONNECT_GOERLI',
  WALLET_CONNECT_BSC = 'WALLET_CONNECT_BSC',
  WALLET_CONNECT_POLYGON = 'WALLET_CONNECT_POLYGON',
  WALLET_CONNECT_ARBITRUM = 'WALLET_CONNECT_ARBITRUM',
  WALLET_CONNECT_AVALANCHE = 'WALLET_CONNECT_AVALANCHE',
  WALLET_CONNECT_CRONOS = 'WALLET_CONNECT_CRONOS'
}

export const ConnectionLabels: { [connection in ConnectionType]?: string } = {
  [ConnectionType.INJECTED]: "Connect Wallet (Default)",
  [ConnectionType.COINBASE_WALLET]: "Coinbase Wallet",
  [ConnectionType.WALLET_CONNECT_MAINNET]: "WalletConnect",
  [ConnectionType.WALLET_CONNECT_GOERLI]: "WalletConnect",
  [ConnectionType.WALLET_CONNECT_BSC]: "WalletConnect",
  [ConnectionType.WALLET_CONNECT_POLYGON]: "WalletConnect",
  [ConnectionType.WALLET_CONNECT_ARBITRUM]: "WalletConnect",
  [ConnectionType.WALLET_CONNECT_AVALANCHE]: "WalletConnect",
  [ConnectionType.WALLET_CONNECT_CRONOS]: "WalletConnect",
}

// function getIsBraveWallet(): boolean {
//   return window.ethereum?.isBraveWallet ?? false
// }

export function getHasMetaMaskExtensionInstalled(): boolean {
  // return (window.ethereum?.isMetaMask ?? false) && !getIsBraveWallet()
  return (window.ethereum?.isMetaMask ?? false)
}

export function onConnectionError(error: Error) {
  console.debug(`web3-react error: ${error}`)
}

export const PRIORITIZED_CONNECTORS: { [key in ConnectionType]: Connection } = {
  [ConnectionType.INJECTED]: buildInjectedConnector(),
  [ConnectionType.COINBASE_WALLET]: buildCoinbaseWalletConnector(),
  [ConnectionType.WALLET_CONNECT_MAINNET]: buildWalletConnectConnector(CustomChainId.Mainnet, ConnectionType.WALLET_CONNECT_MAINNET),
  [ConnectionType.WALLET_CONNECT_GOERLI]: buildWalletConnectConnector(CustomChainId.Goerli, ConnectionType.WALLET_CONNECT_GOERLI),
  [ConnectionType.WALLET_CONNECT_BSC]: buildWalletConnectConnector(CustomChainId.BSC, ConnectionType.WALLET_CONNECT_BSC),
  [ConnectionType.WALLET_CONNECT_POLYGON]: buildWalletConnectConnector(CustomChainId.Polygon, ConnectionType.WALLET_CONNECT_POLYGON),
  [ConnectionType.WALLET_CONNECT_ARBITRUM]: buildWalletConnectConnector(CustomChainId.Arbitrum, ConnectionType.WALLET_CONNECT_ARBITRUM),
  [ConnectionType.WALLET_CONNECT_AVALANCHE]: buildWalletConnectConnector(CustomChainId.Avalanche, ConnectionType.WALLET_CONNECT_AVALANCHE),
  [ConnectionType.WALLET_CONNECT_CRONOS]: buildWalletConnectConnector(CustomChainId.Cronos, ConnectionType.WALLET_CONNECT_CRONOS),

  [ConnectionType.GNOSIS_SAFE]: buildGnosisSafeConnector(),
  [ConnectionType.NETWORK]: buildNetworkConnector()
}

export function getConnection(c: Connector | ConnectionType) {
  if (c instanceof Connector) {
    const connection = Object.values(PRIORITIZED_CONNECTORS).find((connection) => connection.connector === c)
    if (!connection) {
      throw Error('Unsupported Connector')
    }
    return connection
  } else {
    switch (c) {
      case ConnectionType.INJECTED:
        return PRIORITIZED_CONNECTORS[ConnectionType.INJECTED]
      case ConnectionType.COINBASE_WALLET:
        return PRIORITIZED_CONNECTORS[ConnectionType.COINBASE_WALLET]
      case ConnectionType.GNOSIS_SAFE:
        return PRIORITIZED_CONNECTORS[ConnectionType.GNOSIS_SAFE]
      case ConnectionType.NETWORK:
        return PRIORITIZED_CONNECTORS[ConnectionType.NETWORK]
      case ConnectionType.WALLET_CONNECT_MAINNET:
        return PRIORITIZED_CONNECTORS[ConnectionType.WALLET_CONNECT_MAINNET]
      case ConnectionType.WALLET_CONNECT_GOERLI:
        return PRIORITIZED_CONNECTORS[ConnectionType.WALLET_CONNECT_GOERLI]
      case ConnectionType.WALLET_CONNECT_BSC:
        return PRIORITIZED_CONNECTORS[ConnectionType.WALLET_CONNECT_BSC]
      case ConnectionType.WALLET_CONNECT_POLYGON:
        return PRIORITIZED_CONNECTORS[ConnectionType.WALLET_CONNECT_POLYGON]
      case ConnectionType.WALLET_CONNECT_ARBITRUM:
        return PRIORITIZED_CONNECTORS[ConnectionType.WALLET_CONNECT_ARBITRUM]
      case ConnectionType.WALLET_CONNECT_AVALANCHE:
        return PRIORITIZED_CONNECTORS[ConnectionType.WALLET_CONNECT_AVALANCHE]
      case ConnectionType.WALLET_CONNECT_CRONOS:
        return PRIORITIZED_CONNECTORS[ConnectionType.WALLET_CONNECT_CRONOS]
    }
  }
}

export const switchNetwork = async (chainId: number, connectionType: ConnectionType | null) => {
  if (!connectionType) {
    return
  }

  const { connector } = getConnection(connectionType)

  if (
    connectionType === ConnectionType.WALLET_CONNECT_MAINNET ||
    connectionType === ConnectionType.WALLET_CONNECT_GOERLI ||
    connectionType === ConnectionType.WALLET_CONNECT_BSC ||
    connectionType === ConnectionType.WALLET_CONNECT_POLYGON ||
    connectionType === ConnectionType.WALLET_CONNECT_ARBITRUM ||
    connectionType === ConnectionType.WALLET_CONNECT_AVALANCHE ||
    connectionType === ConnectionType.WALLET_CONNECT_CRONOS ||
    connectionType === ConnectionType.NETWORK) {
    await connector.activate(chainId)
    return
  }

  const addChainParameter: AddEthereumChainParameter = {
    chainId,
    chainName: CHAIN_ID_NAME_MAP[chainId],
    rpcUrls: [Rpc_URLS[chainId]],
    nativeCurrency: Native_Currencies[chainId],
    blockExplorerUrls: [BlockExplorer_URLS[chainId]],
  }
  await connector.activate(addChainParameter)
}

export const tryActivateConnector = async (connector: Connector, desiredChainId: number | undefined): Promise<ConnectionType | undefined> => {
  if (!desiredChainId) {
    await connector.activate()
  } else {
    await connector.activate(desiredChainId)
  }
  const connectionType = getConnection(connector).type
  return connectionType
}

export const tryDeactivateConnector = async (connector: Connector): Promise<null | undefined> => {
  connector.deactivate?.()
  connector.resetState()
  return null
}

