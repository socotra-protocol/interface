type InputProps = {} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
type LabelInputProps = {
  label: string
  icon?: React.ReactNode
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
export const Input = (props: InputProps) => {
  return (
    <div className="border border-white-dark bg-white-light p-[8px] rounded-[8px]  focus-within:border-primary">
      <input
        {...props}
        className="peer  focus:outline-none bg-white-light w-full relative text-secondary-dark"
      />
    </div>
  )
}
export const LabelInput = ({ label, icon, ...props }: LabelInputProps) => {
  return (
    <div
      className={`relative border border-white-dark bg-white-light px-[16px] py-[20px] rounded-[8px]  focus-within:border-primary ${
        props.className || ""
      }`}
    >
      <input
        type="text"
        placeholder="name"
        {...props}
        className="peer  placeholder-transparent  focus:outline-none bg-white-light w-full relative bottom-[-10px] placeholder-shown:bottom-0 text-secondary-dark"
      />
      <label
        className="absolute
            transition-all
            left-[16px]
            top-3
            text-secondary-light
            text-[12px]
            peer-placeholder-shown:text-secondary-light
            peer-placeholder-shown:text-[12px]
            peer-placeholder-shown:font-normal
            peer-placeholder-shown:top-6
            pointer-events-none
            "
      >
        {label}
      </label>
      <div className="absolute right-[16px] top-6 text-secondary-light  peer-focus:text-primary">
        {icon}
      </div>
    </div>
  )
}
