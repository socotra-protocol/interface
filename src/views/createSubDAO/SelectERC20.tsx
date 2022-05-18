import { useState } from "react"
import { SelectToken } from "../../components/SelectToken"

//must add type
type Props = {
  onChange: (data: any) => void
}
export const SelectERC20 = (props: Props) => {
  const { onChange } = props
  //token type pls
  const [token, setToken] = useState<any>(null)

  const handleSelectToken = (token: any) => {
    console.log(token)
    setToken(token)
  }
  return (
    <div className="flex justify-center">
      <div>
        <h1 className="text-secondary-dark font-medium text-[24px] mb-[16px] text-center">
          Select your main token
        </h1>
        <SelectToken
          onSelectToken={handleSelectToken}
          onChange={() => {}}
          value={token}
        />
      </div>
    </div>
  )
}
