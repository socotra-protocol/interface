type Props = {
  label?: string
  children: React.ReactNode
}
export const Card = (props: Props) => {
  const { label, children } = props
  return (
    <div className="border border-primary-dark rounded-[16px]">
      <div className="text-white bg-primary-dark text-center rounded-t-[14px]">
        {label}
      </div>
      {children}
    </div>
  )
}
