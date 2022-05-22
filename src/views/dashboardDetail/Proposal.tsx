import {
  faArrowUpRightFromSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { PrimaryButton, SecondaryButton } from "../../components/Button"
import { LabelInput } from "../../components/Input"
import { Modal } from "../../components/Modal"
import { BranchInfo } from "../../hooks/contracts/useSocotraBranchManager"
import { useEther } from "../../hooks/useEther"
import { useSnapshot } from "../../hooks/useSnapshot"
import { truncateString } from "../../utils/string"
import { truncateAddress } from "../../utils/wallet"
import { ProposalMember } from "./ProposalMember"
import dayjs from "dayjs"
import { useProposal } from "../../hooks/api/useProposal"
import { useParams } from "react-router"

export const ProposalLink = ({
  link,
  id,
  label,
  className,
}: {
  link?: string
  id?: string
  label?: string
  className?: string
}) => {
  return (
    <a target="_blank" href={link} rel="noreferrer">
      <div
        className={`bg-white-dark p-[16px] flex gap-[16px] justify-between items-center rounded-[16px] ${className}`}
      >
        <div className="flex items-center gap-[8px]">
          <div className=" text-secondary font-medium">
            {label || "Proposal ID :"}
          </div>
          <div className="text-secondary-dark">{id && truncateString(id!)}</div>
        </div>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </div>
    </a>
  )
}

type Props = {
  spaceName: string
  subDAOInfo: BranchInfo | null
}
export const Proposal = (props: Props) => {
  const { id: managerAddress } = useParams()

  const { spaceName, subDAOInfo } = props
  const { createProposal, getProposal } = useSnapshot()
  const { createProposalDB } = useProposal()
  const { getBlockNumber } = useEther()

  const [visible, setVisible] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [msgModal, setMsgModal] = useState<string>("")
  const [url, setUrl] = useState<string>("")
  const [time, setTime] = useState<string>("")
  const [step, setStep] = useState<number>(1)
  const [proposal, setProposal] = useState<any>()

  const fetchProposal = async () => {
    const proposalInfo = await getProposal(url)
    setProposal(proposalInfo)
  }

  const handleNext = async () => {
    await fetchProposal()
    setStep(2)
  }

  const handleRegisterProposal = async () => {
    setMsgModal("Fetch Proposal on Snapshot.")
    setIsLoading(true)
    // const arr = url.split("/")
    // const proposalId = arr[arr.length - 1]

    const proposalId = url

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
    setMsgModal("Waiting for signature approval 1 of 1")

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
      setMsgModal("Register Proposal.")

      await createProposalDB({
        managerAddress: managerAddress?.toLocaleLowerCase()!,
        mainProposalId: proposalId?.toLocaleLowerCase(),
        subProposalId: result.id?.toLocaleLowerCase(),
      })
      setIsLoading(false)
      setVisible(false)
      setStep(1)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setStep(1)
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
      {isLoading ? <></> : <ProposalMember />}

      <Modal visible={visible}>
        <div className="w-[560px] h-[760px] bg-white rounded-[24px] p-[48px] flex justify-between flex-col shadow-2xl">
          <div>
            <div className="text-[36px] text-secondary-dark font-medium text-center mb-[16px]">
              {step === 1 ? "Create Proposal" : "Confirm information"}
            </div>
            {step === 1 ? (
              <>
                <div className=" text-secondary-dark mb-[8px]">
                  Copy your proposal ID from the url of the proposal
                </div>
                <div className="mb-[8px] bg-white border border-white-dark p-[4px] rounded-[8px]">
                  <img src="/assets/proposalid.png" alt="" className="w-full" />
                </div>

                <div className="h-[68px] mb-[8px]">
                  <LabelInput
                    label="Proposal ID"
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
              </>
            ) : (
              <>
                <div className="mb-[8px]">
                  <ProposalLink
                    link={`https://snapshot.org/#/${proposal?.space?.id}/proposal/${proposal?.id}`}
                    id={proposal?.id}
                  />
                </div>
                <div className="text-secondary font-medium mb-[8px]">
                  Proposal Detail
                </div>
                <div className="text-secondary-dark font-medium text-[24px] mb-[18px]">
                  {proposal?.title}
                </div>
                <p className="line-clamp-3 text-secondary mb-[8px]">
                  {proposal?.body}
                </p>
                <div className="border border-white-dark p-[8px]  rounded-[8px] mb-[8px]">
                  <div className="flex items-center justify-between text-secondary-dark mb-[8px]">
                    <div className="text-secondary">Start Date </div>
                    <div>
                      {dayjs(proposal?.start * 1000).format(
                        "MMM DD, YYYY h:mm a"
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-secondary-dark mb-[8px]">
                    <div className="text-secondary">End Date </div>
                    <div>
                      {dayjs((+proposal.end - Number(time) * 60) * 1000).format(
                        "MMM DD, YYYY h:mm a"
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
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
            <PrimaryButton
              dark
              onClick={step === 1 ? handleNext : handleRegisterProposal}
            >
              {step === 1 ? "Next" : "Create"}
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
