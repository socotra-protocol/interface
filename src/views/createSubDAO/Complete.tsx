import { SelectToken } from "../../components/SelectToken"
import { MembershipsCard } from "../dashboardDetail/MembershipsCard"
import { DataType } from "./pages/CreateSubDAOPage"
import { AllocateType } from "./TokenSetting"

type Props = {
  data: DataType
  isCompleted?: boolean
  label: string
}
export const Complete = (props: Props) => {
  const { data, isCompleted, label } = props
  return (
    <>
      <div className="flex justify-center flex-col items-center">
        <div className="text-secondary-dark text-[24px] font-medium mb-[40px]">
          {label}
        </div>
        <div className="grid grid-cols-4 gap-[16px]">
          <div className="flex justify-end col-start-2 relative">
            <img
              alt=""
              className="h-[164px] w-full object-cover rounded-[16px]"
              src={
                data?.file
                  ? window.URL.createObjectURL(data?.file)
                  : "/assets/images/subdao-cover.svg"
              }
            />
            <div className="text-white-light text-[24px] absolute top-[24px] left-[24px] drop-shadow-xl">
              {data.subDAOname}
            </div>
          </div>
          <div>
            <div className="text-secondary-dark ">Token Details</div>
            <SelectToken
              value={{
                ...data?.token,
                symbol: "MainDAO Token",
                name: data?.token?.symbol,
                balance: data?.amount,
              }}
              onSelectToken={() => {}}
              onChange={() => {}}
              selected
            />
            <SelectToken
              value={{
                address: "",
                symbol: "SubDAO Token",
                name: data.subDAOTokenName,
                balance: data.subDAOTokenAmount,
              }}
              onSelectToken={() => {}}
              onChange={() => {}}
              selected
            />
          </div>
          <div className="flex items-center justify-between row-start-2 col-start-2 col-span-2">
            <div className="text-secondary-dark text-[16px] font-medium">
              Members
            </div>
            <div className="text-secondary text-[16px]">
              {data?.allocate?.length} People
            </div>
          </div>
          <div className="h-[350px] overflow-scroll row-start-3 col-span-2 col-start-2">
            <div className="grid gap-[8px] ">
              {data?.allocate
                // ?.slice(1)
                ?.map((allocate: AllocateType, idx: number) => (
                  <MembershipsCard
                    ens={allocate?.ens}
                    address={allocate?.address}
                    subDAOAmount={allocate.subDAOAmount}
                    mainDAOAmount={allocate.mainDAOAmount}
                    subDAOSymbol={data.subDAOTokenName}
                    mainDAOSymbol={data?.token?.symbol}
                    // className="border border-primary bg-white-light px-[16px] py-[16px] rounded-[8px] grid grid-cols-2 gap-[8px] items-center mb-[8px] h-[70px]"
                    key={`address-${idx}`}
                    small
                  />
                  //   <div className="flex gap-[8px] items-center">
                  //     <div className="h-[32px] w-[32px] bg-primary-light rounded-full text-secondary-dark" />
                  //     {allocate?.ens || truncateAddress(allocate.address)}
                  //   </div>
                  // </MembershipsCard>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
