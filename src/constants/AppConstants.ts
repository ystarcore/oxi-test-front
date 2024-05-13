
import { ethers } from "ethers"
import { JsonRpcProvider } from "@ethersproject/providers"

export const OAuth_Domain = "oxi-platform.us.auth0.com"
export const OAuth_ClientId = "P351wxI2yyuNjkSGE9mWvsvP4UzGFLuV"

export const DEAD_ADDRESS = "0x000000000000000000000000000000000000dead"

export const BYTES32_ZERO = "0x0000000000000000000000000000000000000000000000000000000000000000"

export const AddressZero = "0x0000000000000000000000000000000000000000"

export enum CustomChainId {
    Mainnet = 1,
    Goerli = 5,
    BSC = 56,
    BSCTestnet = 97,
    Arbitrum = 42161,
    Polygon = 137,
    Avalanche = 43114,
    Cronos = 25,
}

export const BuyOXI_URLs: { [chainId in CustomChainId]?: any } = {
    [CustomChainId.BSC]: 'https://pancakeswap.finance/swap?outputCurrency=0xE2e7329499E8DDb1f2b04EE4B35a8d7f6881e4ea',
    [CustomChainId.BSCTestnet]: 'https://pancakeswap.finance/swap?outputCurrency=0xE2e7329499E8DDb1f2b04EE4B35a8d7f6881e4ea'
}

export const UniswapRouterV2_Addresses: { [chainId in CustomChainId]?: any } = {
    [CustomChainId.Mainnet]: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    [CustomChainId.Goerli]: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    [CustomChainId.BSC]: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    [CustomChainId.BSCTestnet]: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
    [CustomChainId.Cronos]: '0x145677FC4d9b8F19B5D56d1820c48e0443049a30',
    [CustomChainId.Arbitrum]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'
}

export const UniswapFactory_Addresses: { [chainId in CustomChainId]?: any } = {
    [CustomChainId.Mainnet]: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    [CustomChainId.Goerli]: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    [CustomChainId.BSC]: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    [CustomChainId.BSCTestnet]: '0x6725F303b657a9451d8BA641348b6761A6CC7a17',
    [CustomChainId.Cronos]: '0xd590cC180601AEcD6eeADD9B7f2B7611519544f4',
    [CustomChainId.Arbitrum]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4'
}

export const CHAIN_ID_FULLNAME_MAP: { [key: CustomChainId | number]: string } = {
    [CustomChainId.Mainnet]: 'Ethereum Mainnet',
    [CustomChainId.Goerli]: 'Goerli Testnet',
    [CustomChainId.BSC]: 'BSC',
    [CustomChainId.BSCTestnet]: 'BSC Testnet',
    [CustomChainId.Arbitrum]: 'Arbitrum One',
    [CustomChainId.Polygon]: 'Polygon Mainnet',
    [CustomChainId.Avalanche]: 'Avalanche C-Chain',
    [CustomChainId.Cronos]: 'Cronos Mainnet Beta',
}

export const CHAIN_ID_NAME_MAP: { [key: CustomChainId | number]: string } = {
    [CustomChainId.Mainnet]: 'Ethereum',
    [CustomChainId.Goerli]: 'Goerli Testnet',
    [CustomChainId.BSC]: 'BNB Smart Chain',
    [CustomChainId.BSCTestnet]: 'BSC Testnet',
    [CustomChainId.Arbitrum]: 'Arbitrum',
    [CustomChainId.Polygon]: 'Polygon',
    [CustomChainId.Avalanche]: 'Avalanche',
    [CustomChainId.Cronos]: 'Cronos',
}

export const Rpc_URLS: { [chainId in CustomChainId]?: string } = {
    [CustomChainId.Mainnet]: 'https://rpc.ankr.com/eth',
    [CustomChainId.Goerli]: 'https://eth-goerli.public.blastapi.io',
    [CustomChainId.BSC]: 'https://bsc.nodereal.io',
    [CustomChainId.BSCTestnet]: 'https://bsc-testnet.publicnode.com',
    [CustomChainId.Arbitrum]: 'https://arb1.arbitrum.io/rpc',
    [CustomChainId.Polygon]: 'https://polygon-rpc.com',
    [CustomChainId.Avalanche]: 'https://api.avax.network/ext/bc/C/rpc',
    [CustomChainId.Cronos]: 'https://evm.cronos.org',
}

