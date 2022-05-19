import { SecondaryButton } from "./Button"
import { LabelInput } from "./Input"
import { ProfileMemberCard } from "./MemberCard"

type Props = {
  action: React.ReactNode
  labels: string[]
}
// Vote token Rewards token
export const MemberInput = (props: Props) => {
  const { action, labels } = props
  return (
    <div className="border border-white-dark p-[24px] grid grid-cols-1 gap-[16px] rounded-[16px] ">
      <div className="grid grid-cols-member-input items-center gap-[32px]">
        <div className="flex gap-[16px] items-center">
          <ProfileMemberCard />
        </div>
        <div className="flex gap-[24px]">
          <LabelInput label={labels[0]} />
          <LabelInput label={labels[1]} />
        </div>
        {action}
      </div>
    </div>
  )
}
