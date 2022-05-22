import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { PrimaryButton, SecondaryButton } from "../../components/Button"
import { LabelInput } from "../../components/Input"
import { Modal } from "../../components/Modal"
import { BranchInfo } from "../../hooks/contracts/useSocotraBranchManager"
import { useSnapshot } from "../../hooks/useSnapshot"

type Props = {
  subDAOInfo: BranchInfo | null
}
export const ProposalBuild = (props: Props) => {
  const { subDAOInfo } = props
  const { getSpace, space } = useSnapshot()

  const [visible, setVisible] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [msgModal, setMsgModal] = useState<string>("")
  const [ENSName, setENSName] = useState<string>("")

  const handleRegisterSpace = async () => {
    setMsgModal("Fetch Space on Snapshot.")
    setIsLoading(true)
    const spaceInfo = await getSpace(ENSName)
    console.log("spaceINfo ", spaceInfo)

    let voting: { [key: string]: boolean } = {}
    for (const key in spaceInfo.voting) {
      const element = spaceInfo.voting[key]
      if (element !== null) {
        voting[key] = element
      }
    }

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
          delegationSpace: ENSName,
        },
      },
    ]
    const settings = {
      name: spaceInfo.name,
      about: spaceInfo.about,
      network: spaceInfo.network,
      symbol: subDAOInfo?.subDAOToken?.symbol,
      private: spaceInfo.private,
      members: spaceInfo.members,
      admins: spaceInfo.admins,
      categories: spaceInfo.categories,
      plugins: spaceInfo.plugins,
      voting: voting,
      strategies: strategies,
      validation: spaceInfo.validation,
      filters: spaceInfo.filters,
    }

    setMsgModal("Waiting for signature approval 1 of 1")
    const result = await space(ENSName, settings)
    console.log("Update Space Completed", result)
    setIsLoading(false)
    setVisible(false)
  }
  return (
    <>
      <div className="bg-white-dark p-[24px] rounded-[16px] mb-[32px]">
        <div className="text-secondary-dark text-[24px] mb-[8px]">
          Build your SubDAO Proposal
        </div>
        <div className="text-[16px] mb-[8px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus
          ligula, blandit eget odio nec, laoreet blandit nisl. Vestibulum
          condimentum nunc hendrerit nibh sollicitudin iaculis. Integer interdum
          neque sit amet ipsum dapibus, congue bibendum elit tincidunt. Nam
          ullamcorper lectus quis luctus scelerisque.
        </div>
        <PrimaryButton
          dark
          onClick={() => setVisible(true)}
          className="px-20 py-4"
        >
          Start
        </PrimaryButton>
      </div>
      <Modal visible={visible}>
        <div className="w-[560px] h-[760px] bg-white rounded-[24px] p-[48px] flex justify-between flex-col shadow-2xl">
          <div>
            <div className="text-[36px] text-secondary-dark font-medium text-center mb-[16px]">
              Setup SubDAO space
            </div>
            <div className=" text-secondary-dark mb-[8px]">
              คุณจำเป็นต้องทำการสร้าง Space บน Snapshot, ไม่มี คลิ๊กที่นี่ นำ
              ENS name ของคุณมาเชื่อมต่อกับเรา
              <a
                target="_blank"
                href="https://snapshot.org/#/setup"
                rel="noreferrer"
                className="text-primary ml-[8px]"
              >
                click
              </a>{" "}
            </div>
            <div className="bg-[#FFEFB8] p-[8px flex gap-[8px] p-[8px] items-center rounded-[8px]  mb-[8px]">
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="text-secondary-dark"
              />
              <p className="text-md text-secondary-dark">
                User address must be set to controller
              </p>
            </div>
            <div className="h-[68px] mb-[8px]">
              <LabelInput
                label="ENS register space snapshot"
                onChange={(e) => setENSName(e.target.value)}
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
            <PrimaryButton dark onClick={handleRegisterSpace}>
              Register
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