export const Wrapped_Ethers: { [chainId in CustomChainId]?: any } = {
    [CustomChainId.Mainnet]: { address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', name: 'Wrapped Ether', symbol: 'WETH', decimals: 18 },
    [CustomChainId.Goerli]: { address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', name: 'Wrapped Ether', symbol: 'WETH', decimals: 18 },
    [CustomChainId.BSC]: { address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', name: 'Wrapped BNB', symbol: 'WBNB', decimals: 18 },
    [CustomChainId.BSCTestnet]: { address: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd', name: 'Wrapped BNB', symbol: 'WBNB', decimals: 18 },
    [CustomChainId.Arbitrum]: { address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', name: 'Wrapped Ether', symbol: 'WETH', decimals: 18 },
    [CustomChainId.Polygon]: { address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', name: 'Wrapped Matic', symbol: 'WMATIC', decimals: 18 },
    [CustomChainId.Avalanche]: { address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', name: 'Wrapped AVAX', symbol: 'WAVAX', decimals: 18 },
    [CustomChainId.Cronos]: { address: '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23', name: 'Wrapped CRO', symbol: 'CRO', decimals: 18 },
}

export const Native_Currencies: { [chainId in CustomChainId]?: any } = {
    [CustomChainId.Mainnet]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    [CustomChainId.Goerli]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    [CustomChainId.BSC]: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    [CustomChainId.BSCTestnet]: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    [CustomChainId.Arbitrum]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    [CustomChainId.Polygon]: { name: 'Matic', symbol: 'MATIC', decimals: 18 },
    [CustomChainId.Avalanche]: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
    [CustomChainId.Cronos]: { name: 'CRO', symbol: 'CRO', decimals: 18 },
}

export const BlockExplorer_URLS: { [chainId in CustomChainId]?: string } = {
    [CustomChainId.Mainnet]: 'https://etherscan.io',
    [CustomChainId.Goerli]: 'https://goerli.etherscan.io/',
    [CustomChainId.BSC]: 'https://bscscan.com',
    [CustomChainId.BSCTestnet]: 'https://testnet.bscscan.com',
    [CustomChainId.Arbitrum]: 'https://arbiscan.io',
    [CustomChainId.Polygon]: 'https://polygonscan.com',
    [CustomChainId.Avalanche]: 'https://snowtrace.io',
    [CustomChainId.Cronos]: 'https://cronoscan.com',
}

export const RpcProviders: { [chainId in CustomChainId]?: JsonRpcProvider } = {
    [CustomChainId.Mainnet]: new ethers.providers.JsonRpcProvider(Rpc_URLS[CustomChainId.Mainnet]),
    [CustomChainId.Goerli]: new ethers.providers.JsonRpcProvider(Rpc_URLS[CustomChainId.Goerli]),
    [CustomChainId.BSC]: new ethers.providers.JsonRpcProvider(Rpc_URLS[CustomChainId.BSC]),
    [CustomChainId.BSCTestnet]: new ethers.providers.JsonRpcProvider(Rpc_URLS[CustomChainId.BSCTestnet]),
    [CustomChainId.Arbitrum]: new ethers.providers.JsonRpcProvider(Rpc_URLS[CustomChainId.Arbitrum]),
    [CustomChainId.Polygon]: new ethers.providers.JsonRpcProvider(Rpc_URLS[CustomChainId.Polygon]),
    [CustomChainId.Avalanche]: new ethers.providers.JsonRpcProvider(Rpc_URLS[CustomChainId.Avalanche]),
    [CustomChainId.Cronos]: new ethers.providers.JsonRpcProvider(Rpc_URLS[CustomChainId.Cronos]),
}

export const Chainlink_NativePriceFeed_CAs: { [key: CustomChainId | number]: any } = {
    [CustomChainId.Mainnet]: { CA: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", chainId: CustomChainId.Mainnet },
    [CustomChainId.Goerli]: { CA: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e", chainId: CustomChainId.Goerli },
    [CustomChainId.BSC]: { CA: "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE", chainId: CustomChainId.BSC },
    [CustomChainId.BSCTestnet]: { CA: "0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526", chainId: CustomChainId.BSCTestnet },
    [CustomChainId.Arbitrum]: { CA: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612", chainId: CustomChainId.Arbitrum },
    [CustomChainId.Polygon]: { CA: "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0", chainId: CustomChainId.Polygon },
    [CustomChainId.Avalanche]: { CA: "0x0A77230d17318075983913bC2145DB16C7366156", chainId: CustomChainId.Avalanche },
    [CustomChainId.Cronos]: { CA: "0x00Cb80Cf097D9aA9A3779ad8EE7cF98437eaE050", chainId: CustomChainId.Mainnet }
}