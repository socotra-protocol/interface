import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SocotraProvider } from "./providers/SocotraProvider"
import { ComponentsPage } from "./views/components/pages/ComponentsPage"
import { CreateSubDAOPage } from "./views/createSubDAO/pages/CreateSubDAOPage"
import { Dashboard } from "./views/dashboard/pages/Dashboard"
import { Explore } from "./views/explore/pages/Explore"
import { HomePage } from "./views/home/pages/HomePage"

export default function App() {
  return (
    <SocotraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/create-subdao" element={<CreateSubDAOPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </BrowserRouter>
    </SocotraProvider>
  )
}
