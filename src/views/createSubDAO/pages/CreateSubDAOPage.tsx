import { Tabs, Tab } from "../../../components/Tabs"

export const CreateSubDAOPage = () => {
  return (
    <div>
      <div className="pt-[48px] flex items-center flex-col">
        <h1 className="text-secondary-dark text-[36px] font-bold">
          Create new Sub DAO
        </h1>
      </div>
      <div className="mt-[48px]">
        <Tabs>
          <Tab label="ERC-20" selected />
          <Tab label="Information" />
          <Tab label="Member" />
          <Tab label="Proposal setting" />
        </Tabs>
      </div>
    </div>
  )
}
