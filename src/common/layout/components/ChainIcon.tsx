import { CustomChainId } from "src/constants/AppConstants"

const ICON_W = '24px'
const ICON_H = '24px'

export default function ChainIcon({ chainId }: { chainId: number }) {

    if (chainId === CustomChainId.Mainnet || chainId === CustomChainId.Goerli) {
        return (
            <div className={`bg-center bg-no-repeat bg-contain bg-[url('./assets/chain_icons/ethereum.png')]`} style={{ borderRadius: '50%', width: ICON_W, height: ICON_H }} />
        )
    }

    // if (chainId === CustomChainId.Andromeda) {
    //     return (
    //         <div className={`bg-white flex justify-center items-center`} style={{ borderRadius: '50%' }}>
    //             <div className={`bg-center bg-no-repeat bg-contain bg-[url('./assets/chain_icons/andromeda.png')]`} style={{ borderRadius: '50%', width: ICON_W, height: ICON_H }} />
    //         </div>
    //     )
    // }

    // if (chainId === CustomChainId.Aurora) {
    //     return (
    //         <div className={`bg-center bg-no-repeat bg-contain bg-[url('./assets/chain_icons/aurora.svg')]`} style={{ borderRadius: '50%', width: ICON_W, height: ICON_H }} />
    //     )
    // }

    if (chainId === CustomChainId.Avalanche) {
        return (
            <div className={`bg-center bg-no-repeat bg-contain bg-[url('./assets/chain_icons/avalanche.svg')]`} style={{ borderRadius: '50%', width: ICON_W, height: ICON_H }} />
        )
    }

    if (chainId === CustomChainId.Arbitrum) {
        return (
            <div className={`bg-white flex justify-center items-center`} style={{ borderRadius: '50%' }}>
                <div className={`bg-center bg-no-repeat bg-contain bg-[url('./assets/chain_icons/arbitrum.svg')]`} style={{ borderRadius: '50%', width: ICON_W, height: ICON_H }} />
            </div>
        )
    }

    if (chainId === CustomChainId.BSC || chainId === CustomChainId.BSCTestnet) {
        return (
            <div className={`bg-center bg-no-repeat bg-contain bg-[url('./assets/chain_icons/bsc.svg')]`} style={{ borderRadius: '50%', width: ICON_W, height: ICON_H }} />

        )
    }

    if (chainId === CustomChainId.Cronos) {
        return (
            <div className={`bg-white flex justify-center items-center`} style={{ borderRadius: '50%', width: ICON_W, height: ICON_H }}>
                <div className={`w-[28px] h-[28px] bg-center bg-no-repeat bg-contain bg-[url('./assets/chain_icons/cronos.svg')]`} style={{ borderRadius: '50%', width: ICON_W, height: ICON_H }} />
            </div>


        )
    }

    // if (chainId === CustomChainId.Fantom) {
    //     return (
    //         <div className={`bg-center bg-no-repeat bg-contain bg-[url('./assets/chain_icons/fantom.svg')]`} style={{ borderRadius: '50%', width: ICON_W, height: ICON_H }} />

    //     )
    // }

    // if (chainId === CustomChainId.Harmony) {
    //     return (
    //         <div className={`bg-white flex justify-center items-center`} style={{ borderRadius: '50%', width: ICON_W, height: ICON_H }}>
    //             <div className={`w-[22px] h-[22px] bg-center bg-no-repeat bg-contain bg-[url('./assets/chain_icons/harmony.svg')]`} />
    //         </div>
    //     )
    // }

    // if (chainId === CustomChainId.Moonbeam) {
    //     return (
    //         <div className={`bg-white flex justify-center items-center`} style={{ borderRadius: '50%', width: ICON_W, height: ICON_H }}>
    //             <div className={`bg-center bg-no-repeat bg-contain bg-[url('./assets/chain_icons/moonbeam.svg')]`} style={{ borderRadius: '50%', width: ICON_W, height: ICON_H }} />
    //         </div>

    //     )
    // }

    // if (chainId === CustomChainId.OasisEmerald) {
    //     return (
    //         <div className={`bg-center bg-no-repeat bg-contain bg-[url('./assets/chain_icons/oasis.svg')]`} style={{ borderRadius: '50%', width: ICON_W, height: ICON_H }} />
    //     )
    // }

    // if (chainId === CustomChainId.Optimism) {
    //     return (
    //         <div className={`bg-center bg-no-repeat bg-contain bg-[url('./assets/chain_icons/optimism.svg')]`} style={{ borderRadius: '50%', width: ICON_W, height: ICON_H }} />
    //     )
    // }

    if (chainId === CustomChainId.Polygon) {
        return (
            <div className={`bg-white flex justify-center items-center`} style={{ borderRadius: '50%', width: ICON_W, height: ICON_H }}>
                <div className={`w-[24px] h-[24px] bg-center bg-no-repeat bg-contain bg-[url('./assets/chain_icons/polygon.svg')]`} style={{ borderRadius: '50%', width: ICON_W, height: ICON_H }} />
            </div>

        )
    }

    // if (chainId === CustomChainId.Velas) {
    //     return (
    //         <div className={`bg-white flex justify-center items-center`} style={{ borderRadius: '50%', width: ICON_W, height: ICON_H }}>
    //             <div className={`w-[28px] h-[28px] bg-center bg-no-repeat bg-contain bg-[url('./assets/chain_icons/velas.svg')]`} style={{ borderRadius: '50%', width: ICON_W, height: ICON_H }} />
    //         </div>
    //     )
    // }

    return (
        <>
        </>
    )
}
