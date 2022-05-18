import { PrimaryButton, SecondaryButton } from "../../../components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons"
import { Input, LabelInput } from "../../../components/Input"
export const ComponentsPage = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto py-10">
        <div>
          UI Framework :{" "}
          <a
            href="https://www.material-tailwind.com/docs/react/accordion"
            target="_blank"
            rel="noreferrer"
          >
            https://www.material-tailwind.com
          </a>
        </div>
        <div>
          Css :{" "}
          <a
            href="https://tailwindcss.com/docs/aspect-ratio"
            target="_blank"
            rel="noreferrer"
          >
            https://tailwindcss.com/
          </a>
        </div>
        <div className="text-2xl">Components</div>
        <div className="text-lg">Font : Sora</div>
        <hr className="my-2" />
        <div className="text-2xl">Button</div>
        <div className="grid grid-cols-3 gap-3">
          <PrimaryButton>Primary</PrimaryButton>
          <PrimaryButton dark>Primary Dark</PrimaryButton>
          <PrimaryButton light>Primary Light</PrimaryButton>
          <SecondaryButton outlined dark>
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Secondary Outlined Dark
          </SecondaryButton>
          <SecondaryButton dark>Secondary Button Dark</SecondaryButton>
          <SecondaryButton outlined light>
            Secondary Outlined Light
          </SecondaryButton>
        </div>
        <hr className="my-2" />
        <div className="text-2xl mb-5">Input</div>
        <Input placeholder="Placehoder" />
        <LabelInput label="Request Funds" />
        <LabelInput label="Search" icon={<FontAwesomeIcon icon={faSearch} />} />
      </div>
    </>
  )
}
