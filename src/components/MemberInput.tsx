import { useEffect, useState } from "react"
import { SecondaryButton } from "./Button"
import { LabelInput } from "./Input"
import { ProfileMemberCard } from "./MemberCard"

type Props = {
  action: React.ReactNode
  labels: string[]
  className?: string
  wallet: {
    ens?: string
    address: string
  }
  onChange: (data: any) => void
}
// Vote token Rewards token
export const MemberInput = (props: Props) => {
  const { action, labels, className, wallet, onChange } = props
  const [subDAOAmount, setSubDAOamount] = useState<string>("")
  const [mainDAOAmount, setMainDAOamount] = useState<string>("")

  useEffect(() => {
    onChange({ subDAOAmount, mainDAOAmount })
  }, [subDAOAmount, mainDAOAmount])

  return (
    <div
      className={`border border-white-dark p-[24px] grid grid-cols-1 gap-[16px] rounded-[16px] ${
        className || ""
      }`}
    >
      <div className="grid grid-cols-member-input items-center gap-[32px]">
        <div className="flex gap-[16px] items-center">
          <ProfileMemberCard wallet={wallet} />
        </div>
        <div className="flex gap-[24px]">
          <LabelInput
            label={labels[0]}
            onChange={(e) => setSubDAOamount(e.target.value)}
          />
          <LabelInput
            label={labels[1]}
            onChange={(e) => setMainDAOamount(e.target.value)}
          />
        </div>
        {action}
      </div>
    </div>
  )
}
