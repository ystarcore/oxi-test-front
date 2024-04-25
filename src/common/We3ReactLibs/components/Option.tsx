import React, { useState } from 'react'
import ReactLoading from 'react-loading'

import { ConnectionLabels, ConnectionType, getConnection, tryActivateConnector, tryDeactivateConnector } from '../connections'
import { useWallet } from './Web3WalletProvider'

export const Option = ({
  isConnected,
  connectionType,
  darkMode,
  walletIconSrc,
  desiredChainId,
  onActivate,
  onDeactivate,
  handleClose
}: {
  isConnected: boolean
  connectionType: ConnectionType
  darkMode: boolean
  walletIconSrc: string
  desiredChainId: number | undefined
  onActivate: (connectionType: ConnectionType) => void
  onDeactivate: (connectionType: null) => void
  handleClose: () => void
}) => {
  const [isHovering, setIsHovering] = useState(false)
  const { connectionType: currentConnectionType } = useWallet()
  const [isConnecting, setIsConnecting] = useState(false)

  const onClick = async () => {

    if (isConnected) return

    setIsConnecting(true)

    try {
      if (currentConnectionType !== null) {
        try {
          const deactivation = await tryDeactivateConnector(getConnection(currentConnectionType).connector)
          // undefined means the deactivation failed          
          if (deactivation !== undefined) {
            onDeactivate(deactivation)
          }
        } catch (err) {
          console.error(err)
        }
      }

      const activation = await tryActivateConnector(getConnection(connectionType).connector, desiredChainId)
      if (!!activation) {
        onActivate(activation)
        handleClose()
      }
    } catch (err) {
      console.error(err)
    }
    setIsConnecting(false)
  }

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        borderRadius: '8px',
        cursor: 'pointer',
        backgroundColor: darkMode ? isHovering ? "rgb(30, 42, 47)" : "rgb(35, 46, 52)" : isHovering ? "rgb(235, 239, 255)" : "rgb(245, 246, 252)",
        padding: '28px 20px'
      }}
      onClick={onClick}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '36px' }}>
        <img src={walletIconSrc} alt={ConnectionLabels[connectionType]} width={'100%'} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div style={{ color: darkMode ? isConnecting && connectionType ? 'white' : '#CCCCCC' : isConnecting ? '#FFF' : '#333', fontSize: '20px' }}>
          {ConnectionLabels[connectionType]}
        </div>
        {isConnecting && <ReactLoading type={"spin"} color="#aaa" height='24px' width='24px' />}
      </div>
    </div>
  )
}
