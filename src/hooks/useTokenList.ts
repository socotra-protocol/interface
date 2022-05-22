import { formatFixed } from "@ethersproject/bignumber"
import { useWeb3React } from "@web3-react/core"

//uniswap tokenlist
import tokens from "../constants/tokens.json"
import { useERC20 } from "./contracts/useERC20"
export const useTokenList = () => {
  const { chainId } = useWeb3React()
  const { balanceOf } = useERC20()

  const getTokens = async () => {
    const list = []
    for (const token of tokens) {
      if (token.chainId !== chainId) continue
      const balance = await balanceOf(token.address)

      list.push({
        balance: Number(formatFixed(balance, token.decimals)).toFixed(2).toString(),
        symbol: token.symbol,
        name: token.name,
        logo: token.logoURI,
        address: token.address,
      })
    }
    return list
  }

  return { getTokens }
}
