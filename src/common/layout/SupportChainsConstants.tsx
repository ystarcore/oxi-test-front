import { CustomChainId } from "src/constants/AppConstants";

export enum ChainItem {
    // BSC,
    BSC_Testnet
}

export const CHAIN_ITEMS = {
    // [ChainItem.BSC]: CustomChainId.BSC,
    [ChainItem.BSC_Testnet]: CustomChainId.BSCTestnet
}