import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { navbars, NavbarType } from "../constants/navbar"
import { PrimaryButton, SecondaryButton } from "./Button"
import { Link, useLocation } from "react-router-dom"
import { useConnectWallet } from "../hooks/useConnectWallet"
import { useWeb3React } from "@web3-react/core"
import { truncateAddress } from "../utils/wallet"
export const Navbar = () => {
  const { metamask } = useConnectWallet()
  const { pathname } = useLocation()
  const { account, activate, deactivate, active } = useWeb3React()

  return (
    <div className="p-[32px] grid grid-cols-navbar gap-[40px] border-b border-white-dark">
      <Link to="/">
        <img
          src="/socotra/socotra-logo.svg"
          className="h-[40px] cursor-pointer"
          alt="logo"
        />
      </Link>
      <div className="flex items-center gap-[32px]">
        {navbars.map((nav: NavbarType, idx: number) => (
          <Link to={nav.link} key={`link-${idx}`}>
            <div
              className={`hover:text-primary  cursor-pointer ${
                pathname === nav.link ? "text-primary" : "text-secondary"
              }`}
            >
              {nav.label}
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-[16px]">
        <Link to="/create-subdao">
          <PrimaryButton dark>
            <FontAwesomeIcon icon={faPlus} className="mr-[8px]" />
            Create
          </PrimaryButton>
        </Link>
        <SecondaryButton outlined dark onClick={active ? deactivate : metamask}>
          {active ? truncateAddress(account!) : "Connect Wallet"}
        </SecondaryButton>
      </div>
    </div>
  )
}
