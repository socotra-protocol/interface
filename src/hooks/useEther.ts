import { ethers } from "ethers"

const provider = ethers.getDefaultProvider("rinkeby")

export const useEther = () => {
  const getBlockNumber = async () => {
    return await provider.getBlockNumber()
  }
  return { getBlockNumber }
}
