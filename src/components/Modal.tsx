type Props = {
  visible: boolean
  children: React.ReactNode
}
export const Modal = (props: Props) => {
  const { visible, children } = props

  if (!visible) {
    return <></>
  }
  return (
    <>
      <div className="fixed backdrop-blur-sm bg-white/30 h-screen w-screen top-0 left-0">
        ssss
      </div>
      <div className="fixed bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </>
  )
}
