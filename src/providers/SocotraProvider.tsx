import { ReactNode } from "react"
import { Web3Provider } from "./Web3Provider"

export const SocotraProvider = ({ children }: { children: ReactNode }) => {
  return <Web3Provider>{children}</Web3Provider>
}
