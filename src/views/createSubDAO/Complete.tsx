import { Cover } from "../../components/Cover"
import { SelectToken } from "../../components/SelectToken"

export const Complete = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="text-secondary-dark text-[24px] font-medium mb-[40px]">
        Confirm your result
      </div>
      <div className="grid grid-cols-2 gap-[16px]">
        <div className="flex justify-end">
          <Cover name="socotra.eth" />
        </div>
        <div>
          <div className="text-secondary text-[16px] font-medium mb-[8px]">
            Reward token amount
          </div>
          <SelectToken value="1" onSelectToken={() => {}} onChange={() => {}} />
          <div className="text-secondary text-[16px] font-medium mb-[8px] mt-[24px]">
            Members
          </div>
          <div className="grid gap-[8px] h-[350px] overflow-scroll">
            {Array.from({ length: 8 }).map((_, idx: number) => (
              <div
                className="border border-primary bg-white-light px-[16px] py-[16px] rounded-[8px] grid grid-cols-2 gap-[8px] items-center mb-[8px] "
                key={`address-${idx}`}
              >
                <div className="flex gap-[8px] items-center">
                  <div className="h-[32px] w-[32px] bg-primary-light rounded-full text-secondary-dark" />
                  0x11212...2121123
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
