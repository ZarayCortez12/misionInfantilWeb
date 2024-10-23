import NavLinks from './nav-links';
import TopLinks from './top-links';
import { useAuth } from '../../context/AuthContext';
import userImage from '../../assets/user.png';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function SideNav() {
  const { isAuthenticated, user } = useAuth();
  const [image, setImage] = useState('');
  const [showAviso, setShowAviso] = useState(false);

  // Función para manejar la información personal (agrega tu lógica aquí)
  const personalInfo = (show) => {
    setShowAviso(show);
  };

  // Para mantener la imagen se guarda en el localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user')) || {};
    setImage(data.image?.url || '');
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col bg-custom-blue1 h-full h-screen">
      <div className="flex mb-2 items-center text-center justify-center hidden md:block md:h10">
        <div className="w-1/2 h-40 ml-16 mb-5 border-4 border-orange-500 rounded-full overflow-hidden">
          {isAuthenticated ? (
            <img
              src={image}
              alt=""
              className="w-full rounded-full h-full"
              style={{ objectFit: 'cover' }}
              // Al hacer clic en la imagen, abre la modal de información personal
              onClick={() => personalInfo(true)}
            />
          ) : (
            <img
              src={userImage}
              alt=""
              className="w-full h-auto rounded-full"
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
      </div>

      {/* Modal para la información del usuario */}
      <Modal
        isOpen={showAviso}
        onRequestClose={() => setShowAviso(false)}
        contentLabel="Modal de Información del Usuario"
        // Centrando la modal usando transformaciones CSS para mayor responsividad
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <h2 className="text-lg font-semibold">Información del Usuario</h2>
        <button onClick={() => setShowAviso(false)}>Cerrar</button>
      </Modal>

      <div className="flex-grow flex flex-row p-3 space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <TopLinks />
        <div className="flex-grow h-auto w-full hidden md:block"></div>
      </div>
    </div>
  );
}

