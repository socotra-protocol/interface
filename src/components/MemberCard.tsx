import { faCopy } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useMemo } from "react"
import { truncateAddress } from "../utils/wallet"

export const ProfileMemberCard = ({
  wallet,
  copy,
}: {
  wallet?: { ens?: string; address: string }
  copy?: boolean
}) => {
  return (
    <>
      <div className="h-[64px] w-[64px] bg-primary-light rounded-full" />
      <div className="flex flex-col">
        <div className=" text-secondary-dark text-[16px]">
          {wallet?.ens || truncateAddress(wallet?.address!)}
        </div>
        {wallet?.ens && (
          <div className=" text-secondary text-[16px]">
            {truncateAddress(wallet?.address!)}{" "}
            {copy && (
              <FontAwesomeIcon
                icon={faCopy}
                className="text-white-dark cursor-pointer"
              />
            )}
          </div>
        )}
      </div>
    </>
  )
}

type Props = {
  size?: "small" | "large"
}
export const MemberCard = (props: Props) => {
  const { size } = props

  const padding = useMemo(() => {
    if (!size) return "p-[24px]"
    if (size === "small") return "p-[16px]"
  }, [size])
  return (
    <div
      className={`border border-white-dark ${padding}  flex gap-[16px] items-center rounded-[16px]`}
    >
      <ProfileMemberCard />
    </div>
  )
}
