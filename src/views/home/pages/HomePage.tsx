import { useNavigate } from "react-router"
import { Layout } from "../../../core/Layout"
export const HomePage = () => {
  const navigate = useNavigate()

  const test = () => {
    navigate("/components")
  }
  return (
    <Layout>
      <div onClick={test}>go</div>
    </Layout>
  )
}
