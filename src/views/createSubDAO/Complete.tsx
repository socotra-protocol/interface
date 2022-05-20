import { Cover } from "../../components/Cover"
import { SelectToken } from "../../components/SelectToken"
import { truncateAddress } from "../../utils/wallet"
import { DataType } from "./pages/CreateSubDAOPage"
import { AllocateType } from "./TokenSetting"

type Props = {
  data: DataType
}
export const Complete = (props: Props) => {
  const { data } = props
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="text-secondary-dark text-[24px] font-medium mb-[40px]">
        Confirm your result
      </div>
      <div className="grid grid-cols-2 gap-[16px]">
        <div className="flex justify-end">
          <Cover
            name={data.subDAOname!}
            image={
              data?.file ? window.URL.createObjectURL(data?.file) : undefined
            }
          />
        </div>
        <div>
          <div className="text-secondary text-[16px] font-medium mb-[8px]">
            Reward token amount
          </div>
          <SelectToken
            value={data?.token}
            onSelectToken={() => {}}
            onChange={() => {}}
          />
          <div className="text-secondary text-[16px] font-medium mb-[8px] mt-[24px]">
            Members
          </div>
          <div className="grid gap-[8px] h-[350px] overflow-scroll">
            {data?.allocate?.map((allocate: AllocateType, idx: number) => (
              <div
                className="border border-primary bg-white-light px-[16px] py-[16px] rounded-[8px] grid grid-cols-2 gap-[8px] items-center mb-[8px] "
                key={`address-${idx}`}
              >
                <div className="flex gap-[8px] items-center">
                  <div className="h-[32px] w-[32px] bg-primary-light rounded-full text-secondary-dark" />
                  {allocate?.ens || truncateAddress(allocate.address)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
