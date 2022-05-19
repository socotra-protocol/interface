import { PrimaryButton, SecondaryButton } from "../../../components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons"
import { Input, LabelInput } from "../../../components/Input"
import { Layout } from "../../../core/Layout"
import { MemberCard } from "../../../components/MemberCard"
import { MemberInput } from "../../../components/MemberInput"
import { Cover } from "../../../components/Cover"
import { Modal } from "../../../components/Modal"
import { useState } from "react"
export const ComponentsPage = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const toggle = () => {
    setVisible(!visible)
  }
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-10">
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
        <hr />
        <div className="text-2xl mb-5">Card</div>
        <div className="flex flex-col gap-[16px]">
          <div className="grid grid-cols-3 gap-[8px]">
            {Array.from({ length: 3 }).map((_, idx: number) => (
              <MemberCard key={`member-card-${idx}`} />
            ))}
          </div>
          <MemberInput />
        </div>
        <div className="text-2xl mb-5">Cover</div>
        <Cover name="Socotra" onUpload={() => {}} onRename={() => {}} />
        <div className="text-2xl mb-5">Modal</div>
        <PrimaryButton onClick={toggle}>toggle</PrimaryButton>
        <Modal visible={visible}>
          <div>Socotra</div>
        </Modal>
      </div>
    </Layout>
  )
}
