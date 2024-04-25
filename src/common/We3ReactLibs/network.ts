import { initializeConnector } from '@web3-react/core'
import { Network } from '@web3-react/network'

import { Connection, ConnectionType } from './connections'
import { CustomChainId, Rpc_URLS } from 'src/constants/AppConstants'

export function buildNetworkConnector() {
  const [web3Network, web3NetworkHooks] = initializeConnector<Network>(
    (actions) =>
      new Network({
        actions,
        urlMap: Rpc_URLS,
        defaultChainId: CustomChainId.Mainnet,
      })
  )
  const networkConnection: Connection = {
    connector: web3Network,
    hooks: web3NetworkHooks,
    type: ConnectionType.NETWORK,
  }

  return networkConnection
}
