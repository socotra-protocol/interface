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
    console.log('managerAddr',managerAddr)
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
    decimal = 18
  ) => {
    if (!active || !chainId) return null

    const contract = await getContract(managerAddr)

    if (contract) {
      const inBytes = ethers.utils.formatBytes32String(proof)

      return await contract.requestPayout(
        parseFixed(amount, decimal).toString(),
        receiver,
        inBytes,
        { gasLimit: 42000 }
      )
    }
    return null
  }

  const delegateSpace = async (managerAddr: string, spaceId: string) => {
    if (!active || !chainId) return null

    const contract = await getContract(managerAddr)

    if (contract) {
      const inBytes = ethers.utils.formatBytes32String(spaceId)
      console.log(inBytes)
      const tx = await contract.delegateSpace(inBytes, {
        gasLimit: 42000,
      })
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
  return {
    addMemberAllocation,
    addBatchAllocation,
    memberClaimToken,
    branchInfo,
    requestPayout,
    delegateSpace,
    registerSnapshotVoteProxy,
  }
}
