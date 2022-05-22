import { formatFixed, parseFixed } from "@ethersproject/bignumber"
import { useWeb3React } from "@web3-react/core"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { PrimaryButton, SecondaryButton } from "../../components/Button"
import { Card } from "../../components/Card"
import { MemberCard } from "../../components/MemberCard"
import { Modal } from "../../components/Modal"
import { useERC20 } from "../../hooks/contracts/useERC20"
import {
  BranchInfo,
  useSocotraBranchManager,
} from "../../hooks/contracts/useSocotraBranchManager"
import { useENS } from "../../hooks/useENS"
import { ClaimSubDAOTokenButton } from "./ClaimSubDAOTokenButton"
import { RequestFundsButton } from "./RequestFundsButton"

type Props = {
  subDAO: any | null
  members?: any
}
export const Payout = (props: Props) => {
  const { subDAO, members } = props
  const { account } = useWeb3React()
  const { id: managerAddr } = useParams()
  const { requestPayout, memberClaimToken } = useSocotraBranchManager()
  const { getENSName, isENSName } = useENS()

  const [visible, setVisible] = useState<boolean>(false)
  const [msgModal, setMsgModal] = useState<string>("")
  const [ensName, setENSName] = useState<string | undefined>(undefined)
  const [mainSymbol, setMainSymbol] = useState<string | undefined>(undefined)
  const [subSymbol, setSubSymbol] = useState<string | undefined>(undefined)

  const { symbol } = useERC20()

  const info = useMemo(() => {
    const idx = members.findIndex(
      (item: any) =>
        item?.member?.id?.toLocaleLowerCase() === account?.toLocaleLowerCase()
    )
    return members[idx]
  }, [members.length])

  useEffect(() => {
    fetchENS()
  }, [])

  const fetchENS = async () => {
    setMainSymbol("loading...")
    setSubSymbol("loading...")
    const ensName = await getENSName(account!)
    if (isENSName(ensName)) {
      setENSName(ensName)
    }

    const main = await symbol(subDAO?.parentToken)
    const sub = await symbol(subDAO?.voteToken)
    setMainSymbol(main)
    setSubSymbol(sub)
  }

  return (
    <>
      <div className="mb-[32px]">
        <Card label="Member">
          <div className="p-[32px]">
            <div className="flex justify-between">
              <MemberCard
                size="small"
                wallet={{ address: account!, ens: ensName }}
              />
              <div>
                <ClaimSubDAOTokenButton symbol={subSymbol} />
                <RequestFundsButton
                  symbol={subSymbol}
                  address={subDAO?.voteToken}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="p-[32px] grid grid-cols-2 w-[500px] ">
            <div>
              <div className="text-secondary text-[16px] font-medium">
                SubDAO Token
              </div>
              <div className="text-secondary-dark text-[16px] font-medium">
                {formatFixed(parseFixed(info?.totalTokens), 18)} {subSymbol}
              </div>
            </div>
            <div>
              <div className="text-secondary text-[16px] font-medium">
                MainDAO Token
              </div>
              <div className="text-secondary-light text-[16px] font-medium">
                {formatFixed(parseFixed(info?.rewardAmount), 18)} {mainSymbol}
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
