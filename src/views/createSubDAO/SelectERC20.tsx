import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import { SelectToken } from "../../components/SelectToken"
import { useERC20 } from "../../hooks/contracts/useERC20"
import { TokenType, useCovalent } from "../../hooks/useCovalent"
import { useENS } from "../../hooks/useENS"

//must add type
type Props = {
  onChange: (data: any) => void
}
export const SelectERC20 = (props: Props) => {
  const { account, active } = useWeb3React()
  const { balances } = useCovalent()
  const { tokenInfo } = useERC20()
  const { isValidAddress } = useENS()
  const { onChange } = props
  const [token, setToken] = useState<TokenType | null>(null)
  const [search, setSearch] = useState<string>("")
  const [tokenList, setTokenList] = useState<any>([])
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
    if (!token) {
      getBalances()
    }
    setSearch("")
  }

  const handleChangeValue = (value: any) => {
    const amount = value.find((item: any) => item.label === "amount")?.value
    setAmount(amount)
  }

  const handleChangeInput = async (value: string) => {
    console.log(value)
    const status = await isValidAddress(value)
    console.log(status)
    if (status) {
      const { decimals, ...token } = await tokenInfo(value)
      setTokenList([token])
    } else {
      setSearch(value)
    }
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
          tokens={tokenList.filter(
            (t: any) =>
              t.symbol
                .toLocaleLowerCase()
                .indexOf(search.toLocaleLowerCase()) !== -1
          )}
          onChangeInput={handleChangeInput}
        />
      </div>
    </div>
  )
}
