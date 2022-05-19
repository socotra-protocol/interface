import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SecondaryButton } from "../../components/Button"
import { Card } from "../../components/Card"
import { LabelInput } from "../../components/Input"
import { MemberCard, ProfileMemberCard } from "../../components/MemberCard"
import { MemberInput } from "../../components/MemberInput"

export const SubDAOToken = () => {
  return (
    <div className="flex items-center mx-auto max-w-7xl">
      <div className="grid grid-cols-subdao gap-[16px]">
        <div>
          <div className="text-secondary-dark text-[24px] mb-[16px] font-medium">
            Create SubDAO token
          </div>
          <LabelInput label="SubDAO token name" className="mb-[8px]" />
          <LabelInput label="SubDAO token amount" className="mb-[8px]" />
          <div>
            <Card label="Contract">
              <div className="p-[32px] flex gap-[16px] items-center">
                <ProfileMemberCard />
              </div>
              <hr />
              <div className="p-[32px] grid grid-cols-2 ">
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
        </div>
        <div>
          <div className="text-secondary-dark text-[24px] mb-[16px] font-medium">
            Allocate tokens
          </div>
          <div>
            <MemberInput
              labels={["Voting token amount", "Rewards token amount"]}
              action={
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="text-secondary-light cursor-pointer"
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
