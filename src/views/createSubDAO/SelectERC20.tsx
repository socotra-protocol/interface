import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import { SelectToken } from "../../components/SelectToken"
import { useCovalent } from "../../hooks/useCovalent"

//must add type
type Props = {
  onChange: (data: any) => void
}
export const SelectERC20 = (props: Props) => {
  const { account, active } = useWeb3React()
  const { balances } = useCovalent()
  const { onChange } = props
  const [token, setToken] = useState<{
    balance: string
    symbol: string
    name: string
    logo: string
    address: string
  } | null>(null)

  const [tokenList, setTokenList] = useState([])
  const [amount, setAmount] = useState(null)

  useEffect(() => {
    if (account && active) {
      getBalances()
    }
  }, [account, active])

  const getBalances = async () => {
    const tokens = await balances(account!)
    setTokenList(tokens)
  }

  const handleSelectToken = (token: any) => {
    setToken(token)
  }

  const handleChangeValue = (value: any) => {
    const amount = value.find((item: any) => item.label === "amount")?.value
    setAmount(amount)
  }

  useEffect(() => {
    onChange({ token, amount })
  }, [token, amount])

  return (
    <div className="flex justify-center">
      <div>
        <h1 className="text-secondary-dark font-medium text-[24px] mb-[16px] text-center">
          Select your MainDAO token
        </h1>
        <SelectToken
          onSelectToken={handleSelectToken}
          onChange={handleChangeValue}
          value={token}
          labels={[{ label: "amount", props: { max: token?.balance } }]}
          tokens={tokenList}
        />
      </div>
    </div>
  )
}
