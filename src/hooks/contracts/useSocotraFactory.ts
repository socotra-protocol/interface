import { parseFixed } from "@ethersproject/bignumber"
import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import SocotraFactoryABI from "../../abis/SocotraFactory.json"
import { useERC20 } from "./useERC20"

export const socotraFactoryAddress: { [key: string]: string } = {
  "4": "0xd7bb1B130973F9f089dfDC464e7ca764023E092e",
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

  const findManagerAddress = async (txHash: string) => {
    if (!active || !chainId) return

    const provider = new ethers.providers.Web3Provider(library.provider)
    const tx = await provider.getTransactionReceipt(txHash)
    let addr = null
    for (const log of tx.logs) {
      if (
        JSON.stringify(log.topics) ===
          JSON.stringify([
            "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
            "0x0000000000000000000000000000000000000000000000000000000000000000",
            "0x0000000000000000000000004c1e632c58a1e069099aa3f61b913776ba4f32f1",
          ]) &&
        log.data == "0x"
      ) {
        addr = log.address
      }
    }
    return addr
  }
  const splitBranch = async (
    parentToken: string,
    amount: string,
    name: string,
    tokenName: string,
    tokenSymbol: string,
    imageUrl: string,
    callbackAfterApprove?: () => void,
    decimal = 18
  ) => {
    if (!active || !chainId) return

    const contract = await getContract()

    await approve(parentToken, socotraFactoryAddress[chainId], amount)
    callbackAfterApprove && callbackAfterApprove()

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

      console.log(txn, txn.hash)
      return await findManagerAddress(txn.hash)
    }
  }
  return { splitBranch }
}
