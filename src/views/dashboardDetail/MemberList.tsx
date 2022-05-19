import { LabelInput } from "../../components/Input"
import { ProfileMemberCard } from "./MemberCard"

export const MemberList = () => {
  return (
    <div className="border border-white-dark p-[24px] grid grid-cols-2 gap-[16px] ">
      <ProfileMemberCard />
      <div className="flex gap-[24px]">
        <LabelInput label="Vote token" />
        <LabelInput label="Rewards token" />
      </div>
    </div>
  )
}
