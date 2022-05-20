import { formatFixed } from "@ethersproject/bignumber"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { SecondaryButton } from "../../../components/Button"
import { Cover } from "../../../components/Cover"
import { MemberCard } from "../../../components/MemberCard"
import { SelectToken } from "../../../components/SelectToken"
import { Layout } from "../../../core/Layout"
import { useERC20 } from "../../../hooks/contracts/useERC20"
import {
  BranchInfo,
  useSocotraBranchManager,
} from "../../../hooks/contracts/useSocotraBranchManager"
import { TokenType } from "../../../hooks/useCovalent"
import { MembershipsCard } from "../MembershipsCard"
import { Payout } from "../Payout"
import { Proposal } from "../Proposal"

export const DashboardDetailPage = () => {
  const { id: managerAddr } = useParams()
  const { branchInfo } = useSocotraBranchManager()
  const { tokenInfo } = useERC20()
  const [subDAO, setSubDAO] = useState<BranchInfo | null>(null)
  const [mainDAOToken, setMainToken] = useState<TokenType | null>(null)
  const [subDAOToken, setSubToken] = useState<TokenType | null>(null)
  const isMember = true

  useEffect(() => {
    // fetchInfo()
  }, [])

  const fetchInfo = async () => {
    const info = await branchInfo(managerAddr!)
    setSubDAO(info)

    const mainDAO = await tokenInfo(info?.parentTokenAddress!)
    console.log("mainDAO", mainDAO)
    const subDAO = await tokenInfo(info?.voteTokenAddress!)
    console.log("subDAO", subDAO)
  }

  return (
    <Layout>
      <div className="grid grid-cols-dashboard-detail">
        <div className="bg-white-light p-[32px] min-h-screen  border-r border-white-dark">
          <Cover name={subDAO?.name!} />
          <div className="py-[32px]">
            <SelectToken
              value={{
                symbol: "MainDAO",
                address: "",
                name: "",
                balance: "",
              }}
              onSelectToken={() => {}}
              onChange={() => {}}
              selected
            />
            <SelectToken
              value={{
                address: "",
                symbol: "SubDAO",
                name: "",
                balance: "",
              }}
              onSelectToken={() => {}}
              onChange={() => {}}
              selected
            />
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
                  address={""}
                  subDAOAmount={"1"}
                  mainDAOAmount={"1"}
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
