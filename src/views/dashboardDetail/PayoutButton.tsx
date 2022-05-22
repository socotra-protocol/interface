import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
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
import { useSocotraGraph } from "../../hooks/useSocotraGraph"

type Props = {
  subDAO: BranchInfo | null
  address: string
}
export const PayoutButton = (props: Props) => {
  const { id: managerAddr } = useParams()
  const { account } = useWeb3React()
  const { payout } = useSocotraGraph()

  const { subDAO, address } = props
  const { issuePayout } = useSocotraBranchManager()

  const [visible, setVisible] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [msgModal, setMsgModal] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)
  const [description, setDescription] = useState<string>("")
  const [amount, setAmount] = useState<string>("")
  const [payoutInfo, setPayoutInfo] = useState<any>("")
  const [ipfsInfo, setIpfsInfo] = useState<any>("")
  const { upload, json, unbox } = usePinata()

  useEffect(() => {
    fetch()
  }, [])

  const fetch = async () => {
    const data = await payout(address)
    const payoutBranch = data.filter((i: any) => i?.branch?.id === managerAddr)
    if (payoutBranch.length === 1) {
      const info = await unbox(payoutBranch[0].proof)
      console.log(info, "info")
      setIpfsInfo(info)
      setPayoutInfo(payoutBranch[0])
    }
  }

  const handlePayout = async () => {
    try {
      setIsLoading(true)
      setMsgModal("Waiting for transactions approval 1 of 1")
      setIsLoading(true)
      await issuePayout(managerAddr!, payoutInfo.payoutId)
      setIsLoading(false)
      setVisible(false)
    } catch (error) {
      setIsLoading(false)
      setVisible(false)
    }
  }

  return (
    <>
      <SecondaryButton outlined dark onClick={() => setVisible(true)}>
        Payout
      </SecondaryButton>
      <Modal visible={visible}>
        <div className="w-[560px] h-[768px] bg-white rounded-[24px] p-[48px] flex justify-between flex-col shadow-2xl">
          <div>
            <div className="text-[36px] text-secondary-dark font-medium text-center mb-[16px]">
              Payout
            </div>
            <div className="text-[16px] text-secondary-dark mb-[8px]">
              Receiver : {payoutInfo?.receiver}
            </div>
            <div className="mb-[8px]">
              <img
                src={`https://cloudflare-ipfs.com/ipfs/` + ipfsInfo?.image}
                alt=""
                className="w-[200px] h-[200px]"
              />
            </div>
            <div>
              <div>Describtion : </div>
              <div>{ipfsInfo?.description}</div>
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
            <PrimaryButton dark onClick={handlePayout}>
              Payout
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
