import { useERC20 } from "./useERC20"
import { useEther } from "./../useEther"
import { parseFixed } from "@ethersproject/bignumber"
import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import SocotraBranchManagerABI from "../../abis/SocotraBranchManager.json"
import { string2Bin, stringToUTF8Bytes } from "../../utils/string"
import { TokenType } from "../useCovalent"

export type BranchInfo = {
  imageUrl?: string
  name?: string
  parentTokenAddress?: string
  voteTokenAddress?: string
  mainDAOToken?: TokenType
  subDAOToken?: TokenType
}

export const useSocotraBranchManager = () => {
  const { library, active, chainId } = useWeb3React()
  const { approve } = useERC20()

  const getContract = (address: string) => {
    if (!active || !chainId) return

    const provider = new ethers.providers.Web3Provider(library.provider)
    const signer = provider.getSigner()

    const SocotraFactory = new ethers.Contract(
      address,
      SocotraBranchManagerABI,
      signer
    )
    return SocotraFactory
  }

  const addMemberAllocation = async (
    managerAddr: string,
    memberAddr: string,
    voteAmount: string,
    rewardAmount: string,
    decimal = 18
  ) => {
    if (!active || !chainId) return

    const contract = await getContract(managerAddr)

    if (contract) {
      const txn = await contract.addMemberAllocation(
        memberAddr,
        parseFixed(voteAmount, decimal).toString(),
        parseFixed(rewardAmount, decimal).toString()
      )
      await txn.wait()
      console.log(txn.hash)
    }
  }

  const addBatchAllocation = async (
    managerAddr: string,
    allocate: {
      memberAddr: string
      voteAmount: string
      rewardAmount: string
    }[],
    decimal = 18
  ) => {
    if (!active || !chainId) return

    const contract = await getContract(managerAddr)

    if (contract) {
      const data = allocate.map((item) => {
        return {
          ...item,
          voteAmount: parseFixed(item.voteAmount, decimal).toString(),
          rewardAmount: parseFixed(item.rewardAmount, decimal).toString(),
        }
      })
      const txn = await contract.addBatchAllocation(data)
      await txn.wait()
      console.log(txn.hash)
    }
  }

  const memberClaimToken = async (
    managerAddr: string,
    amount: string,
    decimal = 18
  ) => {
    if (!active || !chainId) return

    const contract = await getContract(managerAddr)

    if (contract) {
      const txn = await contract.memberClaimToken(
        parseFixed(amount, decimal).toString()
      )
      await txn.wait()
      console.log(txn.hash)
    }
  }

  const branchInfo = async (
    managerAddr: string
  ): Promise<BranchInfo | null> => {
    if (!active || !chainId) return null

    const contract = await getContract(managerAddr)
    console.log("managerAddr", managerAddr)
    if (contract) {
      return await contract.branchInfo()
    }
    return null
  }

  const requestPayout = async (
    managerAddr: string,
    amount: string,
    receiver: string,
    proof: string,
    subDAOAddr: string,
    callbackAfterApprove?: () => void,
    decimal = 18
  ) => {
    if (!active || !chainId) return null

    const contract = await getContract(managerAddr)

    if (contract) {
      await approve(subDAOAddr, managerAddr, amount)
      callbackAfterApprove && callbackAfterApprove()
      const tx = await contract.requestPayout(
        parseFixed(amount, decimal).toString(),
        receiver,
        proof
      )
      await tx.wait()
      const provider = new ethers.providers.Web3Provider(library.provider)
      const transaction = await provider.getTransactionReceipt(tx.hash)
      console.log(transaction)
      return "1"
      //   let addr = null
      //   for (const log of tx.logs) {
      //     if (
      //       JSON.stringify(log.topics) ===
      //         JSON.stringify([
      //           "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
      //           "0x0000000000000000000000000000000000000000000000000000000000000000",
      //           "0x0000000000000000000000004c1e632c58a1e069099aa3f61b913776ba4f32f1",
      //         ]) &&
      //       log.data == "0x"
      //     ) {
      //       addr = log.address
      //     }
      //   }
      //   return addr
    }
    return null
  }

  const delegateSpace = async (managerAddr: string, spaceId: string) => {
    if (!active || !chainId) return null

    const contract = await getContract(managerAddr)

    if (contract) {
      const inBytes = ethers.utils.formatBytes32String(spaceId)
      console.log(inBytes)
      const tx = await contract.delegateSpace(inBytes)
      await tx.wait()
    }
  }

  const registerSnapshotVoteProxy = async (managerAddr: string) => {
    if (!active || !chainId) return null

    const contract = await getContract(managerAddr)

    if (contract) {
      const tx = await contract.registerSnapshotVoteProxy()
      await tx.wait()
      console.log("tx", tx)
    }
  }

  const issuePayout = async (managerAddr: string, payoutId: string) => {
    if (!active || !chainId) return null

    const contract = await getContract(managerAddr)

    if (contract) {
      const tx = await contract.issuePayout(payoutId)
      await tx.wait()
      console.log("tx", tx)
    }
  }
  return {
    addMemberAllocation,
    addBatchAllocation,
    memberClaimToken,
    branchInfo,
    requestPayout,
    delegateSpace,
    registerSnapshotVoteProxy,
    issuePayout,
  }
}
