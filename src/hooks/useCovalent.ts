import axios from "axios"
import { formatFixed } from "@ethersproject/bignumber"

export type TokenType = {
  balance: string
  symbol: string
  name: string
  logo: string
  address: string
  decimals?: string;
}

const key = process.env.REACT_APP_COVALENTHQ_KEY
export const useCovalent = () => {
    
  const balances = async (address: string) => {
    const url = `https://api.covalenthq.com/v1/1/address/${address}/balances_v2/`
    const params = {
      "quote-currency": "USD",
      format: "JSON",
      nft: false,
      "no-nft-fetch": false,
      key,
    }

    const response = await axios.get(url, { params })
    const tokens = response.data.data.items
      .filter(
        (item: any) => item.contract_name !== "Ether" && +item.balance > 0
      )
      .map((item: any) => {
        return {
          balance: formatFixed(item.balance, item.contract_decimals),
          symbol: item.contract_ticker_symbol,
          name: item.contract_name,
          logo: item.logo_url,
          address: item.contract_address,
        }
      })

    return tokens
  }
  return { balances }
}
