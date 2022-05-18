import { Navbar } from "../components/Navbar"

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen">{children}</div>
    </>
  )
}
