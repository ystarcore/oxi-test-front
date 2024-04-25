import { useWeb3React } from "@web3-react/core"
import { shortenAddress } from 'src/utils'
import { useWallet } from "./We3ReactLibs/components/Web3WalletProvider"
import { Button } from "./components/Buttons"

function BalanceAndDisconnect() {
    const { account } = useWeb3React()
    const { disconnect } = useWallet()

    return (
        <Button
            type="primary"
            onClick={disconnect}
        >
            <div className='w-full flex gap-4 justify-center items-center'>
                <img src='/images/wallet.png' width='24px' alt="" />
                <div className='font-normal text-[14px] sm:text-[16px]'>
                    {shortenAddress(account, 3)}
                </div>
            </div>
        </Button>

    )
}

export default function Wallet() {
    const { account } = useWeb3React()
    const { setIsOpenConnectModal } = useWallet()
    const isConnected = !!account

    return (
        <div className="flex justify-center">
            {!isConnected && (
                <Button
                    type="primary"
                    onClick={() => setIsOpenConnectModal(true)}
                    style={{ minWidth: '140px' }}
                >
                    <span className="text-[16px] md:text-[18px]">Connect Wallet</span>
                </Button>
            )}
            {isConnected && <BalanceAndDisconnect />}
        </div>
    )
}