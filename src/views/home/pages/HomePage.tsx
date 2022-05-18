import { useNavigate } from "react-router"
export const HomePage = () => {
  const navigate = useNavigate()

  const test = () => {
    navigate("/components")
  }
  return (
    <>
      <div onClick={test}>go</div>
    </>
  )
}
