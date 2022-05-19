import { SelectToken } from "../../components/SelectToken"

type Props = {
  token?: any
}
export const TokenSetting = (props: Props) => {
  const { token } = props

  return (
    <div className="flex justify-center">
      <div>
        <SelectToken
          onSelectToken={() => {}}
          onChange={() => {}}
          value={token}
          labels={["SubDAO Token Name", "Amount"]}
        />
      </div>
    </div>
  )
}
