import { Navbar } from "../components/Navbar"

type Props = {
  children: React.ReactNode
}
export const LayoutProvider = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className="bg-white">{children}</div>
    </>
  )
}
