import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { PrimaryButton, SecondaryButton } from "../../components/Button"
import { LabelInput } from "../../components/Input"
import { Modal } from "../../components/Modal"
import { BranchInfo } from "../../hooks/contracts/useSocotraBranchManager"
import { useEther } from "../../hooks/useEther"
import { useSnapshot } from "../../hooks/useSnapshot"
import { ProposalMember } from "./ProposalMember"

type Props = {
  spaceName: string
  subDAOInfo: BranchInfo | null
}
export const Proposal = (props: Props) => {
  const { spaceName, subDAOInfo } = props
  const { createProposal, getProposal } = useSnapshot()
  const { getBlockNumber } = useEther()

  const [visible, setVisible] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [msgModal, setMsgModal] = useState<string>("")
  const [url, setUrl] = useState<string>("")
  const [time, setTime] = useState<string>("")

  const handleRegisterProposal = async () => {
    setMsgModal("Fetch Proposal on Snapshot.")
    setIsLoading(true)
    const arr = url.split("/")
    const proposalId = arr[arr.length - 1]

    const minus = Number(time) * 60

    console.log("proposalID ", proposalId, " minus : ", minus)

    const proposalInfo = await getProposal(proposalId)
    console.log("proposal", proposalInfo)

    //
    const currentTime = Number((new Date().getTime() / 1000).toFixed())

    const strategies = [
      {
        name: "erc20-balance-of",
        network: "4",
        params: {
          address: subDAOInfo?.subDAOToken?.address,
          symbol: subDAOInfo?.subDAOToken?.symbol,
          decimals: 18,
        },
      },
      {
        name: "erc20-balance-of-delegation",
        network: "4",
        params: {
          address: subDAOInfo?.subDAOToken?.address,
          symbol: subDAOInfo?.subDAOToken?.symbol,
          decimals: 18,
          delegationSpace: spaceName,
        },
      },
    ]

    const snapshot = await getBlockNumber()
    setMsgModal("Waiting for transactions approval 1 of 1")

    try {
      const result = await createProposal(
        spaceName,
        proposalInfo.type,
        `FORK : ${proposalInfo.title}`,
        proposalInfo.body,
        proposalInfo.choices,
        currentTime,
        +proposalInfo.end - minus,
        snapshot, // get block number now
        "4",
        JSON.stringify(strategies)
      )
      console.log("Create Proposal Completed : ", result)

      setIsLoading(false)
      setVisible(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="bg-white-dark p-[32px] rounded-[16px] flex justify-between items-center mb-[16px]">
        <div className="text-secondary-dark text-[24px]">Space {spaceName}</div>
        <PrimaryButton dark onClick={() => setVisible(true)}>
          <FontAwesomeIcon icon={faPlus} className="mr-4 text-primary-light" />{" "}
          Create Proposal
        </PrimaryButton>
      </div>
      <ProposalMember />
      <Modal visible={visible}>
        <div className="w-[670px] h-[420px] bg-white rounded-[24px] p-[48px] flex justify-between flex-col shadow-2xl">
          <div>
            <div className="text-[36px] text-secondary-dark font-medium text-center mb-[16px]">
              Create SubDAO Gov Proposal
            </div>
            <div className="mb-[8px]">
              <div className="bg-white-dark text-center p-[8px]">
                snapshot.org/#/ens.eth/proposal/0x7..00
              </div>
            </div>

            <div className="h-[68px] mb-[8px]">
              <LabelInput
                label="Proposal URL"
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="h-[68px] mb-[8px]">
              <LabelInput
                label="Before time out"
                onChange={(e) => setTime(e.target.value)}
                icon={<>Min</>}
              />
            </div>
            <div className="text-[14px] text-center"></div>
          </div>

          <div className=" grid grid-cols-4 justify-center gap-[8px]">
            <SecondaryButton
              outlined
              dark
              className="col-start-2"
              onClick={() => setVisible(false)}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton dark onClick={handleRegisterProposal}>
              Create
            </PrimaryButton>
          </div>
        </div>
      </Modal>
      <Modal visible={isLoading}>
        <div className="bg-white-light h-[90px] w-[400px] rounded-[16px] p-4 border border-white-dark flex items-center justify-center gap-[8px]">
          <img alt="" src="/assets/loading.svg" className="h-[32px] w-[32px]" />
          <div className="text-[16px text-secondary">{msgModal}</div>
        </div>
      </Modal>
    </>
  )
}
