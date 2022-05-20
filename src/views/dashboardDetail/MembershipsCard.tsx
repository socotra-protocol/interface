import { LabelInput } from "../../components/Input"
import { ProfileMemberCard } from "../../components/MemberCard"

type Props = {
  action?: React.ReactNode
  labels?: string[]
  ens?: string
  address: string
  subDAOAmount: string
  mainDAOAmount: string
  subDAOSymbol?: string
  mainDAOSymbol?: string
  small?: boolean
}
// Vote token Rewards token
export const MembershipsCard = (props: Props) => {
  const {
    action,
    labels,
    ens,
    address,
    subDAOAmount,
    mainDAOAmount,
    subDAOSymbol,
    mainDAOSymbol,
    small,
  } = props
  return (
    <div
      className={`border border-white-dark  bg-white-light  grid grid-cols-1 gap-[16px] rounded-[16px] max-h-[120px] ${
        small ? "p-[16px]" : "p-[24px]"
      }`}
    >
      <div className="grid grid-cols-4 items-center gap-[32px]">
        <div className="flex gap-[16px] items-center">
          <ProfileMemberCard wallet={{ ens, address }} copy small />
        </div>
        {/* <div className="flex flex-row gap-[24px]"> */}
        <div>
          <div className="text-secondary-dark text-[16px] font-medium">
            SubDAO token
          </div>
          <div className="text-secondary text-[16px]">
            {subDAOAmount} {subDAOSymbol}
          </div>
        </div>
        <div>
          <div className="text-secondary-dark text-[16px] font-medium">
            MainDAO token
          </div>
          <div className="text-secondary text-[16px]">
            {mainDAOAmount} {mainDAOSymbol}
          </div>
          {/* </div> */}
        </div>
        {action}
      </div>
    </div>
  )
}
