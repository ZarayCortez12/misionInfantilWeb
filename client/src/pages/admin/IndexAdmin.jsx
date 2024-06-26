import React, { useState, useEffect } from 'react';
import Versiculos from './Versiculos.json'
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

function IndexAdmin() {
    
    const [versiculo, setVersiculo] = useState(null);

    useEffect(() => {
        const selectNewVersiculo = () => {
            const today = new Date().toISOString().slice(0, 10); // Toma la fecha actual (YYYY-MM-DD)
            const index = today.charCodeAt(today.length - 1) % Versiculos.versiculosDelDia.length; // (último dígito del día de hoy -1) % cantidad de versiculos en el archivo json
        
            setVersiculo(Versiculos.versiculosDelDia[index]); // Selecciona un versiculo
        }
        
        selectNewVersiculo();
        
        // Cada 24h se cambia el versiculo
        const timerId = setInterval(() => {
            selectNewVersiculo();
          }, 24 * 60 * 60 * 1000);
      
          // Reset al temporizador
          return () => clearInterval(timerId);
        }, []);
    
    if (!versiculo) {
        return <div>Cargando...</div>;
      }

    return(
        <div style={{ marginTop: '4.5rem' }} className='flex flex-col max-h-screen gap-3 md:flex-row'>
            {/*Bienvenida*/}
            <div className="flex flex-col gap-4 px-5 mt-4 md:mt-0 md:w-100 md:px-10">
                <p className="py-3 text-xl md:text-2xl font-semibold">¡Hola!</p>
                <strong className="px-10 py-0 text-4xl md:text-5xl">Administrador</strong>
                
                <div className="flex flex-col gap-5 px-10 py-10">
                    <Link className="flex gap-3 justify-start rounded-lg bg-custom-brown1 px-5 py-3 text-base font-light text-white transition-colors hover:bg-custom-brown2"
                        href="/login"  to="/" //ruta a la que lleva 
                        ><PlusCircleIcon className="w-6" /> <span>REALIZAR NUEVO EVENTO</span> 
                    </Link>

                    <Link
                        className="flex gap-3 justify-start rounded-lg bg-custom-brown1 px-5 py-3 text-base font-light text-white transition-colors hover:bg-custom-brown2"
                        to='/administrador/docentes/register'
                    >
                        <PlusCircleIcon className="w-6" />
                        <span>INGRESAR DOCENTE</span>
                    </Link>

                    <Link 
                        className="flex gap-3 justify-start rounded-lg bg-custom-brown1 px-5 py-3 text-base font-light text-white transition-colors hover:bg-custom-brown2"
                        to="/administrador/sectores/register" //ruta a la que lleva
                    >
                        <PlusCircleIcon className="w-6" /> 
                        <span>INGRESAR SECTOR</span>
                    </Link>

                    <Link className="flex gap-3 justify-start rounded-lg bg-custom-brown1 px-5 py-3 text-base font-light text-white transition-colors hover:bg-custom-brown2"
                        href="/login"  to="/" //ruta a la que lleva
                        ><PlusCircleIcon className="w-6" /> <span >CREAR CURSO</span> 
                    </Link>
                </div>
            </div>
            
            {/*Versiculo de bienvenida*/}
            <div className="flex flex-col gap-3 ml-3 mr-3 mt-5 py-8 md:mt-0 md:ml-0 md:mr-5">
                <p className="text-custom-brown2 text-xl text-center">
                VERSICULO DEL DIA
                </p>
                <p className="text-white text-2xl font-medium text-center bg-custom-brown2 rounded-lg ml-5 mr-5 mt-5 px-5 py-10 md:ml-5 md:mr-5 md:py-10 md:px-5">
                    <strong>{versiculo.texto}</strong>
                <p className='mt-5 text-base md:mt-5 md:text-2xl'>
                    {versiculo.cita}
                </p>
                </p>
            </div>
      </div>
    );
}

export default IndexAdmin