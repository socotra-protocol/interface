import { Button, ButtonProps } from "@material-tailwind/react"
import { useRef } from "react"

type TPrimaryButtonProps = {
  dark?: boolean
  light?: boolean
} & ButtonProps

export const PrimaryButton = ({
  children,
  dark,
  light,
  ...props
}: TPrimaryButtonProps) => {
  const ref = useRef(null)

  const colorClassName = dark
    ? "bg-primary-dark"
    : light
    ? "bg-primary-light text-primary"
    : "bg-primary"

  return (
    <Button
      {...props}
      className={`${colorClassName} normal-case text-md ${
        props.className || ""
      }`}
      color="grey"
      ref={ref}
    >
      {children}
    </Button>
  )
}

type TSecondaryButtonProps = {
  outlined?: boolean
  light?: boolean
  dark?: boolean
} & ButtonProps

export const SecondaryButton = ({
  children,
  outlined,
  dark,
  light,
  ...props
}: TSecondaryButtonProps) => {
  const ref = useRef(null)

  const colorClassName =
    outlined && dark
      ? "border-white-dark text-secondary-dark"
      : outlined && light
      ? "border-secondary-light text-secondary-light"
      : dark
      ? "bg-white-dark text-secondary-dark"
      : "bg-secondary-light text-secondary-light"

  const variant = outlined ? "outlined" : undefined
  return (
    <Button
      {...props}
      className={`${colorClassName} normal-case text-md ${
        props.className || ""
      }`}
      color="grey"
      variant={variant}
      ref={ref}
    >
      {children}
    </Button>
  )
}
