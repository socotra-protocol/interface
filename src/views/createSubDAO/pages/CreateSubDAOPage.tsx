import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useMemo, useState } from "react"
import { PrimaryButton, SecondaryButton } from "../../../components/Button"
import { Tabs, Tab } from "../../../components/Tabs"
import { CREATE_SUB_DAO_STEP } from "../../../constants/createSubDAO"
import { Layout } from "../../../core/Layout"
import { useCreateSubDAOStep } from "../../../hooks/useCreateSubDAOStep"
import { Complete } from "../Complete"
import { Information } from "../Information"
import { Address, Member } from "../Member"
import { TokenSetting } from "../TokenSetting"
import { SelectERC20 } from "../SelectERC20"
import { TokenType } from "../../../hooks/useCovalent"
import { AllocateType } from "../TokenSetting"
import { Modal } from "../../../components/Modal"
import { usePinata } from "../../../hooks/usePinata"
import { useSocotraFactory } from "../../../hooks/contracts/useSocotraFactory"
import { useWeb3React } from "@web3-react/core"
import { parseFixed } from "@ethersproject/bignumber"
export type DataType = {
  token: TokenType
  amount: string
  subDAOname?: string
  file?: File
  member?: { address: string; ens?: string }[]
  allocate?: AllocateType[]
  subDAOTokenName: string
  subDAOTokenAmount: string
}
export const CreateSubDAOPage = () => {
  const { onNext, onPrev, value } = useCreateSubDAOStep()
  const { splitBranch } = useSocotraFactory()
  const [data, setData] = useState<any>(null)
  const { upload } = usePinata()

  const handleERC20 = (data: { token: TokenType; amount: string }) => {
    setData(data)
  }

  const handleInformation = (info: { file: File; subDAOname: string }) => {
    setData({ ...data, ...info })
  }

  const handleMember = (member: Address[]) => {
    setData({ ...data, member })
  }

  const handleTokenSetting = (allocate: {
    allocate: Address[] & { mainDAOAmount: string; subDAOAmount: string }
    subDAOTokenName: string
    subDAOTokenAmount: string
  }) => {
    setData({ ...data, ...allocate })
  }

  const onSubmit = async () => {
    const ipfs = await handleUploadIPFS()
    // await test(ipfs)
  }

  const handleUploadIPFS = async () => {
    const ipfs = await upload(data.file)
    return ipfs
  }

  const content = useMemo(() => {
    switch (value) {
      case CREATE_SUB_DAO_STEP.SELECT_ERC20:
        return <SelectERC20 onChange={handleERC20} />
      case CREATE_SUB_DAO_STEP.INFORMATION:
        return <Information onChange={handleInformation} />
      case CREATE_SUB_DAO_STEP.MEMBER:
        return <Member onChange={handleMember} />
      case CREATE_SUB_DAO_STEP.TOKEN_SETTING:
        return <TokenSetting data={data} onChange={handleTokenSetting} />
      case CREATE_SUB_DAO_STEP.COMPLETE:
        return <Complete data={data} />
    }
  }, [value])

  return (
    <>
      <Layout>
        <div>
          <div className="pt-[48px] flex items-center flex-col">
            <h1 className="text-secondary-dark text-[36px] font-bold">
              Create new Sub DAO
            </h1>
          </div>
          <div className="mt-[48px]">
            <Tabs>
              <Tab label="ERC-20" selected={value >= 1} />
              <Tab label="Information" selected={value >= 2} />
              <Tab label="Member" selected={value >= 3} />
              <Tab label="Token setting" selected={value >= 4} />
              <Tab label="Complete" selected={value >= 5} />
            </Tabs>
          </div>
          <div className="py-[48px]">
            <div className="">{content}</div>
            <div className="flex justify-center pt-[53px] ">
              <div className="grid grid-cols-2 w-[210px] gap-[8px]">
                <SecondaryButton outlined dark onClick={onPrev}>
                  Back
                </SecondaryButton>
                <PrimaryButton
                  dark
                  onClick={
                    value === CREATE_SUB_DAO_STEP.COMPLETE ? onSubmit : onNext
                  }
                >
                  {value === CREATE_SUB_DAO_STEP.COMPLETE ? (
                    <>Submit</>
                  ) : (
                    <>
                      Next <FontAwesomeIcon icon={faArrowRight} />
                    </>
                  )}
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <Modal visible={false}>
        <div className="bg-white-light h-[90px] w-[300px] rounded-[16px] p-4 border border-white-dark flex items-center justify-center gap-[8px]">
          <img alt="" src="/assets/loading.svg" className="h-[32px] w-[32px]" />
          <div className="text-[16px text-secondary">text</div>
        </div>
      </Modal>
    </>
  )
}
