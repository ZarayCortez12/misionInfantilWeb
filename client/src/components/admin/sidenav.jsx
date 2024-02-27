import NavLinks from './nav-links'
import TopLinks from './top-links'
import { useAuth } from '../../context/AuthContext';
import userImage from '../../assets/user.png'

export default function SideNav() {
  const { isAuthenticated, user } = useAuth();
  return (
    <div style={{ minHeight: '88.8vh' }} className="flex flex-col bg-custom-blue1"> {/* Agregado h-screen para que ocupe toda la altura de la pantalla */}

      <div className="flex mb-2 items-center text-center justify-center hidden md:block">
      <div className="w-1/2 h-40 ml-16 mb-5 border-4 border-orange-500 rounded-full overflow-hidden">
          {isAuthenticated ? (
            <>
              <img
                src={user.image.url}
                alt=""
                className="w-full h-auto rounded-full h-full"
                style={{ objectFit: 'cover' }} // Ajusta la propiedad de object-fit según lo necesites
              />
            </>
          ) : (
            <>
              <img
                src={user}
                alt=""
                className="w-full h-auto rounded-full"
                style={{ objectFit: 'cover' }} // Ajusta la propiedad de object-fit según lo necesites
              />
            </>
          )}
        </div>
      </div>

      <div className="flex-grow flex flex-row p-3 space-x-2 md:flex-col md:space-x-0 md:space-y-2"> {/* Cambiado grow por flex-grow */}
        <NavLinks />
        <TopLinks />
        <div className="flex-grow h-auto w-full hidden md:block"></div>
      </div>

    </div>
  );
}
