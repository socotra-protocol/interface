import snapshot from "@snapshot-labs/snapshot.js"
import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import axios from "axios"
import { useEther } from "./useEther"

const hub = "https://hub.snapshot.org" // or https://testnet.snapshot.org for testnet
const client = new snapshot.Client712(hub)

export type CreateProposalType = {
  id: string
  ipfs: string
  relayer: {
    address: string
    receipt: string
  }
}
export const useSnapshot = () => {
  const { library, account } = useWeb3React()
  const { getBlockNumber } = useEther()

  const vote = async (
    space: string,
    proposal: string,
    choice: number,
    type = "single-choice"
  ) => {
    const provider = new ethers.providers.Web3Provider(library.provider)

    const receipt = await client.vote(provider, account!, {
      space,
      proposal,
      type,
      choice,
      metadata: JSON.stringify({}),
    })
    console.log(receipt)
    return receipt
  }

  const createProposal = async (
    space: string,
    type: string,
    title: string,
    body: string,
    choices: string[],
    start: number,
    end: number,
    snapshot: number,
    network: string,
    strategies = JSON.stringify({})
  ): Promise<CreateProposalType> => {
    const provider = new ethers.providers.Web3Provider(library.provider)
    console.log({
      space,
      type,
      title,
      body,
      choices,
      start,
      end,
      snapshot,
      network,
      strategies,
      discussion: "",
      plugins: JSON.stringify({}),
      metadata: JSON.stringify({}),
    })
    const receipt = await client.proposal(provider, account!, {
      space,
      type,
      title,
      body,
      choices,
      start,
      end,
      snapshot,
      network,
      strategies,
      discussion: "",
      plugins: JSON.stringify({}),
      metadata: JSON.stringify({}),
    } as any)
    console.log(receipt)
    return receipt as CreateProposalType
  }

  const getSpace = async (spaceName: string) => {
    const url = "https://hub.snapshot.org/graphql"
    const data = {
      operationName: "Spaces",
      variables: {
        id_in: [spaceName, null],
      },
      query:
        "query Spaces($id_in: [String]) {\n  spaces(where: {id_in: $id_in}) {\n    id\n    name\n    about\n    network\n    symbol\n    network\n    terms\n    skin\n    avatar\n    twitter\n    website\n    github\n    private\n    domain\n    members\n    admins\n    categories\n    plugins\n    followersCount\n    voting {\n      delay\n      period\n      type\n      quorum\n      hideAbstain\n    }\n    strategies {\n      name\n      network\n      params\n    }\n    validation {\n      name\n      params\n    }\n    filters {\n      minScore\n      onlyMembers\n    }\n  }\n}",
    }
    const res = await axios.post(url, data)
    const space = res.data.data.spaces[0]
    return space
  }

  const getProposal = async (proposalId: string) => {
    const url = "https://hub.snapshot.org/graphql"
    const data = {
      operationName: "Proposal",
      variables: {
        id: proposalId,
      },
      query:
        "query Proposal($id: String!) {\n  proposal(id: $id) {\n    id\n    ipfs\n    title\n    body\n    discussion\n    choices\n    start\n    end\n    snapshot\n    state\n    author\n    created\n    plugins\n    network\n    type\n    quorum\n    symbol\n    strategies {\n      name\n      network\n      params\n    }\n    space {\n      id\n      name\n    }\n    scores_state\n    scores\n    scores_by_strategy\n    scores_total\n    votes\n  }\n}",
    }
    const res = await axios.post(url, data)
    const proposal = res.data.data.proposal
    return proposal
  }

  const space = async (name: string, settings: any) => {
    const provider = new ethers.providers.Web3Provider(library.provider)

    const receipt = await client.space(provider, account!, {
      space: name,
      settings: JSON.stringify(settings),
    })
    console.log(receipt)
    return receipt
  }

  const getVoter = async (proposalID: string) => {
    const url = "https://hub.snapshot.org/graphql"

    const data = {
      operationName: "Votes",
      variables: {
        id: proposalID,
        orderBy: "vp",
        orderDirection: "desc",
        first: 30000,
        voter: "",
        skip: 0,
      },
      query:
        "query Votes($id: String!, $first: Int, $skip: Int, $orderBy: String, $orderDirection: OrderDirection, $voter: String) {\n  votes(\n    first: $first\n    skip: $skip\n    where: {proposal: $id, vp_gt: 0, voter: $voter}\n    orderBy: $orderBy\n    orderDirection: $orderDirection\n  ) {\n    ipfs\n    voter\n    choice\n    vp\n    vp_by_strategy\n  }\n}",
    }
    const res = await axios.post(url, data)
    const votes = res.data.data.votes
    return votes
  }

  const getScores = async (
    space: string,
    strategies: any,
    addresses: string[]
  ) => {
    const snapshot = await getBlockNumber()
    const url = "https://score.snapshot.org/api/scores"
    const data = {
      params: {
        space,
        network: "4",
        snapshot,
        strategies,
        addresses: addresses,
      },
    }
    const res = await axios.post(url, data)

    return res.data.result.scores
  }
  return {
    vote,
    createProposal,
    space,
    getSpace,
    getProposal,
    getVoter,
    getScores,
  }
}
