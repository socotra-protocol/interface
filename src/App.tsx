import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SocotraProvider } from "./providers/SocotraProvider"
import { ComponentsPage } from "./views/components/pages/ComponentsPage"
import { HomePage } from "./views/home/pages/HomePage"

export default function App() {
  return (
    <SocotraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/components" element={<ComponentsPage />} />
        </Routes>
      </BrowserRouter>
    </SocotraProvider>
  )
}
