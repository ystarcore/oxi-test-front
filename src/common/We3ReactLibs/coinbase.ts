import { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { initializeConnector } from '@web3-react/core'

import { Connection, ConnectionType, onConnectionError } from './connections'
import { CustomChainId, Rpc_URLS } from 'src/constants/AppConstants'

export function buildCoinbaseWalletConnector() {
  const [web3CoinbaseWallet, web3CoinbaseWalletHooks] = initializeConnector<CoinbaseWallet>(
    (actions) =>
      new CoinbaseWallet({
        actions,
        options: {
          url: Rpc_URLS[CustomChainId.Mainnet] as string,
          appName: 'dApp',
          reloadOnDisconnect: false,
        },
        onError: onConnectionError,
      })
  )
  const coinbaseWalletConnection: Connection = {
    connector: web3CoinbaseWallet,
    hooks: web3CoinbaseWalletHooks,
    type: ConnectionType.COINBASE_WALLET,
  }

  return coinbaseWalletConnection
}
