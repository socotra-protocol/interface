import { ethers } from "ethers"
export const useENS = () => {
  const provider = ethers.getDefaultProvider("homestead")
  const isValidAddress = (address: string) => {
    try {
      // getAdress methods trow an error when the passed address is incorrect
      ethers.utils.getAddress(address)
      return true
    } catch (e) {
      return false
    }
  }
  const getAddress = async (ensName: string) => {
    try {
      const resolvedAddress = isValidAddress(ensName)
        ? ensName
        : await provider.resolveName(ensName)

      console.log({ resolvedAddress })

      if (resolvedAddress) return resolvedAddress
      return null
    } catch (e) {
      return null
    }
  }
  const getENSName = async (address: string) => {
    return provider.lookupAddress(address).then((resolvedName) => {
      return resolvedName ?? address
    })
  }

  return { getAddress, getENSName }
}
