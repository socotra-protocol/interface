import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ComponentsPage } from "./views/components/pages/ComponentsPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/components" element={<ComponentsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
