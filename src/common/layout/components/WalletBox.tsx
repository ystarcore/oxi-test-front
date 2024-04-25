import Wallet from "src/common/Wallet"
import ChainSelect from "./ChainSelect"

export default function WalletBox() {

    return (
        <div className="flex gap-2 sm:gap-4 items-center">
            {/* <ChainSelect /> */}
            <Wallet />
        </div >
    )
}