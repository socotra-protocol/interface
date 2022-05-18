export const Card = () => {
  return (
    <div className="border border-white-dark rounded-[32px] cursor-pointer">
      <div className="flex gap-[8px] items-center p-[32px]">
        <div className="h-[40px] w-[40px] bg-primary-light rounded-full" />
        <div className="text-[24px] font-medium text-secondary-dark ">
          SubDAOName
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-2 gap-[8px] items-center p-[32px]">
        <div>
          <div className="text-[16px] font-medium text-secondary-dark">
            Voting token
          </div>
          <div className="text-[16px] font-medium text-secondary">
            124.32 dCRV
          </div>
        </div>
        <div>
          <div className="text-[16px] font-medium text-secondary-dark">
            Rewards token
          </div>
          <div className="text-[16px] font-medium text-secondary">4000 CRV</div>
        </div>
      </div>
    </div>
  )
}
