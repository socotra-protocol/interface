import {
  faCircleCheck,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { LabelInput } from "../../components/Input"
import { useENS } from "../../hooks/useENS"
export const Member = () => {
  const { getAddress, getENSName } = useENS()
  const [addresses, setAddresses] = useState<string[]>([])
  const [address, setAddress] = useState<string | null>(null)
  const [correct, setCorrect] = useState<boolean>(false)

  useEffect(() => {
    // test()
  }, [])

  const test = async () => {
    const a = await getAddress(".eth")
    if (a) {
      console.log(a)
      const b = await getENSName(a!)
      console.log(b)
    }
  }
  const verifyAddress = (address: string) => {
    if (address.length < 5) {
      return false
    }
    return true
  }
  const handleChangeAddress = (address: string) => {
    setAddress(address)
    const status = verifyAddress(address)
    setCorrect(status)
  }

  const handleAddAddress = () => {
    test()

    if (address && correct) {
      const newAddresses = addresses
      setAddresses([address, ...newAddresses])
      setAddress(null)
      setCorrect(false)
    }
  }

  const handleRemove = (address: string) => {
    const newAddresses = addresses
    setAddresses(newAddresses.filter((addr) => addr !== address))
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-[24px] font-medium text-center mb-[16px]">
        Add Sub DAO Member
      </div>
      <div className="flex gap-[8px]">
        <LabelInput
          label="Add address here"
          onChange={(e) => handleChangeAddress(e.target.value)}
          className="w-[464px]"
          value={address || ""}
          icon={
            correct ? (
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
        {addresses.map((addr: string, idx: number) => (
          <div
            className="border border-white-dark bg-white-light px-[16px] py-[16px] rounded-[8px] grid grid-cols-2 gap-[8px] items-center mb-[8px] hover:border-primary"
            key={`address-${idx}`}
          >
            <div className="flex gap-[8px] items-center">
              <div className="h-[32px] w-[32px] bg-primary-light rounded-full text-secondary-dark" />
              {addr}
            </div>
            <div className="flex justify-end items-center">
              <FontAwesomeIcon
                icon={faTrashCan}
                className="text-secondary-light cursor-pointer"
                onClick={() => handleRemove(addr)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
