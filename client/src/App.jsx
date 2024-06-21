import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { SectorProvider } from "./context/SectorContext"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import ProtectedRoute from "./ProtectedRoute"
import IndexAdmin from "./pages/admin/IndexAdmin"
import AdminLayout from "./pages/admin/Layout"
import SectorPage from "./pages/admin/sectors/SectorPage"
import TeacherPage from "./pages/admin/teachers/TeacherPage"
import RegisterTeacherPage from "./pages/admin/teachers/RegisterTeacherPage"
import RegisterSectorPage from "./pages/admin/sectors/RegisterSectorPage"
import Notifications from "./pages/admin/notifications/Notifications"
import Students from "./pages/admin/students/Students"
import Events from "./pages/admin/events/Events"
import Courses from "./pages/admin/courses/Courses"

function App() {
  return (
    <AuthProvider>
      <SectorProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} /> 

            <Route element={<ProtectedRoute/>}>
                  <Route path='/administrador' element={<AdminLayout> <IndexAdmin/> </AdminLayout>} />
                  <Route path='/administrador/notificaciones' element={<AdminLayout> <Notifications/> </AdminLayout>} />
                  <Route path="/administrador/sectores" element={<AdminLayout> <SectorPage/> </AdminLayout>} />
                  <Route path="/administrador/sectores/register" element={<AdminLayout> <RegisterSectorPage/> </AdminLayout>} />
                  <Route path="/administrador/docentes" element={<AdminLayout> <TeacherPage/> </AdminLayout>} />
                  <Route path="/administrador/docentes/register" element={<AdminLayout> <RegisterTeacherPage/> </AdminLayout>} />
                  <Route path='/administrador/cursos' element={<AdminLayout> <Courses/> </AdminLayout>} />
                  <Route path='/administrador/eventos' element={<AdminLayout> <Events/> </AdminLayout>} />
                  <Route path='/administrador/estudiantes' element={<AdminLayout> <Students/> </AdminLayout>} />
            </Route>

          </Routes>
        </BrowserRouter>
      </SectorProvider>
    </AuthProvider>
  );
}
export default App 