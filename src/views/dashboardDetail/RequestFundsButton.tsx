import { useWeb3React } from "@web3-react/core"
import { useState } from "react"
import { useParams } from "react-router"
import { PrimaryButton, SecondaryButton } from "../../components/Button"
import { LabelInput } from "../../components/Input"
import { Modal } from "../../components/Modal"
import { UploadProof } from "../../components/UploadProof"
import {
  BranchInfo,
  useSocotraBranchManager,
} from "../../hooks/contracts/useSocotraBranchManager"
import { usePinata } from "../../hooks/usePinata"

type Props = {
  subDAO?: BranchInfo | null
  symbol?: string
}
export const RequestFundsButton = (props: Props) => {
  const { id: managerAddr } = useParams()
  const { account } = useWeb3React()

  const { subDAO, symbol } = props
  const { requestPayout } = useSocotraBranchManager()

  const [visible, setVisible] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [msgModal, setMsgModal] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)
  const [description, setDescription] = useState<string>("")
  const [amount, setAmount] = useState<string>("")
  const { upload, json } = usePinata()

  const handleRequestPayout = async () => {
    try {
      setMsgModal("Uploading data to IPFS")
      setIsLoading(true)
      const ipfsImage = await upload(file)
      const ipfs = await json({ image: ipfsImage, description })
      setMsgModal("Waiting for transactions approval 1 of 1")
      setIsLoading(true)
      await requestPayout(managerAddr!, amount, account!, ipfs)
      setIsLoading(false)
      setVisible(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
      setVisible(false)
    }
  }

  const handleUpload = (file: File) => {
    setFile(file)
  }

  return (
    <>
      <PrimaryButton dark onClick={() => setVisible(true)}>
        Request Funds
      </PrimaryButton>
      <Modal visible={visible}>
        <div className="w-[560px] h-[768px] bg-white rounded-[24px] p-[48px] flex justify-between flex-col shadow-2xl">
          <div>
            <div className="text-[36px] text-secondary-dark font-medium text-center mb-[16px]">
              Request Funds
            </div>
            <div className="h-[68px] mb-[8px]">
              <LabelInput
                label="SubDAO token amount to request"
                icon={<>{symbol}</>}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="text-[16px] text-secondary-dark mb-[8px]">
              Request describtion
            </div>
            <div className="mb-[8px]">
              <UploadProof onChange={handleUpload} />
            </div>
            <div>
              <LabelInput
                label="Request description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
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
            <PrimaryButton dark onClick={handleRequestPayout}>
              Send
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
