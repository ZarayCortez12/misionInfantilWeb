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
import WelcomePage from "./pages/admin/WelcomePage"
import Layout from "./pages/admin/Layout"

function App() {
  return (
    <AuthProvider>
      <SectorProvider>
        <BrowserRouter>
          <main className="">
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />

              <Route path='/welcome/ADMINISTRADOR' element={<Layout><WelcomePage /></Layout>} />
              <Route path='/registerDocente' element={<Layout><RegisterDocentePage /></Layout>} />
              <Route path='/sectores' element={<SectorPage />} />
              <Route path='/add-sector' element={<RegisterSectorPage />} />
              <Route path='/sectores/:id' element={<RegisterSectorPage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </SectorProvider>
    </AuthProvider>
  );
}
export default App 