import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { navbars, NavbarType } from "../constants/navbar"
import { PrimaryButton, SecondaryButton } from "./Button"

export const Navbar = () => {
  return (
    <div className="p-[32px] grid grid-cols-navbar gap-[40px] border-b border-white-dark">
      <a href="/">
        <img
          src="/socotra/socotra-logo.svg"
          className="h-[40px] cursor-pointer"
          alt="logo"
        />
      </a>
      <div className="flex items-center gap-[32px]">
        {navbars.map((nav: NavbarType, idx: number) => (
          <div className="hover:text-primary text-secondary cursor-pointer">
            {nav.label}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-[16px]">
        <PrimaryButton dark>
          <FontAwesomeIcon icon={faPlus} className="mr-[8px]" />
          Create
        </PrimaryButton>
        <SecondaryButton outlined dark>
          Connect Wallet
        </SecondaryButton>
      </div>
    </div>
  )
}
