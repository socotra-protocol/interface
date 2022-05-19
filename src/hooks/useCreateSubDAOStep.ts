import { useState } from "react"
import { CREATE_SUB_DAO_STEP } from "../constants/createSubDAO"

type Props = {
  defaultValue?: CREATE_SUB_DAO_STEP
}
export const useCreateSubDAOStep = (props: Props = {}) => {
  const { defaultValue } = props
  const [step, setStep] = useState<CREATE_SUB_DAO_STEP>(
    defaultValue || CREATE_SUB_DAO_STEP.SELECT_ERC20
  )

  const onNext = () => {
    if (step === 6) {
      return
    }
    setStep(step + 1)
  }
  const onPrev = () => {
    if (step === 1) {
      return
    }
    setStep(step - 1)
  }
  return { onNext, onPrev, value: step }
}
