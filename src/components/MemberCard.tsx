import { faCopy } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useMemo } from "react"
import { truncateAddress } from "../utils/wallet"

export const ProfileMemberCard = ({
  wallet,
  copy,
  small,
}: {
  wallet?: { ens?: string; address: string }
  copy?: boolean
  small?: boolean
}) => {
  return (
    <>
      <div
        className={` bg-primary-light rounded-full ${
          small ? "h-[32px] w-[32px]" : "h-[64px] w-[64px]"
        }`}
      />
      <div className="flex flex-col">
        <div className=" text-secondary-dark text-[16px]">
          {wallet?.ens || truncateAddress(wallet?.address!)}{" "}
          {copy && (
            <FontAwesomeIcon
              icon={faCopy}
              className="text-white-dark cursor-pointer"
            />
          )}
        </div>
        {/* {wallet?.ens && (
          <div className=" text-secondary text-[16px]">
            {truncateAddress(wallet?.address!)}{" "}
            {copy && (
              <FontAwesomeIcon
                icon={faCopy}
                className="text-white-dark cursor-pointer"
              />
            )}
          </div>
        )} */}
      </div>
    </>
  )
}

type Props = {
  size?: "small" | "large"
  wallet?: { ens?: string; address: string }
  copy?: boolean
}
export const MemberCard = (props: Props) => {
  const { size, wallet, copy } = props

  const padding = useMemo(() => {
    if (!size) return "p-[24px]"
    if (size === "small") return "p-[16px]"
  }, [size])
  return (
    <div
      className={`border border-white-dark ${padding}  flex gap-[16px] items-center rounded-[16px]`}
    >
      <ProfileMemberCard wallet={wallet} copy={copy} />
    </div>
  )
}
