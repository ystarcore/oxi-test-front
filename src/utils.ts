import { JsonRpcSigner, JsonRpcProvider } from '@ethersproject/providers'

import { AddressZero } from '@ethersproject/constants'
import { BigNumber, ethers, utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { formatUnits, parseUnits } from '@ethersproject/units'
import { getAddress } from '@ethersproject/address'
import { BlockExplorer_URLS, Native_Currencies, Wrapped_Ethers } from './constants/AppConstants'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
    if (value) {
        try {
            return getAddress(value)
        } catch (e) {
            return false
        }
    }
    return false
}

export function getEtherscanLink(
    chainId: number,
    data: string,
    type: 'transaction' | 'token' | 'address' | 'block'
): string {
    let prefix = `https://etherscan.io`
    if (BlockExplorer_URLS[chainId]) {
        prefix = BlockExplorer_URLS[chainId]
    }
    switch (type) {
        case 'transaction': {
            return `${prefix}/tx/${data}`
        }
        case 'token': {
            return `${prefix}/token/${data}`
        }
        case 'block': {
            return `${prefix}/block/${data}`
        }
        case 'address':
        default: {
            return `${prefix}/address/${data}`
        }
    }
}

export function calculateGasMargin(value: BigNumber): BigNumber {
    return value.mul(BigNumber.from(10000).add(BigNumber.from(2000))).div(BigNumber.from(10000))
    // return value.mul(BigNumber.from(2))
}

