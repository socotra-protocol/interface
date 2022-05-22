import { ethers } from "ethers"
import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PrimaryButton, SecondaryButton } from "../../../components/Button"
import { Cover } from "../../../components/Cover"
import { MemberCard } from "../../../components/MemberCard"
import { SelectToken } from "../../../components/SelectToken"
import { Layout } from "../../../core/Layout"
import { useProposal } from "../../../hooks/api/useProposal"
import { useSubDAO } from "../../../hooks/api/useSubDAO"
import { useERC20 } from "../../../hooks/contracts/useERC20"
import {
  BranchInfo,
  useSocotraBranchManager,
} from "../../../hooks/contracts/useSocotraBranchManager"
import { TokenType } from "../../../hooks/useCovalent"
import { MembershipsCard } from "../MembershipsCard"
import { Payout } from "../Payout"
import { PayoutButton } from "../PayoutButton"
import { Proposal } from "../Proposal"
import { ProposalBuild } from "../ProposalBuild"
import { ProposalMember } from "../ProposalMember"
import { useSocotraGraph } from "../../../hooks/useSocotraGraph"
import { formatFixed, parseFixed } from "@ethersproject/bignumber"

type SubDAODBType = {
  domain: string | null
  id: string
  mainTokenAddress: string
  managerAddress: string
  subTokenAddress: string
  voteProxyAddress: string | null
}
export const DashboardDetailPage = () => {
  const [members, setMembers] = useState<any>()
  const { branch, membersByBranch } = useSocotraGraph()
  const { tokenInfo } = useERC20()
  const { account } = useWeb3React()
  const [subDAO, setSubDAO] = useState<any | null>(null)
  const { getSubDAO } = useSubDAO()
  const { getProposalDB } = useProposal()
  const { id: managerAddress } = useParams()
  const { branchInfo } = useSocotraBranchManager()
  const [subDAOInfo, setSubDAOInfo] = useState<SubDAODBType>()
  const [proposal, setProposal] = useState<any>()
  const [memberProposals, setMemberProposals] = useState<any[]>([])
  const fetchMemberProposal = async () => {
    const memberProposals = await getProposalDB(managerAddress!)
    setMemberProposals(memberProposals)
  }

  useEffect(() => {
    fetchMemberProposal()
  }, [])

  const isMember = true

  // const inBytes = ethers.utils.formatBytes32String(spaceName)
  // console.log(inBytes)
  //check token
  useEffect(() => {
    if (account && managerAddress) {
      fetchInfo()
      fetchMember()
    }
  }, [managerAddress, account])

  const fetchInfo = async () => {
    const data = await getSubDAO(managerAddress!)
    setSubDAOInfo(data)

    const info = await branch(managerAddress!)

    console.log(info)

    // const info = await branchInfo(managerAddr!)
    const mainDAOToken: TokenType = await tokenInfo(
      info?.parentToken!,
      managerAddress
    )
    console.log("info?.voteToken", info?.voteToken)
    const subDAOToken: TokenType = await tokenInfo(info?.voteToken!)

    setSubDAO({
      ...info,
      mainDAOToken: mainDAOToken!,
      subDAOToken: subDAOToken!,
    })
  }

  const fetchMember = async () => {
    const data = await membersByBranch(managerAddress!)
    setMembers(data)
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
                address: subDAO?.mainDAOToken?.address,
                name: subDAO?.mainDAOToken?.symbol,
                balance: subDAO?.mainDAOToken?.branchBalance,
              }}
              onSelectToken={() => {}}
              onChange={() => {}}
              selected
            />
            <SelectToken
              value={{
                address: subDAO?.subDAOToken?.address,
                symbol: "SubDAO",
                name: subDAO?.subDAOToken?.symbol,
                balance: subDAO?.subDAOToken?.totalSupply,
              }}
              onSelectToken={() => {}}
              onChange={() => {}}
              selected
            />
          </div>
          <div className=" text-secondary-dark text-[24px] font-medium mb-[16px]">
            Owner
          </div>
          <MemberCard size="small" wallet={{ address: subDAO?.owner }} />
        </div>
        <div className=" bg-white p-[24px]">
          {members
            ?.map((i: any) => i?.member?.id?.toLocaleLowerCase())
            .includes(account?.toLocaleLowerCase()) && (
            <Payout subDAO={subDAO} members={members} />
          )}
          {subDAOInfo?.domain ? (
            account?.toLocaleLowerCase() ===
            subDAO?.owner?.toLocaleLowerCase() ? (
              <Proposal spaceName={subDAOInfo?.domain} subDAOInfo={subDAO} />
            ) : (
              memberProposals.map((proposal, index) => (
                <ProposalMember proposalDB={proposal} />
              ))
            )
          ) : account?.toLocaleLowerCase() ===
            subDAO?.owner?.toLocaleLowerCase() ? (
            <ProposalBuild subDAOInfo={subDAO} fetcher={fetchInfo} />
          ) : (
            <></>
          )}
          {/* {!isOwner ? (
            <ProposalSetting subDAOToken={subDAOToken} />
          ) : (
            <Proposal />
          )} */}

          <div>
            <div className="flex justify-between items-center mb-[16px]">
              <div className="flex items-center gap-[8px]">
                <div className="text-secondary-dark text-[24px] font-medium">
                  Memberships
                </div>
                <div className="text-secondary text-[16px] font-medium">
                  {members?.length} members
                </div>
              </div>
              <div></div>
            </div>
            <div className="grid gap-[8px]">
              {members?.map((m: any, idx: number) => (
                <MembershipsCard
                  key={`member-${idx}`}
                  address={m?.member?.id}
                  subDAOAmount={formatFixed(parseFixed(m.totalTokens), 18)}
                  mainDAOAmount={formatFixed(parseFixed(m.rewardAmount), 18)}
                  action={
                    account?.toLocaleLowerCase() ===
                      subDAO?.owner?.toLocaleLowerCase() &&
                    +m.claimingTokens > 0 && (
                      <PayoutButton
                        subDAO={subDAO}
                        address={m?.member?.id?.toLocaleLowerCase()}
                      />
                    )
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
