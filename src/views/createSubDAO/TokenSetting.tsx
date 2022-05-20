import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import { SecondaryButton } from "../../components/Button"
import { Card } from "../../components/Card"
import { LabelInput } from "../../components/Input"
import { MemberCard, ProfileMemberCard } from "../../components/MemberCard"
import { MemberInput } from "../../components/MemberInput"
import { Address } from "./Member"

type AllocateType = {
  ens?: string
  address: string
  subDAOamount: string
  mainDAOamount: string
}
type Props = {
  data: any
  onChange: (data: any) => void
}
export const TokenSetting = (props: Props) => {
  const { data, onChange } = props
  const { account } = useWeb3React()
  const [subDAOtokenName, setSubDAOtokenName] = useState("")
  const [subDAOtokenAmount, setSubDAOtokenAmout] = useState("")

  const [allocateList, setAllocateList] = useState<AllocateType[]>([])

  useEffect(() => {
    setAllocateList([
      { ens: "ME", address: account!, subDAOamount: "", mainDAOamount: "" },
      ...data?.member.map((member: Address) => {
        return {
          ...member,
          subDAOamount: "",
          mainDAOamount: "",
        }
      }),
    ])
  }, [data?.member])

  const handleRemove = (address: string) => {
    const newAddresses = allocateList
    setAllocateList(newAddresses.filter((addr) => addr.address !== address))
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
            onChange={(e) => setSubDAOtokenAmout(e.target.value)}
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
                    {subDAOtokenAmount || "---"}{" "}
                    {subDAOtokenName
                      ? subDAOtokenName + data.token.symbol
                      : "---"}
                  </div>
                </div>
                <div>
                  <div className="text-secondary text-[16px] font-medium">
                    MainDAO token
                  </div>
                  <div className="text-secondary-light text-[16px] font-medium">
                    {data.amount} {data.token.symbol}
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
                action={
                  idx === 0 ? undefined : (
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="text-secondary-light cursor-pointer"
                      onClick={()=>handleRemove(member.address)}
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
