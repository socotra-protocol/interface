import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useWeb3React } from "@web3-react/core"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { SecondaryButton } from "../../components/Button"
import { Card } from "../../components/Card"
import { LabelInput } from "../../components/Input"
import { MemberCard, ProfileMemberCard } from "../../components/MemberCard"
import { MemberInput } from "../../components/MemberInput"
import { Address } from "./Member"
import { DataType } from "./pages/CreateSubDAOPage"
import CountUp from "react-countup"

export type AllocateType = {
  ens?: string
  address: string
  subDAOAmount: string
  mainDAOAmount: string
}
type Props = {
  data: DataType
  onChange: (data: any) => void
}
export const TokenSetting = (props: Props) => {
  const { data, onChange } = props
  const { account } = useWeb3React()
  const [subDAOtokenName, setSubDAOtokenName] = useState("")
  const [subDAOtokenAmountInit, setSubDAOtokenAmoutInit] = useState<
    string | null
  >(null)
  const [subDAOtokenAmount, setSubDAOtokenAmount] = useState<string | null>(
    null
  )
  const [mainDAOtokenAmount, setMainDAOtokenAmount] = useState("")
  const [allocateList, setAllocateList] = useState<AllocateType[]>([])

  useEffect(() => {
    setAllocateList([
      { ens: "ME", address: account!, subDAOAmount: "", mainDAOAmount: "" },
      ...data?.member!.map((member: Address) => {
        return {
          ens: member?.ens,
          address: member.address!,
          subDAOAmount: "",
          mainDAOAmount: "",
        }
      }),
    ])
  }, [])

  useEffect(() => {
    calcSubDAOAmount(allocateList)
  }, [subDAOtokenAmountInit])

  const handleRemove = (address: string) => {
    const newAddresses = allocateList
    setAllocateList(newAddresses.filter((addr) => addr.address !== address))
  }

  const calcSubDAOAmount = (allocate?: AllocateType[]) => {
    if (!Boolean(subDAOtokenAmountInit)) {
      return setSubDAOtokenAmount(null)
    }

    if (allocate) {
      const total = allocate.reduce(
        (acc, all) => Number(all.subDAOAmount) + acc,
        0
      )

      setSubDAOtokenAmount((Number(subDAOtokenAmountInit) - total).toString())
    }
  }

  const calcMainDAOAmount = (allocate?: AllocateType[]) => {
    if (allocate) {
      const total = allocate.reduce(
        (acc, all) => Number(all.mainDAOAmount) + acc,
        0
      )

      setMainDAOtokenAmount((Number(data.amount) - total).toString())
    }
  }

  const handleAllocate = (
    address: string,
    amount: { subDAOAmount: string; mainDAOAmount: string }
  ) => {
    const newAllocateList = allocateList
    const idx = newAllocateList.findIndex((item) => item.address === address)
    newAllocateList[idx] = { ...newAllocateList[idx], ...amount }
    setAllocateList(newAllocateList)
    onChange({
      allocate: newAllocateList,
      subDAOTokenAmount: subDAOtokenAmountInit,
      subDAOTokenName: subDAOtokenName,
    })

    //must move
    calcSubDAOAmount(newAllocateList)
    calcMainDAOAmount(newAllocateList)
  }

  return (
    <div className="flex items-center mx-auto max-w-7xl">
      <div className="grid grid-cols-subdao gap-[16px]">
        <div>
          <div className="text-secondary-dark text-[24px] mb-[16px] font-medium">
            Create SubDAO token
          </div>
          <LabelInput
            label="SubDAO token name"
            className="mb-[8px]"
            onChange={(e) => setSubDAOtokenName(e.target.value)}
          />
          <LabelInput
            label="SubDAO token amount"
            className="mb-[8px]"
            onChange={(e) => {
              setSubDAOtokenAmoutInit(e.target.value)
            }}
          />
          <div>
            <Card label="Contract">
              {/* <div className="p-[32px] flex gap-[16px] items-center">
                <ProfileMemberCard />
              </div>
              <hr /> */}
              <div className="p-[32px] grid grid-cols-2 ">
                <div>
                  <div className="text-secondary text-[16px] font-medium">
                    SubDAO token
                  </div>
                  <div className="text-secondary-dark text-[16px] font-medium">
                    {subDAOtokenAmount ? (
                      <CountUp
                        end={Number(subDAOtokenAmount)}
                        preserveValue={true}
                        decimals={2}
                        duration={0.5}
                      />
                    ) : (
                      "---"
                    )}{" "}
                    {subDAOtokenName || "---"}
                  </div>
                </div>
                <div>
                  <div className="text-secondary text-[16px] font-medium">
                    MainDAO token
                  </div>
                  <div className="text-secondary-light text-[16px] font-medium">
                    <CountUp
                      end={Number(mainDAOtokenAmount)}
                      preserveValue={true}
                      decimals={2}
                      duration={0.5}
                    />{" "}
                    {data?.token?.symbol}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div>
          <div className="text-secondary-dark text-[24px] mb-[16px] font-medium">
            Allocate tokens
          </div>
          <div>
            {allocateList.map((member: AllocateType, idx: number) => (
              <MemberInput
                wallet={{ ens: member?.ens, address: member.address }}
                labels={["SubDAO token amount", "MainDAO token amount"]}
                onChange={(data) => handleAllocate(member.address, data)}
                action={
                  idx === 0 ? undefined : (
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="text-secondary-light cursor-pointer"
                      onClick={() => handleRemove(member.address)}
                    />
                  )
                }
                key={`member-${idx}`}
                className="mb-[8px]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
