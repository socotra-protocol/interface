import { PrimaryButton, SecondaryButton } from "../../components/Button"
import { Card } from "../../components/Card"
import { MemberCard } from "../../components/MemberCard"

export const Payout = () => {
  return (
    <div className="mb-[32px]">
      <Card label="Member">
        <div className="p-[32px]">
          <div className="flex justify-between">
            <MemberCard size="small" />
            <div>
              <SecondaryButton outlined light>
                Claim funds
              </SecondaryButton>
              <PrimaryButton dark className="ml-[8px]">
                Payout
              </PrimaryButton>
            </div>
          </div>
        </div>
        <hr />
        <div className="p-[32px] grid grid-cols-2 w-[500px] ">
          <div>
            <div className="text-secondary text-[16px] font-medium">
              Voting token
            </div>
            <div className="text-secondary-dark text-[16px] font-medium">
              3000 dCRV
            </div>
          </div>
          <div>
            <div className="text-secondary text-[16px] font-medium">
              Rewards token
            </div>
            <div className="text-secondary-light text-[16px] font-medium">
              4000 CRV
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
