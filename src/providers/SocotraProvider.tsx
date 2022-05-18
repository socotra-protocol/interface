import { ReactNode } from "react"
import { Navbar } from "../components/Navbar"

export const SocotraProvider = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}
