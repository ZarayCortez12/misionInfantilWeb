import SideNav from '../../components/admin/sidenav';
import TopNav from '../../components/admin/topnav';
 
function Layout({ children }) {
  return (
    <div className=" flex-col min-h-screen md:flex-row bg md:overflow-hidden">
        <div className="flex h-20 w-full items-center justify-end bg-custom-blue1 hidden md:block">
            <TopNav></TopNav>
        </div>

        <div className='flex flex-col md:flex-row'>
            <div className="flex-none w-full md:w-64">
                <SideNav></SideNav>
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                {children}
            </div>
        </div>
    </div>
  );
}

export default Layout