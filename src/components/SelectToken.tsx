import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { capitalizeFirstLetter } from "../utils/text"
import { LabelInput } from "./Input"

type TokenProps = {
  onClick?: () => void
  balance: string
  symbol: string
  name: string
  logo: string
}
const Token = (props: TokenProps) => {
  const { balance, symbol, name, logo, onClick } = props
  return (
    <div
      className=" cursor-pointer border border-white-dark bg-white-light px-[16px] py-[16px] rounded-[8px] grid grid-cols-2 gap-[8px] items-center mb-[8px] hover:border-primary"
      onClick={onClick}
    >
      <div className="flex items-center gap-[8px]">
        <div>
          <div className="h-[32px] w-[32px] bg-primary-light rounded-full text-secondary-dark" />
        </div>
        <div>
          <div className="text-[12px] font-medium text-secondary-dark">
            {symbol}
          </div>
          <div className="text-[12px] text-secondary">{name}</div>
        </div>
      </div>
      <div className="text-right text-secondary-dark font-medium text-[16px]">
        {balance}
      </div>
    </div>
  )
}

type SelectedTokenProps = {
  onClear: () => void
  onChange: (value: any) => void
  labels?: any[]
  value: any
}
const SelectedToken = (props: SelectedTokenProps) => {
  const { onClear, labels, value, onChange } = props
  const [inputValue, setInputValue] = useState<
    { label: string; value: string }[]
  >([])

  const handleChange = (label: string, value: string) => {
    let newInputValue: { label: string; value: string }[] = inputValue
    const idx = newInputValue.findIndex((item: any) => item?.label === label)
    if (idx !== -1) {
      newInputValue[idx] = { label, value }
    } else {
      newInputValue.push({ label, value })
    }
    setInputValue(newInputValue)
    onChange(inputValue)
  }

  return (
    <div>
      <div className="w-[454px] cursor-pointer border  bg-white-light px-[16px] py-[16px] rounded-[8px] grid grid-cols-2 gap-[8px] items-center mb-[8px] border-primary">
        <div className="flex items-center gap-[8px]">
          <div>
            <div className="h-[32px] w-[32px] bg-primary-light rounded-full text-secondary-dark" />
          </div>
          <div>
            <div className="text-[12px] font-medium text-secondary-dark">
              {value.symbol}
            </div>
            <div className="text-[12px] text-secondary">{value.name}</div>
          </div>
        </div>
        <div className="flex justify-end items-center gap-[8px]">
          <div className="text-right text-secondary-dark font-medium text-[16px]">
            {value.balance}
          </div>

          {labels && (
            <FontAwesomeIcon
              icon={faTimes}
              className="text-primary-light text-[20px]"
              onClick={onClear}
            />
          )}
        </div>
      </div>
      {labels &&
        labels.map((label, idx: number) => (
          <LabelInput
            label={capitalizeFirstLetter(label.label)}
            className="mb-[16px]"
            onChange={(e) => handleChange(label.label, e.target.value)}
            key={`input-${idx}`}
            {...label.props}
          />
        ))}
    </div>
  )
}

//must add type
type Props = {
  onSelectToken: (data: any) => void
  value: any
  onChange: (data: any) => void
  labels?: any[]
  tokens?: any[]
}
export const SelectToken = (props: Props) => {
  const { onSelectToken, value, labels, tokens, onChange } = props
  return (
    <div>
      {value ? (
        <SelectedToken
          labels={labels}
          onClear={() => onSelectToken(null)}
          onChange={(value: any) => onChange(value)}
          value={value}
        />
      ) : (
        <div className="relative border border-white-dark bg-white-light px-[16px] py-[20px] rounded-[8px]  ">
          <input
            placeholder="Search or address"
            className="focus:outline-none w-[400px] placeholder:text-secondary-light placeholder:text-[12px]"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="text-white-dark text-[20px]"
          />
        </div>
      )}
      {!value && (
        <div className="mt-[16px] h-[500px] overflow-scroll">
          {tokens &&
            tokens.map((token, idx: number) => (
              <Token
                {...token}
                onClick={() => onSelectToken(token)}
                key={`token-${idx}`}
              />
            ))}
        </div>
      )}
    </div>
  )
}
