import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { navbars, NavbarType } from "../constants/navbar"
import { PrimaryButton, SecondaryButton } from "./Button"
import { Link } from "react-router-dom"
export const Navbar = () => {
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
          <div className="hover:text-primary text-secondary cursor-pointer">
            {nav.label}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-[16px]">
        <Link to="/create-subdao">
          <PrimaryButton dark>
            <FontAwesomeIcon icon={faPlus} className="mr-[8px]" />
            Create
          </PrimaryButton>
        </Link>
        <SecondaryButton outlined dark>
          Connect Wallet
        </SecondaryButton>
      </div>
    </div>
  )
}
