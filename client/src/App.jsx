import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SectorProvider } from "./context/SectorContext";
import { StudentProvider } from "./context/StudentContext";
import { EventoProvider } from "./context/EventoContext";
import { CursoProvider } from "./context/CursoContext";
import { DocenteProvider } from "./context/DocentesContext";
import LoginPage from "./pages/LoginPage";
import SendEmailPage from "./pages/SendEmailPage";
import ResetPasswordPage from "./pages/ResetPasswordpage";
import CreatePasswordPage from "./pages/CreatePasswordpage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import IndexAdmin from "./pages/admin/IndexAdmin";
import AdminLayout from "./pages/admin/Layout";
import SectorPage from "./pages/admin/sectors/SectorPage";
import TeacherPage from "./pages/admin/teachers/TeacherPage";
import RegisterTeacherPage from "./pages/admin/teachers/RegisterTeacherPage";
import RegisterSectorPage from "./pages/admin/sectors/RegisterSectorPage";
import Notifications from "./pages/admin/notifications/Notifications";
import Students from "./pages/admin/students/Students";
import Events from "./pages/admin/events/Events";
import Courses from "./pages/admin/courses/Courses";
import CrearStudent from "./pages/admin/students/CrearStudent";
import EditarStudent from "./pages/admin/students/EditarStudent";
import CrearDocente from "./pages/admin/teachers/CrearDocente";
import EditarDocente from "./pages/admin/teachers/EditarDocente";
import IndexDocente from "./pages/docente/IndexDocente";
import DocenteLayout from "./pages/docente/Layout";

function App() {
  return (
    <AuthProvider>
      <DocenteProvider>
        <CursoProvider>
          <EventoProvider>
            <SectorProvider>
              <StudentProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/send-email" element={<SendEmailPage />} />
                    <Route
                      path="/reset-password/:cedula/:token"
                      element={<ResetPasswordPage />}
                    />
                    <Route
                      path="/create-password/:cedula/:token"
                      element={<CreatePasswordPage />}
                    />

                    <Route element={<ProtectedRoute />}>
                      <Route
                        path="/administrador"
                        element={
                          <AdminLayout>
                            {" "}
                            <IndexAdmin />{" "}
                          </AdminLayout>
                        }
                      />
                      <Route
                        path="/administrador/notificaciones"
                        element={
                          <AdminLayout>
                            {" "}
                            <Notifications />{" "}
                          </AdminLayout>
                        }
                      />
                      <Route
                        path="/administrador/sectores"
                        element={
                          <AdminLayout>
                            {" "}
                            <SectorPage />{" "}
                          </AdminLayout>
                        }
                      />
                      <Route
                        path="/administrador/sectores/register"
                        element={
                          <AdminLayout>
                            {" "}
                            <RegisterSectorPage />{" "}
                          </AdminLayout>
                        }
                      />
                      <Route
                        path="/administrador/docentes"
                        element={
                          <AdminLayout>
                            {" "}
                            <TeacherPage />{" "}
                          </AdminLayout>
                        }
                      />
                      <Route
                        path="/administrador/docentes/register"
                        element={
                          <AdminLayout>
                            {" "}
                            <CrearDocente />{" "}
                          </AdminLayout>
                        }
                      />
                      <Route
                        path="/administrador/cursos"
                        element={
                          <AdminLayout>
                            {" "}
                            <Courses />{" "}
                          </AdminLayout>
                        }
                      />
                      <Route
                        path="/administrador/eventos"
                        element={
                          <AdminLayout>
                            {" "}
                            <Events />{" "}
                          </AdminLayout>
                        }
                      />
                      <Route
                        path="/administrador/estudiantes"
                        element={
                          <AdminLayout>
                            {" "}
                            <Students />{" "}
                          </AdminLayout>
                        }
                      />
                      <Route
                        path="/administrador/estudiantes/registrar"
                        element={
                          <AdminLayout>
                            {" "}
                            <CrearStudent />{" "}
                          </AdminLayout>
                        }
                      />
                      <Route
                        path="/administrador/estudiantes/:ced"
                        element={
                          <AdminLayout>
                            {" "}
                            <EditarStudent />{" "}
                          </AdminLayout>
                        }
                      />
                      <Route
                        path="/administrador/docentes/:ced"
                        element={
                          <AdminLayout>
                            {" "}
                            <EditarDocente />{" "}
                          </AdminLayout>
                        }
                      />
                      <Route
                        path="/docente"
                        element={
                          <DocenteLayout>
                            <IndexDocente />
                          </DocenteLayout>
                        }
                      />
                    </Route>
                  </Routes>
                </BrowserRouter>
              </StudentProvider>
            </SectorProvider>
          </EventoProvider>
        </CursoProvider>
      </DocenteProvider>
    </AuthProvider>
  );
}
export default App;
