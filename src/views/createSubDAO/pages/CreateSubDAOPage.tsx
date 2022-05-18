import { useState } from "react"
import { Tabs, Tab } from "../../../components/Tabs"
import { CREATE_SUB_DAO_STEP } from "../../../constants/createSubDAO"

export const CreateSubDAOPage = () => {
  const [tabValue, setTabValue] = useState<CREATE_SUB_DAO_STEP>(
    CREATE_SUB_DAO_STEP.SELECT_ERC20
  )
  return (
    <div>
      <div className="pt-[48px] flex items-center flex-col">
        <h1 className="text-secondary-dark text-[36px] font-bold">
          Create new Sub DAO
        </h1>
      </div>
      <div className="mt-[48px]">
        <Tabs>
          <Tab
            label="ERC-20"
            selected={tabValue === CREATE_SUB_DAO_STEP.SELECT_ERC20}
          />
          <Tab
            label="Information"
            selected={tabValue === CREATE_SUB_DAO_STEP.INFORMATION}
          />
          <Tab
            label="Member"
            selected={tabValue === CREATE_SUB_DAO_STEP.MEMBER}
          />
          <Tab
            label="Proposal setting"
            selected={tabValue === CREATE_SUB_DAO_STEP.PROPOSAL_SETTING}
          />
          <Tab
            label="Complete"
            selected={tabValue === CREATE_SUB_DAO_STEP.COMPLETE}
          />
        </Tabs>
      </div>
    </div>
  )
}
