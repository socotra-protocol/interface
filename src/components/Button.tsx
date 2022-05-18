export type ButtonProps = {
  dark?: boolean
  light?: boolean
  outlined?: boolean
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const PrimaryButton = ({
  children,
  dark,
  light,
  ...props
}: ButtonProps) => {
  const colorClassName = dark
    ? "bg-primary-dark text-white"
    : light
    ? "bg-primary-light text-primary-dark"
    : "bg-primary text-white"

  return (
    <button
      {...props}
      className={`
        ${colorClassName} 
        normal-case 
        text-md 
        font-medium 
        py-[8px] 
        px-[16px] 
        rounded-[8px] 
        hover:opacity-[0.85] 
        hover:shadow-none 
        active:opacity-[0.90] 
        active:shadow-none 
        ${props.className || ""}`}
      color="grey"
    >
      {children}
    </button>
  )
}

export const SecondaryButton = ({
  children,
  outlined,
  dark,
  light,
  ...props
}: ButtonProps) => {
  const colorClassName =
    outlined && dark
      ? "border-white-dark text-secondary-dark border"
      : outlined && light
      ? "border-secondary-light text-secondary-light border"
      : dark
      ? "bg-white-dark text-secondary-dark"
      : "bg-secondary-light text-secondary-light"

  return (
    <button
      {...props}
      className={`
        ${colorClassName}  
        normal-case 
        text-md 
        font-medium 
        py-[8px] 
        px-[16px] 
        rounded-[8px] 
        hover:opacity-[0.85] 
        hover:shadow-none 
        active:opacity-[0.70] 
        active:shadow-none 
        ${props.className || ""}`}
      color="grey"
    >
      {children}
    </button>
  )
}
