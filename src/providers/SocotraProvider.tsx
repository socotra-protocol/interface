import { ReactNode } from "react"
import { LayoutProvider } from "./LayoutProvider"

export const SocotraProvider = ({ children }: { children: ReactNode }) => {
  return <LayoutProvider>{children}</LayoutProvider>
}
