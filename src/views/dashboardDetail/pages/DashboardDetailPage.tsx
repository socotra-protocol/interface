import { Link, matchRoutes, useParams } from "react-router-dom"
import { Layout } from "../../../core/Layout"

export const DashboardDetailPage = () => {
  const { id } = useParams()
  console.log(id)
  return <Layout>DashboardDetailPage {id}</Layout>
}
