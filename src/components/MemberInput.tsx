import { SecondaryButton } from "./Button"
import { LabelInput } from "./Input"
import { ProfileMemberCard } from "./MemberCard"

export const MemberInput = () => {
  return (
    <div className="border border-white-dark p-[24px] grid grid-cols-1 gap-[16px] ">
      <div className="grid grid-cols-member items-center gap-[32px]">
        <div className="flex gap-[16px] items-center">
          <ProfileMemberCard />
        </div>
        <div className="flex gap-[24px]">
          <LabelInput label="Vote token" />
          <LabelInput label="Rewards token" />
        </div>
        <SecondaryButton outlined dark className="h-full">
          Request Fundss
        </SecondaryButton>
      </div>
    </div>
  )
}
