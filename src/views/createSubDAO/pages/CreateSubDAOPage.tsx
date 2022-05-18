import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useMemo, useState } from "react"
import { PrimaryButton, SecondaryButton } from "../../../components/Button"
import { Tabs, Tab } from "../../../components/Tabs"
import { CREATE_SUB_DAO_STEP } from "../../../constants/createSubDAO"
import { useCreateSubDAOStep } from "../../../hooks/useCreateSubDAOStep"
import { Complete } from "../Complete"
import { Information } from "../Information"
import { Member } from "../Member"
import { ProposalSetting } from "../ProposalSetting"
import { SelectERC20 } from "../SelectERC20"

export const CreateSubDAOPage = () => {
  const { onNext, onPrev, value } = useCreateSubDAOStep()

  const content = useMemo(() => {
    switch (value) {
      case CREATE_SUB_DAO_STEP.SELECT_ERC20:
        return <SelectERC20 onChange={() => {}} />
      case CREATE_SUB_DAO_STEP.INFORMATION:
        return <Information />
      case CREATE_SUB_DAO_STEP.MEMBER:
        return <Member />
      case CREATE_SUB_DAO_STEP.PROPOSAL_SETTING:
        return <ProposalSetting />
      case CREATE_SUB_DAO_STEP.COMPLETE:
        return <Complete />
    }
  }, [value])
  return (
    <div className=" min-h-screen">
      <div className="pt-[48px] flex items-center flex-col">
        <h1 className="text-secondary-dark text-[36px] font-bold">
          Create new Sub DAO
        </h1>
      </div>
      <div className="mt-[48px]">
        <Tabs>
          <Tab
            label="ERC-20"
            selected={value === CREATE_SUB_DAO_STEP.SELECT_ERC20}
          />
          <Tab
            label="Information"
            selected={value === CREATE_SUB_DAO_STEP.INFORMATION}
          />
          <Tab label="Member" selected={value === CREATE_SUB_DAO_STEP.MEMBER} />
          <Tab
            label="Proposal setting"
            selected={value === CREATE_SUB_DAO_STEP.PROPOSAL_SETTING}
          />
          <Tab
            label="Complete"
            selected={value === CREATE_SUB_DAO_STEP.COMPLETE}
          />
        </Tabs>
      </div>
      <div className="py-[48px]">
        {content}
        <div className="flex justify-center pt-[53px] ">
          <div className="grid grid-cols-2 w-[210px] gap-[8px]">
            <SecondaryButton outlined dark onClick={onPrev}>
              Back
            </SecondaryButton>
            <PrimaryButton dark onClick={onNext}>
              Next <FontAwesomeIcon icon={faArrowRight} />
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
