import { faImage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

type Props = {
  onChange: (file: File) => void
}
export const Upload = (props: Props) => {
  const [file, setFile] = useState<File | null>(null)
  const { onChange } = props
  let inputRef: HTMLInputElement | null

  const handleUpload = (e: any) => {
    const file = e.target.files[0]
    onChange(file)
    setFile(file)
  }

  return (
    <div>
      <div
        className="w-[240px] h-[240px] flex justify-center items-center bg-white-light border border-white-dark border-dashed rounded-[16px] flex-col cursor-pointer"
        onClick={() => inputRef?.click()}
      >
        {file ? (
          <>
            <img alt="" src={window.URL.createObjectURL(file)} />
          </>
        ) : (
          <>
            <FontAwesomeIcon
              icon={faImage}
              className="text-primary-dark mb-[12px]"
              size="4x"
            />
            <div className="text-secondary-dark text-[16px] font-medium">
              Add Sub DAo cover
            </div>
          </>
        )}
      </div>
      <input
        type="file"
        hidden={true}
        onChange={handleUpload}
        ref={(refParam) => (inputRef = refParam)}
        accept="image/*"
      />
    </div>
  )
}
