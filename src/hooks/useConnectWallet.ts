import { useWeb3React } from "@web3-react/core"
import { injected } from "../constants/connectors"

export const useConnectWallet = () => {
  const { activate } = useWeb3React()

  const setProvider = (type: string) => {
    window.localStorage.setItem("provider", type)
  }

  const metamask = () => {
    try {
      activate(injected)
      setProvider("injected")
    } catch (error) {
      console.error(error)
    }
  }

  return { metamask }
}
