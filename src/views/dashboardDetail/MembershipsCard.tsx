import { LabelInput } from "../../components/Input"
import { ProfileMemberCard } from "../../components/MemberCard"

type Props = {
  action: React.ReactNode
  labels: string[]
}
// Vote token Rewards token
export const MembershipsCard = (props: Props) => {
  const { action, labels } = props
  return (
    <div className="border border-white-dark p-[24px] grid grid-cols-1 gap-[16px] rounded-[16px] ">
      <div className="grid grid-cols-member items-center gap-[32px]">
        <div className="flex gap-[16px] items-center">
          <ProfileMemberCard />
        </div>
        <div className="flex gap-[24px]">
          <div>
            <div className="text-secondary-dark text-[16px] font-medium">
              SubDAO token
            </div>
            <div className="text-secondary text-[16px]">100 dCRV</div>
          </div>
          <div>
            <div className="text-secondary-dark text-[16px] font-medium">
              MainDAO token
            </div>
            <div className="text-secondary text-[16px]">100 CRV</div>
          </div>
        </div>
        {action}
      </div>
    </div>
  )
}
