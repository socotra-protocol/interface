import { parseFixed } from "@ethersproject/bignumber"
import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import ERC20ABI from "../../abis/ERC20abi.json"

export const useERC20 = () => {
  const { library, active, chainId } = useWeb3React()

  const getContract = (address: string) => {
    if (!active || !chainId) return

    const provider = new ethers.providers.Web3Provider(library.provider)
    const signer = provider.getSigner()

    const contract = new ethers.Contract(address, ERC20ABI, signer)
    return contract
  }

  const approve = async (
    erc20Address: string,
    spenderAddress: string,
    amount: string,
    decimal = 18
  ) => {
    const contract = await getContract(erc20Address)
    if (contract) {
      const tx = await contract.approve(
        spenderAddress,
        parseFixed(amount, decimal).toString()
      )
      await tx.wait()
    }
  }
  return { getContract, approve }
}
