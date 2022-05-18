import { Web3ReactProvider } from "@web3-react/core"
import { ethers } from "ethers"

const getLibrary = (
  provider:
    | ethers.providers.ExternalProvider
    | ethers.providers.JsonRpcFetchFunc
) => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = 8000 // frequency provider is polling
  return library
}

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
  )
}
