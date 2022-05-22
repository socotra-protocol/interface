import axios from "axios"
const url = "https://api.thegraph.com/subgraphs/name/poomch/socotra-protocol"
export const useSocotraGraph = () => {
  const branchs = async () => {
    const body = {
      query:
        "{\n  branches(first: 1000) {\n    id\n    count\n    branchAddr\n    parentToken\n    voteToken\n  }\n}\n",
      variables: null,
    }
    const { data } = await axios.post(url, body)
    return data.data.branches
  }

  const branch = async (id: string) => {
    const body = {
      query: `{\n  branch(id :"${id}"){\n    parentToken\n    voteToken\n  }\n \n}\n`,
      variables: null,
    }
    const { data } = await axios.post(url, body)
    return data.data.branch
  }

  return { branchs, branch }
}
