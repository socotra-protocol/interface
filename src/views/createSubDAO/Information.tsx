import { LabelInput } from "../../components/Input"
import { Upload } from "../../components/Upload"

export const Information = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <Upload onChange={(file: File) => console.log(file)} />
      <div className="py-[32px]">
        <div className="text-secondary-dark text-[24px] font-medium mb-[16px] text-center">
          Enter your Sub DAO name
        </div>
        <LabelInput label="Sub DAO name" className="w-[370px]" />
      </div>
    </div>
  )
}
