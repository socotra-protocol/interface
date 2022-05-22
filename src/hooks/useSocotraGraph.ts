import axios from "axios"
const url = "https://api.thegraph.com/subgraphs/name/poomch/socotra-protocol"
export const useSocotraGraph = () => {
  const branchs = async () => {
    const body = {
      query:
        "{\n  branches(first: 1000) {\n    id\n    name\n    owner\n    imageUrl\n    parentToken\n    voteToken\n    parentAmount\n  }\n  \n}\n",
      variables: null,
    }
    const { data } = await axios.post(url, body)
    return data.data.branches
  }

  const branch = async (id: string) => {
    const body = {
      query: `{\n  branch(id:\"${id}\") {\n    id\n    name\n    owner\n    imageUrl\n    voteToken\n    parentToken\n    parentAmount\n  }\n}\n`,
      variables: null,
    }
    const { data } = await axios.post(url, body)
    return data.data.branch
  }

  const members = async () => {
    const body = {
      query:
        "{\n  memberBranches(first:1000){\n    id\n    member{\n      id\n    }\n    branch{\n      id\n    }\n    availableTokens\n    totalTokens\n    claimingTokens\n    rewardAmount\n  }\n}\n",
      variables: null,
    }
    const { data } = await axios.post(url, body)
    return data.data.memberBranches
  }

  const membersByBranch = async (id: string) => {
    const body = {
      query: `{\n  memberBranches(where :{branch :"${id}"}){\n    id\n    member{\n      id\n    }\n    branch{\n      id\n    }\n    availableTokens\n    totalTokens\n    claimingTokens\n    rewardAmount\n  }\n}\n`,
      variables: null,
    }
    const { data } = await axios.post(url, body)
    return data.data.memberBranches
  }

  return { branchs, branch, members, membersByBranch }
}
