import {
  faCircleCheck,
  faPlus,
  faSpinner,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { LabelInput } from "../../components/Input"
import { useENS } from "../../hooks/useENS"
import { truncateAddress } from "../../utils/wallet"

export type Address = {
  ens?: string
  address?: string
}
type Props = {
  onChange: (data: any) => void
}
export const Member = (props: Props) => {
  const { onChange } = props
  const { getAddress, isValidAddress, isENSName } = useENS()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [inputText, setInputText] = useState<string | null>(null)
  const [address, setAddress] = useState<Address | null>(null)
  const [correct, setCorrect] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleChangeAddress = async (value: string) => {
    setInputText(value)
    if (isENSName(value)) {
      setIsLoading(true)
      const address = await getAddress(value)
      setIsLoading(false)
      if (address) {
        setAddress({ address, ens: value })
      }
      setCorrect(address ? true : false)
    } else {
      const status = isValidAddress(value)
      setAddress({ address: value })
      setCorrect(status)
    }
  }

  const handleAddAddress = () => {
    if (address && correct) {
      const newAddresses = addresses
      setAddresses([address, ...newAddresses])
      setAddress(null)
      setInputText(null)
      setCorrect(false)
      onChange([address, ...newAddresses])
    }
  }

  const handleRemove = (address: string) => {
    const newAddresses = addresses
    setAddresses(newAddresses.filter((addr) => addr.address !== address))
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-between w-[552px] mb-[16px]">
        <div className="text-[24px] font-medium text-secondary-dark ">
          Add Sub DAO Member
        </div>
        <div className="text-[16px] text-secondary">
          {addresses.length} People
        </div>
      </div>
      <div className="flex gap-[8px]">
        <LabelInput
          label="Add address here"
          onChange={(e) => handleChangeAddress(e.target.value)}
          className="w-[464px]"
          value={inputText || ""}
          readOnly={isLoading}
          icon={
            isLoading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                className="text-primary-dark text-[18px]"
              />
            ) : correct ? (
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-primary-dark text-[18px]"
              />
            ) : null
          }
        />
        <div
          className={`flex items-center justify-center bg-primary-dark w-[80px] h-[66px] rounded-[8px] ${
            correct ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          onClick={handleAddAddress}
        >
          <FontAwesomeIcon
            icon={faPlus}
            className={`
              ${!correct && "opacity-[0.1] "} text-white-light`}
          />
        </div>
      </div>
      <div className="mt-[24px] w-[552px]  h-[500px] overflow-scroll">
        {addresses.map((addr: Address, idx: number) => (
          <div
            className="border border-white-dark bg-white-light px-[16px] py-[16px] rounded-[8px] grid grid-cols-8 gap-[8px] items-center mb-[8px] hover:border-primary"
            key={`address-${idx}`}
          >
            <div className="flex gap-[8px] items-center col-span-7">
              <div className="h-[32px] w-[32px] bg-primary-light rounded-full text-secondary-dark" />
              <p>{addr?.ens || truncateAddress(addr.address!)}</p>
            </div>
            <div className="flex justify-end items-center w-[32px]">
              <FontAwesomeIcon
                icon={faTrashCan}
                className="text-secondary-light cursor-pointer"
                onClick={() => handleRemove(addr.address!)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
