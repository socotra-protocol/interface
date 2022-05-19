import { Routes, Route, HashRouter } from "react-router-dom"
import { SocotraProvider } from "./providers/SocotraProvider"
import { ComponentsPage } from "./views/components/pages/ComponentsPage"
import { CreateSubDAOPage } from "./views/createSubDAO/pages/CreateSubDAOPage"
import { Dashboard } from "./views/dashboard/pages/Dashboard"
import { DashboardDetailPage } from "./views/dashboardDetail/pages/DashboardDetailPage"
import { Explore } from "./views/explore/pages/Explore"

export default function App() {
  return (
    <SocotraProvider>
      <HashRouter>
        <Routes>
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/create-subdao" element={<CreateSubDAOPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:id" element={<DashboardDetailPage />} />
          <Route path="/" element={<Explore />} />
        </Routes>
      </HashRouter>
    </SocotraProvider>
  )
}