export function shortenAddress(address: string, chars = 4): string {
    const parsed = isAddress(address)
    if (!parsed) {
        throw Error(`Invalid 'address' parameter '${address}'.`)
    }
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export function getSigner(library: JsonRpcProvider, account: string): JsonRpcSigner {
    return library.getSigner(account).connectUnchecked()
}

export function getProviderOrSigner(library: JsonRpcProvider, account?: string): JsonRpcProvider | JsonRpcSigner {
    return account ? getSigner(library, account) : library
}

export function getContract(address: string, ABI: any, library: JsonRpcProvider, account?: string): Contract {
    if (!isAddress(address) || address === AddressZero) {
        throw Error(`Invalid 'address' parameter '${address}'.`)
    }

    return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

export const wait = (time: number) =>
    new Promise(resolve => {
        setTimeout(resolve, time * 1000)
    })

export const formatEther = (amount: BigNumber, decimals: number = 18, toFixed: number, groupSeparator: boolean): string => {
    let res
    if (toFixed >= decimals) {
        res = ethers.FixedNumber.fromString(utils.formatUnits(amount, decimals)).toString()
    } else {
        let fixed = ethers.FixedNumber.fromString(utils.formatUnits(BigNumber.from(10).pow(toFixed), 0))
        res = ethers.FixedNumber.fromString(utils.formatUnits(amount, decimals - toFixed)).floor().divUnsafe(fixed).toString()
    }
    if (res.substring(res.length - 2, res.length) === '.0') {
        res = res.substring(0, res.length - 2)
    }
    if (groupSeparator) {
        res = utils.commify(res)
    }

    return res
}

export const parseEther = (n: string, decimals: number = 18): BigNumber => {
    return utils.parseUnits(n, decimals)
}

export const getNativeSymbol = (chainId: number): string => {
    let symbol = 'BNB'
    if (Native_Currencies[chainId]) {
        return Native_Currencies[chainId].symbol
    }
    return symbol
}

export const isWrappedEther = (chainId: number, address: string) => {
    if (address) {
        if (Wrapped_Ethers[chainId]) {
            if (Wrapped_Ethers[chainId].address.toLowerCase() === address.toLowerCase()) return true
        }
    }
    return false
}

export const getFixedDecimals = (p: number, precisions: number): number => {
    for (let i = 0; i >= -18; i--) {
        if (p >= Math.pow(10, i)) {
            return Math.abs(i) + precisions
        }
    }
    return 0
}

export const unknownToken_Icon = '/images/token_logos/unknown.svg'

export const decodeTxErrorMessage = (err: any) => {
    let message = ""
    if (err) {
        if (err.code) {
            if (err.code === "ACTION_REJECTED") return "ACTION_REJECTED"
        }
        let index = err?.message.indexOf("execution reverted:")
        if (index >= 0) {
            try {
                message = err.error.data.message
            } catch (error) { }
            if (message) {
                if (message.length > 0) return message
            }
        }
        if (err.reason) {
            return err.reason.toString()
        }
        try {
            message = (err.data?.message || err?.message || err).toString()
        } catch (error) { }
    }
    return message
}

export const floatToFixedNumber = (n: string) => {
    if (Math.floor(Number(n)) === Number(n)) return Number(n).toString()
    let index = n.length
    for (let i = n.length - 1; i >= 0; i--) {
        if (n.substring(i, i + 1) !== '0') {
            index = i
            break;
        }
    }
    return n.substring(0, index + 1)
}

export const formatEther_Optimized = (amount: BigNumber, decimals: number = 18, toFixed: number, groupSeparator: boolean) => {
    if (amount.gte(parseUnits('1', decimals))) { // >=1 
        return formatEther(amount, decimals, toFixed, groupSeparator)
    } else { // < 1 
        let num = Number(formatUnits(amount, decimals))
        let strFixedNum = floatToFixedNumber(num.toFixed(getFixedDecimals(num, toFixed)))
        if (groupSeparator) {
            return Number(strFixedNum).toLocaleString(undefined, { maximumFractionDigits: getFixedDecimals(num, toFixed) + 1 })
        } else {
            return strFixedNum
        }
    }
}

export const formatFixedNumber_Optimized = (amount: number, toFixed: number, groupSeparator: boolean) => {
    let strFixedNum = floatToFixedNumber(amount.toFixed(getFixedDecimals(amount, toFixed)))
    if (groupSeparator) {
        return Number(strFixedNum).toLocaleString(undefined, { maximumFractionDigits: getFixedDecimals(amount, toFixed) + 1 })
    } else {
        return strFixedNum
    }
}

export const getBigNumberFromInputString = (val: string, decimals: number) => {
    let amount = BigNumber.from(0)
    if (val.length > 0) {
        if (val.substring(val.indexOf('.') + 1).length <= 0) amount = parseUnits(val.substring(0, val.indexOf('.')), decimals)
        else amount = parseUnits(val, decimals)
    }
    return amount
}

export const getLocaleDateString = (date: Date) => {
    const options = {
        timeZone: "UTC",
        // timeZoneName: "short",
        year: "numeric",
        month: "long",
        day: "numeric"
    }
    return date.toLocaleDateString("en-US", options as any)
}

export const getLocaleTimeString = (date: Date) => {
    const options = {
        timeZone: "UTC",
        timeZoneName: "short",
        hour: "2-digit",
        minute: "2-digit"
    }
    return date.toLocaleTimeString("en-US", options as any)
}

export const reqOptionsAuthorized = (userToken: string, method = 'get', data = {}) => {
    return {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken
        }),
        method: method,
        body: method.toLowerCase() === 'get' ? null : JSON.stringify(data),
    }
}

export const reqOptionsPublic = (method = 'get', data = {}) => {
    return {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: method,
        body: method.toLowerCase() === 'get' ? null : JSON.stringify(data),
    }
}

export const getSignature = async (account: string, library: JsonRpcProvider, chainId: number, verifyCA: string, dynamicSaleCA: string) => {
    try {
        const from = account;
        const domain = {
            name: "dynamicSale",
            version: "1",
            chainId: chainId,
            verifyingContract: verifyCA
        };

        const types = {
            Identity: [
                { name: "Platform", type: "string" },
                { name: "Wallet", type: "address" },
                { name: "Contract", type: "address" },
            ]
        };

        // The data to sign
        const value = {
            Platform: "ignitethechain.com",
            Wallet: from,
            Contract: dynamicSaleCA
        };
        const sign = await library.getSigner()._signTypedData(domain, types, value)
        return sign
    } catch (err) {
        console.log(err)
    }
    return ''
}
