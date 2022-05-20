import snapshot from "@snapshot-labs/snapshot.js"
import { useWeb3React } from "@web3-react/core"

const hub = "https://hub.snapshot.org" // or https://testnet.snapshot.org for testnet
const client = new snapshot.Client712(hub)

export const useSnapshot = () => {
  const { library, account } = useWeb3React()

  const vote = async (
    space: string,
    proposal: string,
    choice: number,
    type = "single-choice"
  ) => {
    const receipt = await client.vote(library.provider, account!, {
      space,
      proposal,
      type,
      choice,
      metadata: JSON.stringify({}),
    })
    console.log(receipt)
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
  ) => {
    const receipt = await client.proposal(library.provider, account!, {
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
      plugins: JSON.stringify({}),
      metadata: JSON.stringify({}),
    } as any)
    console.log(receipt)
  }

  return { vote, createProposal }
}
