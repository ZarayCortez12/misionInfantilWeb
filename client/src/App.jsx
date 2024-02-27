import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import RegisterDocentePage from "./pages/RegisterDocentePage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import SectorPage from "./pages/SectorPage"
import RegisterSectorPage from "./pages/RegisterSectorPage"
import ProtectedRoute from "./ProtectedRoute"
import { SectorProvider } from "./context/SectorContext"
import IndexAdmin from "./pages/admin/IndexAdmin"
import Layout from "./pages/admin/Layout"
import ViewSectores from "./pages/admin/viewSectores"
import Courses from "./pages/admin/courses/Courses"
import Events from "./pages/admin/events/Events"
import Notifications from "./pages/admin/notifications/Notifications"
import Sectors from "./pages/admin/sectors/Sectors"
import Students from "./pages/admin/students/Students"
import Teachers from "./pages/admin/teachers/Teachers"

function App() {
  return (
    <AuthProvider>
      <SectorProvider>
        <BrowserRouter>
          <main className="">
            <Routes>
              <Route>
                <Route path='/'  element={<HomePage/>} />
                <Route path='/login'  element={<LoginPage/>} />
                <Route path='/registerDocente'  element={<RegisterDocentePage/>} />
              </Route>
              
              <Route path='/indexAdmin' element={<Layout> <IndexAdmin/> </Layout>}/>           
              <Route path='/indexAdmin/courses' element={<Layout> <Courses/> </Layout>}/>              
              <Route path='/indexAdmin/events' element={<Layout> <Events/> </Layout>}/>       
              <Route path='/indexAdmin/notifications' element={<Layout> <Notifications/> </Layout>}/>         
              <Route path='/indexAdmin/sectors' element={<Layout> <Sectors/> </Layout>}/>             
              <Route path='/indexAdmin/students' element={<Layout> <Students/> </Layout>}/>              
              <Route path='/indexAdmin/teachers' element={<Layout> <Teachers/> </Layout>}/>              

              
                <Route path='/sectores'  
                  element={
                    <>
                    <SectorPage/>
                    </>
                    } 
                    />
                <Route path='/add-sector'  element={<RegisterSectorPage/>} />
                <Route path='/sectores/:id'  element={<RegisterSectorPage/>} />
              

            </Routes>
          </main>
        </BrowserRouter>
      </SectorProvider>
    </AuthProvider>
  );
}
export default App 