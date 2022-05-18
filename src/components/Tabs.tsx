export type TabsProps = {
  children: React.ReactNode
}
export const Tabs = (props: TabsProps) => {
  const { children } = props

  return (
    <div className="border-b-[3px] border-white-dark flex">
      <div className="flex mx-auto">{children}</div>
    </div>
  )
}

export type TabProps = {
  label: string
  selected?: boolean
}
export const Tab = (props: TabProps) => {
  const { label, selected } = props
  return (
    <div
      className={`border-b-[3px] text-[12px] font-semibold  w-[150px] flex justify-center cursor-pointer  ${
        selected ? "border-primary-dark  text-primary-dark" : "text-secondary"
      }`}
    >
      {label}
    </div>
  )
}
