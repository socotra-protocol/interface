import { PrimaryButton, SecondaryButton } from "../../../components/Button"

export const ComponentsPage = () => {
  return (
    <>
      <div>
        <div className="text-2xl">Components</div>
        <div className="text-lg">Font : Sora</div>
        <hr />
        <div className="text-2xl">Button</div>
        <div className="grid grid-cols-3 gap-3">
          <PrimaryButton>Primary</PrimaryButton>
          <PrimaryButton dark>Primary Dark</PrimaryButton>
          <PrimaryButton light>Primary Light</PrimaryButton>
          <SecondaryButton outlined dark>
            Secondary Outlined Dark
          </SecondaryButton>
          <SecondaryButton dark>Secondary Button Dark</SecondaryButton>
          <SecondaryButton outlined light>
            Secondary Outlined Light
          </SecondaryButton>
        </div>
      </div>
    </>
  )
}
