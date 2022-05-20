import { Link, matchRoutes, useParams } from "react-router-dom"
import { SecondaryButton } from "../../../components/Button"
import { Cover } from "../../../components/Cover"
import { MemberCard } from "../../../components/MemberCard"
import { MemberInput } from "../../../components/MemberInput"
import { Layout } from "../../../core/Layout"
import { MembershipsCard } from "../MembershipsCard"
import { Payout } from "../Payout"
import { Proposal } from "../Proposal"

export const DashboardDetailPage = () => {
  const { id } = useParams()
  const isMember = true
  return (
    <Layout>
      <div className="grid grid-cols-dashboard-detail">
        <div className="bg-white-light p-[32px] min-h-screen  border-r border-white-dark">
          <Cover name={id!} />
          <div className="py-[32px]">
            <div className="flex items-center justify-between">
              <div className="text-secondary-dark text-[16px] font-medium">
                Reward token
              </div>
              <div className="text-secondary text-[16px]">3000 dCRV</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-secondary-dark text-[16px] font-medium">
                Vote token
              </div>
              <div className="text-secondary text-[16px]">4000 CRV</div>
            </div>
          </div>
          <div className=" text-secondary-dark text-[24px] font-medium mb-[16px]">
            Owner
          </div>
          <MemberCard size="small" />
        </div>
        <div className=" bg-white p-[24px]">
          {isMember && <Payout />}
          <Proposal />
          <div>
            <div className="flex justify-between items-center mb-[16px]">
              <div className="flex items-center gap-[8px]">
                <div className="text-secondary-dark text-[24px] font-medium">
                  Memberships
                </div>
                <div className="text-secondary text-[16px] font-medium">
                  8 members
                </div>
              </div>
              <div>
                {/* <SecondaryButton outlined dark>
                  Manage member
                </SecondaryButton> */}
              </div>
            </div>
            <div className="grid gap-[8px]">
              {Array.from({ length: 9 }).map((_, idx: number) => (
                <MembershipsCard
                  key={`member-${idx}`}
                  action={
                    <SecondaryButton outlined dark>
                      Payout
                    </SecondaryButton>
                  }
                  labels={["Vote token", "Rewards token"]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
