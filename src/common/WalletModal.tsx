import { ConnectionType } from "./We3ReactLibs/connections"
import { Option } from "./We3ReactLibs/components/Option"
import { useWallet } from "./We3ReactLibs/components/Web3WalletProvider"
import { useWeb3React } from "@web3-react/core"
import { CustomChainId } from "src/constants/AppConstants"

const darkMode = true

interface PopupProps {
    isOpen: boolean
    desiredChainId: number | undefined
    handleClose: () => void
}

const modalStyle = (darkMode: boolean, isOpen: boolean) => {
    return {
        backgroundColor: darkMode ? "#FFFFFF20" : "#00000020",
        display: isOpen ? "flex" : "none",
        right: 0,
        left: 0,
        zIndex: 50,
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    }
}

const contentModalStyle = (darkMode: boolean) => {
    return {
        backgroundColor: darkMode ? "rgb(39, 49, 56)" : "#FFFFFF",
        maxWidth: '400px',
        maxHeight: 'calc(100vh - 125px)',
        width: '100%',
        height: 'auto',
        padding: '24px 24px',
        borderRadius: '20px',
        border: '1px solid #3E484C',
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
    }
}

export default function WalletModal({
    isOpen,
    desiredChainId,
    handleClose
}: PopupProps) {
    const { connectionType, setConnectionType } = useWallet()
    const { chainId, account, isActive } = useWeb3React()

    const isNoOptionActive = !isActive || (isActive && connectionType === null)

    const handleWindowClick = (event: any) => {
        const modal = document.getElementById("id-wallet-connect-modal")
        if (event.target.id === modal?.id) {
            handleClose()
        }
    }

    const metaMaskOption = (
        <Option
            // isEnabled={isNoOptionActive || connectionType === ConnectionType.INJECTED}
            isConnected={connectionType === ConnectionType.INJECTED}
            connectionType={ConnectionType.INJECTED}
            darkMode={darkMode}
            walletIconSrc="/images/wallet.png"
            desiredChainId={desiredChainId}
            onActivate={setConnectionType}
            onDeactivate={setConnectionType}
            handleClose={handleClose}
        />
    )

    const walletConnectOption = (_connectionType: ConnectionType) => {
        return (
            <Option
                isConnected={connectionType === _connectionType}
                connectionType={_connectionType}
                darkMode={darkMode}
                walletIconSrc="/images/wallet/walletConnectIcon.svg"
                desiredChainId={desiredChainId}
                onActivate={setConnectionType}
                onDeactivate={setConnectionType}
                handleClose={handleClose}
            />
        )
    }

    const coinbaseWalletOption = (
        <Option
            // isEnabled={isNoOptionActive || connectionType === ConnectionType.COINBASE_WALLET}
            isConnected={connectionType === ConnectionType.COINBASE_WALLET}
            connectionType={ConnectionType.COINBASE_WALLET}
            darkMode={darkMode}
            walletIconSrc="/images/wallet/coinbaseWalletIcon.svg"
            desiredChainId={desiredChainId}
            onActivate={setConnectionType}
            onDeactivate={setConnectionType}
            handleClose={handleClose}
        />
    )

    return (
        <div
            id="id-wallet-connect-modal"
            aria-hidden="true"
            role="dialog"
            className="modal-fadeIn"
            // style={modalStyle(darkMode, isOpen)}
            style={{ position: 'fixed', overflowX: 'hidden', overflowY: 'auto', inset: 0, ...modalStyle(darkMode, isOpen) }}
            onClick={(e: any) => handleWindowClick(e)}
        >
            <div style={contentModalStyle(darkMode)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div style={{ color: darkMode ? 'white' : '#333', fontSize: '20px' }}>
                        Connect a wallet
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'end', padding: '8px' }}>
                        <div
                            // className="hover:text-gray-500"
                            style={{ cursor: 'pointer' }}
                            onClick={handleClose}>
                            <svg width="20px" height="20px" fill={darkMode ? '#EEE' : '#444'} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </div>
                    </div>
                </div>
                <hr style={{ width: '100%', marginTop: '12px', borderTop: '1px solid #3E484C' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '12px' }}>
                    {metaMaskOption}
                    {desiredChainId === CustomChainId.Mainnet && <>
                        {walletConnectOption(ConnectionType.WALLET_CONNECT_MAINNET)}
                    </>}
                    {desiredChainId === CustomChainId.Goerli && <>
                        {walletConnectOption(ConnectionType.WALLET_CONNECT_GOERLI)}
                    </>}
                    {desiredChainId === CustomChainId.BSC && <>
                        {walletConnectOption(ConnectionType.WALLET_CONNECT_BSC)}
                    </>}
                    {desiredChainId === CustomChainId.Polygon && <>
                        {walletConnectOption(ConnectionType.WALLET_CONNECT_POLYGON)}
                    </>}
                    {desiredChainId === CustomChainId.Arbitrum && <>
                        {walletConnectOption(ConnectionType.WALLET_CONNECT_ARBITRUM)}
                    </>}
                    {desiredChainId === CustomChainId.Avalanche && <>
                        {walletConnectOption(ConnectionType.WALLET_CONNECT_AVALANCHE)}
                    </>}
                    {desiredChainId === CustomChainId.Cronos && <>
                        {walletConnectOption(ConnectionType.WALLET_CONNECT_CRONOS)}
                    </>}
                    {coinbaseWalletOption}
                </div>
            </div>
        </div>
    )
}