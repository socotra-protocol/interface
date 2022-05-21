import { useWeb3React } from "@web3-react/core"
import { useState } from "react"
import { PrimaryButton } from "../../components/Button"
import { LabelInput } from "../../components/Input"
import { TokenType } from "../../hooks/useCovalent"
import { useEther } from "../../hooks/useEther"
import { useSnapshot } from "../../hooks/useSnapshot"
//0xd27f64E1F519070946C8896426ED2c5Cc7FccB11

type Props = {
  subDAOToken: TokenType | null
}
export const ProposalSetting = (props: Props) => {
  const { subDAOToken } = props
  const { getSpace, space, getProposal, createProposal } = useSnapshot()
  const { getBlockNumber } = useEther()

  const [spaceName, setSpaceName] = useState<string>("")
  const [proposalId, setProposalId] = useState<string>("")

  const handleCreateProposal = async () => {
    const proposalInfo = await getProposal(proposalId)
    console.log(proposalInfo)

    //
    const currentTime = Number((new Date().getTime() / 1000).toFixed())
    const strategies = [
      {
        name: "erc20-balance-of",
        network: "4",
        params: {
          address: subDAOToken?.address,
          symbol: subDAOToken?.symbol,
          decimals: 18,
        },
      },
      {
        name: "erc20-balance-of-delegation",
        network: "4",
        params: {
          address: subDAOToken?.address,
          symbol: subDAOToken?.symbol,
          decimals: 18,
          delegationSpace: spaceName,
        },
      },
    ]

    const snapshot = await getBlockNumber()

    const result = await createProposal(
      spaceName,
      proposalInfo.type,
      `FORK : ${proposalInfo.title}`,
      proposalInfo.body,
      proposalInfo.choices,
      currentTime,
      +proposalInfo.end - 7200,
      Number(snapshot), // get block number now
      "4",
      JSON.stringify(strategies)
    )
    console.log("result", result)
  }

  const handleCreate = async () => {
    const spaceInfo = await getSpace(spaceName)
    console.log("spaceINfo ", spaceInfo)

    let voting: { [key: string]: boolean } = {}
    for (const key in spaceInfo.voting) {
      const element = spaceInfo.voting[key]
      if (element !== null) {
        voting[key] = element
      }
    }

    const strategies = [
      {
        name: "erc20-balance-of",
        network: "4",
        params: {
          address: subDAOToken?.address,
          symbol: subDAOToken?.symbol,
          decimals: 18,
        },
      },
      {
        name: "erc20-balance-of-delegation",
        network: "4",
        params: {
          address: subDAOToken?.address,
          symbol: subDAOToken?.symbol,
          decimals: 18,
          delegationSpace: spaceName,
        },
      },
    ]
    const settings = {
      name: spaceInfo.name,
      about: spaceInfo.about,
      network: spaceInfo.network,
      symbol: subDAOToken?.symbol,
      //   symbol: spaceInfo.symbol,
      private: spaceInfo.private,
      members: spaceInfo.members,
      admins: spaceInfo.admins,
      categories: spaceInfo.categories,
      plugins: spaceInfo.plugins,
      voting: voting,
      strategies: strategies,
      validation: spaceInfo.validation,
      filters: spaceInfo.filters,
    }
    console.log("settings", settings)
    const result = await space(spaceName, settings)
    console.log("result", result)
    await handleCreateProposal()
  }
  return (
    <div className="border-white-dark bg-white-light border rounded-[16px] p-[16px] mb-[16px]">
      <div className="text-secondary-dark text-[24px] font-medium mb-[16px]">
        Set-up SubDAO Governance Proposal
      </div>
      <div className="grid grid-cols-1 gap-[8px]">
        <div className="grid grid-cols-1 items-center gap-[8px]">
          <LabelInput
            label="Space Name (Snapshot)"
            className="col-span-3"
            onChange={(e) => setSpaceName(e.target.value)}
          />
          {/* <PrimaryButton dark>Register Space</PrimaryButton> */}
        </div>
        <div className="grid grid-cols-1 items-center gap-[8px]">
          <LabelInput
            label="Main Governance Proposal Id"
            className="col-span-3"
            onChange={(e) => setProposalId(e.target.value)}
          />
        </div>
        <PrimaryButton dark onClick={handleCreate}>
          Create SubDAO Proposal
        </PrimaryButton>
      </div>
    </div>
  )
}
