import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { LabelInput } from "./Input"

type TokenProps = {
  onClick?: () => void
}
const Token = (props: TokenProps) => {
  const { onClick } = props
  return (
    <div
      className=" cursor-pointer border border-white-dark bg-white-light px-[16px] py-[16px] rounded-[8px] grid grid-cols-2 gap-[8px] items-center mb-[8px] hover:border-primary"
      onClick={onClick}
    >
      <div className="flex items-center gap-[8px]">
        <div>
          <div className="h-[32px] w-[32px] rounded-full bg-white-dark "></div>
        </div>
        <div>
          <div className="text-[12px] font-medium text-secondary-dark">ETH</div>
          <div className="text-[12px] text-secondary">Ether</div>
        </div>
      </div>
      <div className="text-right text-secondary-dark font-medium text-[16px]">
        100
      </div>
    </div>
  )
}

type SelectedTokenProps = {
  onClear: () => void
  onChange: (value: any) => void
  labels?: string[]
}
const SelectedToken = (props: SelectedTokenProps) => {
  const { onClear, labels, onChange } = props
  return (
    <div>
      <div className="w-[454px] cursor-pointer border  bg-white-light px-[16px] py-[16px] rounded-[8px] grid grid-cols-2 gap-[8px] items-center mb-[8px] border-primary">
        <div className="flex items-center gap-[8px]">
          <div>
            <div className="h-[32px] w-[32px] rounded-full bg-white-dark "></div>
          </div>
          <div>
            <div className="text-[12px] font-medium text-secondary-dark">
              ETH
            </div>
            <div className="text-[12px] text-secondary">Ether</div>
          </div>
        </div>
        <div className="flex justify-end items-center gap-[8px]">
          <div className="text-right text-secondary-dark font-medium text-[16px]">
            100
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
      {labels && (
        <>
          <LabelInput label={labels[0]} className="mb-[16px]" />
          <LabelInput label={labels[1]} />
        </>
      )}
    </div>
  )
}

//must add type
type Props = {
  onSelectToken: (data: any) => void
  value: any
  onChange: (data: any) => void
  labels?: string[]
}
export const SelectToken = (props: Props) => {
  const { onSelectToken, value, labels, onChange } = props
  return (
    <div>
      {value ? (
        <SelectedToken
          labels={labels}
          onClear={() => onSelectToken(null)}
          onChange={(value: any) => onChange(value)}
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
          {Array.from({ length: 8 }).map((_, idx: number) => (
            <Token onClick={() => onSelectToken(idx)} key={`token-${idx}`} />
          ))}
        </div>
      )}
    </div>
  )
}
