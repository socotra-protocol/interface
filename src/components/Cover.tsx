type Props = {
  name: string
  images?: string
  onUpload: () => void
  onRename: () => void
}
export const Cover = (props: Props) => {
  const { images, name, onUpload, onRename } = props
  return (
    <div className="relative">
      <img
        src={images || `/assets/images/subdao-cover.svg`}
        alt=""
        className="rounded-[16px]"
      />
      <div className="text-white-light text-[24px] absolute top-[24px] left-[24px]">
        {name}
      </div>
    </div>
  )
}
