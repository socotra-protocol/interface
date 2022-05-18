import { Button, ButtonProps } from "@material-tailwind/react"
import { useRef } from "react"

export const PrimaryButton = ({ children, ...props }: ButtonProps) => {
  const ref = useRef(null)
  return (
    <Button className="bg-pink" {...props} ref={ref}>
      {children}
    </Button>
  )
}
