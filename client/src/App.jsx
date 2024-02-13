import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

import RegisterDocentePage from "./pages/RegisterDocentePage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import SectorPage from "./pages/SectorPage"
import RegisterSectorPage from "./pages/RegisterSectorPage"
import ProtectedRoute from "./ProtectedRoute"
import { SectorProvider } from "./context/SectorContext"
import Navbar from "./components/Navbar"
import BienvenidaAdmin from "./pages/ModuloAdmin/Bienvenida"

function App() {
  return (
    <AuthProvider>
      <SectorProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
            <Navbar/>
            <Routes>
              <Route path='/'  element={<HomePage/>} />
              <Route path='/login'  element={<LoginPage/>} />
              <Route path='/registerDocente'  element={<RegisterDocentePage/>} />
              <Route path='/bienvenidaAdmin'  element={<BienvenidaAdmin/>} />
              
              <Route element={<ProtectedRoute/>}>
                <Route path='/sectores'  element={<SectorPage/>} />
                <Route path='/add-sector'  element={<RegisterSectorPage/>} />
                <Route path='/sectores/:id'  element={<RegisterSectorPage/>} />
              </Route>

            </Routes>
          </main>
        </BrowserRouter>
      </SectorProvider>
    </AuthProvider>
  )
}

export default App 