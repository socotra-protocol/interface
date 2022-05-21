import { PrimaryButton } from "../../components/Button"
import { useSnapshot } from "../../hooks/useSnapshot"

export const Proposal = () => {
  const { createProposal, vote } = useSnapshot()

  const handleCreate = async () => {
    const { id } = await createProposal(
      "zunnoon.eth",
      "single-choice",
      "Go let GO",
      "hi",
      ["Go", "Go go"],
      Number((new Date().getTime() / 1000).toFixed()),
      Number((new Date().getTime() / 1000 + 3600).toFixed()),
      10713014,
      "4",
      JSON.stringify({
        name: "ticket",
        network: "4",
        params: {
          symbol: "TICKET",
        },
      })
    )
    await vote("zunnoon.eth", id, 1)
  }
  return (
    <div className="bg-white-dark p-[24px] rounded-[16px] mb-[32px]">
      <div className="text-secondary-dark text-[24px] mb-[8px]">
        Governance Proposal
      </div>
      <div className="text-[16px] mb-[8px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus
        ligula, blandit eget odio nec, laoreet blandit nisl. Vestibulum
        condimentum nunc hendrerit nibh sollicitudin iaculis. Integer interdum
        neque sit amet ipsum dapibus, congue bibendum elit tincidunt. Nam
        ullamcorper lectus quis luctus scelerisque.
      </div>
      <PrimaryButton dark onClick={handleCreate}>
        Governance proposal
      </PrimaryButton>
    </div>
  )
}
