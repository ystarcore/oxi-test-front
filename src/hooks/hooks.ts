import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { useEffect, useState } from "react"
import ERC20_ABI from 'src/constants/contracts/abis/erc20.json'
import { RpcProviders } from "src/constants/AppConstants"
import useRefresh from './useRefresh'
import { TransactionResponse, Web3Provider } from '@ethersproject/providers'
import { getContract } from 'src/utils'
import { MaxUint256 } from '@ethersproject/constants'
import { getAddress } from 'ethers/lib/utils'
import { useWeb3React } from '@web3-react/core'

export function useNativeTokenBalance(chainId: number): BigNumber {
  const { account } = useWeb3React()
  const [balance, setBalance] = useState(BigNumber.from(0))
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchNativeToken = async () => {
      const balance = await RpcProviders[chainId].getBalance(account)
      return balance
    }
    if (account) {
      fetchNativeToken().then(result => {
        setBalance(result)
      }).catch(error => { })
    } else {
      setBalance(BigNumber.from(0))
    }
  }, [account, slowRefresh])
  return balance
}

export function useToken(tokenContractAddress: string, chainId: number): { name: string, symbol: string, decimals: number } {
  const { account } = useWeb3React()
  const [token, setToken] = useState<any>()

  useEffect(() => {
    const fetchToken = async () => {
      const tokenContract: Contract = getContract(tokenContractAddress, ERC20_ABI, RpcProviders[chainId], account ? account : undefined)
      const name = await tokenContract.name()
      const decimals = await tokenContract.decimals()
      const symbol = await tokenContract.symbol()
      const totalSupply = await tokenContract.totalSupply()
      return { name: name, symbol: symbol, decimals: decimals, totalSupply: totalSupply }
    }
    if (tokenContractAddress) {
      fetchToken().then(result => {
        setToken(result)
      }).catch(error => { })
    }
  }, [tokenContractAddress])

  return token
}

export function useTokenCallback(): {
  tokenCallback: (tokenContractAddress: string, chainId: number) => Promise<any>
} {
  const { account } = useWeb3React()
  const tokenCallback = async function (tokenContractAddress: string, chainId: number) {
    try {
      const tokenContract: Contract = getContract(tokenContractAddress, ERC20_ABI, RpcProviders[chainId], account ? account : undefined)
      const name = await tokenContract.name()
      const decimals = await tokenContract.decimals()
      const symbol = await tokenContract.symbol()
      const address = getAddress(tokenContract.address)
      const totalSupply = await tokenContract.totalSupply()
      return { address: address, name: name, symbol: symbol, decimals: decimals, totalSupply: totalSupply }
    } catch (err) {
      return
    }
  }

  return { tokenCallback }
}

export function useTokenAllowance(): { tokenAllowanceCallback: (owner: string, spender: string, tokenContractAddress: string, chainId: number) => Promise<BigNumber> } {
  const { account } = useWeb3React()
  const tokenAllowanceCallback = async function (owner: string, spender: string, tokenContractAddress: string, chainId: number) {

    const tokenContract: Contract = getContract(tokenContractAddress, ERC20_ABI, RpcProviders[chainId], account ? account : undefined)
    return tokenContract.allowance(owner, spender).then((res: BigNumber) => {
      return res
    })
  }
  return { tokenAllowanceCallback }
}

export function useTokenBalance(tokenAddress: string, chainId: number): BigNumber {
  const { account } = useWeb3React()
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0))
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchUserBalance = async () => {
      const tokenContract: Contract = getContract(tokenAddress, ERC20_ABI, RpcProviders[chainId], account ? account : undefined)
      const amount = await tokenContract.balanceOf(account)
      return amount
    }
    if (!!account && !!tokenAddress) {
      fetchUserBalance().then(result => {
        setBalance(result)
      }).catch(error => { })
    } else {
      setBalance(BigNumber.from(0))
    }
  }, [account, tokenAddress, slowRefresh])

  return balance
}

export function useTokenBalanceCallback(): {
  tokenBalanceCallback: (tokenAddress: string, chainId: number) => Promise<BigNumber>,
  nativeBalanceCallback: (chainId: number) => Promise<BigNumber>
} {
  const { account } = useWeb3React()

  const tokenBalanceCallback = async function (tokenAddress: string, chainId: number) {

    const tokenContract: Contract = getContract(tokenAddress, ERC20_ABI, RpcProviders[chainId], account ? account : undefined)
    return tokenContract.balanceOf(account).then((res: BigNumber) => {
      return res
    })
  }

  const nativeBalanceCallback = async function (chainId: number) {

    return RpcProviders[chainId].getBalance(account).then((res: BigNumber) => {
      return res
    })
  }

  return { tokenBalanceCallback, nativeBalanceCallback }
}

export function useApproveCallback(): {
  approveCallback: (recvAddress: string, tokenContractAddress: string) => Promise<{ hash: string, allowance: BigNumber }>
} {
  const { account, provider } = useWeb3React()
  const approveCallback = async function (recvAddress: string, tokenContractAddress: string) {

    const tokenContract: Contract = getContract(tokenContractAddress, ERC20_ABI, provider as Web3Provider, account ? account : undefined)
    if (!account || !provider) return
    return tokenContract.approve(recvAddress, MaxUint256).then(async (response: TransactionResponse) => {
      return response.wait().then((_: any) => {
        return tokenContract.allowance(account, recvAddress).then((res: BigNumber) => {
          return { hash: response.hash, allowance: res }
        })
      })
    })
  }
  return { approveCallback }
}