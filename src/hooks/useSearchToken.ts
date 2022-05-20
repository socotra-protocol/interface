import axios from "axios"
import { useMemo } from "react"
import { ethers } from "ethers"
import erc20abi from "../abis/ERC20abi.json"
import tokens from "../constants/tokens.json"

export const useSearchToken = () => {
  const checkAddress = (text: string) => {
    return false
  }

  return { token: {} }
}
