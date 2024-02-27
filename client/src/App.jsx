import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import ProtectedRoute from "./ProtectedRoute"
import IndexAdmin from "./pages/admin/IndexAdmin"
import AdminLayout from "./pages/admin/Layout"
import SectorPage from "./pages/admin/sectors/SectorPage"
import TeacherPage from "./pages/admin/teachers/TeacherPage"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} /> 

          <Route element={<ProtectedRoute/>}>
                <Route path='/ADMINISTRADOR' element={<AdminLayout><IndexAdmin /></AdminLayout>} />
                <Route path="sectores" element={<SectorPage />} />
                <Route path="docentes" element={<TeacherPage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App 