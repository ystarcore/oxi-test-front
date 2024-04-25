import { initializeConnector } from '@web3-react/core'
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'

import { Connection, ConnectionType } from './connections'

export function buildWalletConnectConnector(chainId: number, connectionType: ConnectionType) {
  const [web3WalletConnect, web3WalletConnectHooks] = initializeConnector<WalletConnectV2>(
    (actions) =>
      new WalletConnectV2({
        actions,
        options: {
          // projectId: "a6cc11517a10f6f12953fd67b1eb67e7",
          projectId: "fb2d900fedefa0ffd0035160b0525436",
          chains: [
            chainId
          ],
          optionalChains: [],
          methods: ['eth_sendTransaction', 'eth_signTransaction', 'personal_sign', 'eth_signTypedData', 'eth_signTypedData_v4', 'eth_sign'],
          showQrModal: true,
        },
      })
  )
  const walletConnectConnection: Connection = {
    connector: web3WalletConnect,
    hooks: web3WalletConnectHooks,
    type: connectionType,
  }
  return walletConnectConnection
}