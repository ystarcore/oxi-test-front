import React, { PropsWithChildren } from "react"
import Header from "./Header"
import WalletModal from "../WalletModal"
import { useWallet } from "../We3ReactLibs/components/Web3WalletProvider"
import { useOXI } from "src/contexts/OXIContext"

export default function Layout({ children }: PropsWithChildren<{}>) {
  const { isOpenConnectModal, setIsOpenConnectModal } = useWallet()
  const { selectedChainId } = useOXI()

  return (
    <>
      <WalletModal isOpen={isOpenConnectModal} desiredChainId={selectedChainId} handleClose={() => setIsOpenConnectModal(false)} />
      <div className="sm:bg-[url('./assets/bg.svg')] sm:bg-cover sm:bg-no-repeat min-h-screen fit-full-h">
        <div className="w-full flex w-full justify-center px-4 sm:px-6 lg:px-12 xl:px-16">
          <Header />
        </div>
        <div className="flex justify-center items-center w-full px-4 sm:px-6 lg:px-12 xl:px-16 flex-1 fit-full-h">
          <div className="flex w-full justify-center items-center my-8 max-w-[2000px] flex-1 fit-full-h">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
