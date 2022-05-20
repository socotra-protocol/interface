import { useEffect, useState } from "react"
import { LabelInput } from "../../components/Input"
import { Upload } from "../../components/Upload"

type Props = {
  onChange: (data: any) => void
}
export const Information = (props: Props) => {
  const { onChange } = props
  const [file, setFile] = useState<File>()
  const [subDAOname, setSubDAOname] = useState<string>()

  useEffect(() => {
    onChange({ file, subDAOname })
  }, [file, subDAOname])
  return (
    <div className="flex justify-center flex-col items-center">
      <Upload onChange={(file: File) => setFile(file)} />
      <div className="py-[32px]">
        <div className="text-secondary-dark text-[24px] font-medium mb-[16px] text-center">
          Enter your Sub DAO name
        </div>
        <LabelInput
          label="Sub DAO name"
          className="w-[370px]"
          onChange={(e: any) => setSubDAOname(e.target.value)}
        />
      </div>
    </div>
  )
}
