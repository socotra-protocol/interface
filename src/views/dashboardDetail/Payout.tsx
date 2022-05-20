import { useWeb3React } from "@web3-react/core"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { PrimaryButton, SecondaryButton } from "../../components/Button"
import { Card } from "../../components/Card"
import { MemberCard } from "../../components/MemberCard"
import { Modal } from "../../components/Modal"
import { useSocotraBranchManager } from "../../hooks/contracts/useSocotraBranchManager"

export const Payout = () => {
  const { account } = useWeb3React()
  const { id: managerAddr } = useParams()
  const [visible, setVisible] = useState<boolean>(false)
  const [msgModal, setMsgModal] = useState<string>("")

  const { requestPayout, memberClaimToken } = useSocotraBranchManager()

  const handleRequestPayout = async () => {
    try {
      setMsgModal("Waiting for transactions approval 1 of 1")
      setVisible(true)
      await requestPayout(managerAddr!, "10", account!, "")
      setVisible(false)
    } catch (error) {
      setVisible(false)
    }
  }
  const handleMemberClaimToken = async () => {
    try {
      setMsgModal("Waiting for transactions approval 1 of 1")
      setVisible(true)
      await memberClaimToken(managerAddr!, "10")
      setVisible(false)
    } catch (error) {
      setVisible(false)
    }
  }

  return (
    <>
      <div className="mb-[32px]">
        <Card label="Member">
          <div className="p-[32px]">
            <div className="flex justify-between">
              <MemberCard size="small" />
              <div>
                <SecondaryButton
                  outlined
                  light
                  className="mr-[8px]"
                  onClick={handleMemberClaimToken}
                >
                  Claim SubDAO token
                </SecondaryButton>
                <PrimaryButton dark onClick={handleRequestPayout}>
                  Request Funds
                </PrimaryButton>
              </div>
            </div>
          </div>
          <hr />
          <div className="p-[32px] grid grid-cols-2 w-[500px] ">
            <div>
              <div className="text-secondary text-[16px] font-medium">
                Voting token
              </div>
              <div className="text-secondary-dark text-[16px] font-medium">
                3000 dCRV
              </div>
            </div>
            <div>
              <div className="text-secondary text-[16px] font-medium">
                Rewards token
              </div>
              <div className="text-secondary-light text-[16px] font-medium">
                4000 CRV
              </div>
            </div>
          </div>
        </Card>
      </div>
      <Modal visible={visible}>
        <div className="bg-white-light h-[90px] w-[400px] rounded-[16px] p-4 border border-white-dark flex items-center justify-center gap-[8px]">
          <img alt="" src="/assets/loading.svg" className="h-[32px] w-[32px]" />
          <div className="text-[16px text-secondary">{msgModal}</div>
        </div>
      </Modal>
    </>
  )
}
