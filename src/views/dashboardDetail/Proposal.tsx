import { PrimaryButton } from "../../components/Button"

export const Proposal = () => {
  return (
    <div className="bg-white-dark p-[24px] rounded-[16px] mb-[32px]">
      <div className="text-secondary-dark text-[24px] mb-[8px]">
        Governance Proposal
      </div>
      <div className="text-[16px] mb-[8px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus
        ligula, blandit eget odio nec, laoreet blandit nisl. Vestibulum
        condimentum nunc hendrerit nibh sollicitudin iaculis. Integer interdum
        neque sit amet ipsum dapibus, congue bibendum elit tincidunt. Nam
        ullamcorper lectus quis luctus scelerisque.
      </div>
      <PrimaryButton dark>Governance proposal</PrimaryButton>
    </div>
  )
}
