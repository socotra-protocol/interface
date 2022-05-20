import { parseFixed } from "@ethersproject/bignumber"
import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import SocotraFactoryABI from "../../abis/SocotraFactory.json"
import { useERC20 } from "./useERC20"

export const socotraFactoryAddress: { [key: string]: string } = {
  "4": "0x26E6df2A1B11E551e6e9eF1a01C528223d9CFcc1",
}

export const useSocotraFactory = () => {
  const { library, active, chainId } = useWeb3React()
  const { approve } = useERC20()

  const getContract = () => {
    if (!active || !chainId) return

    const provider = new ethers.providers.Web3Provider(library.provider)
    const signer = provider.getSigner()

    const contractAddress = socotraFactoryAddress[chainId]

    const SocotraFactory = new ethers.Contract(
      contractAddress,
      SocotraFactoryABI,
      signer
    )
    return SocotraFactory
  }

  const splitBranch = async (
    parentToken: string,
    amount: string,
    name: string,
    tokenName: string,
    tokenSymbol: string,
    imageUrl: string,
    decimal = 18
  ) => {
    if (!active || !chainId) return

    const contract = await getContract()

    await approve(parentToken, socotraFactoryAddress[chainId], amount)

    if (contract) {
      const txn = await contract.splitBranch(
        parentToken,
        parseFixed(amount, decimal).toString(),
        name,
        imageUrl,
        tokenName,
        tokenSymbol
      )
      await txn.wait()
      console.log(txn.hash)
    }
  }
  return { splitBranch }
}
