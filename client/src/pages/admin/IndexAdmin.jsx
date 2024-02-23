import React from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

function IndexAdmin() {
    return(
        <div className='flex flex-col gap-3 md:flex-row'>
            {/*Bienvenida*/}
            <div className="flex flex-col gap-4 px-5 mt-4 md:mt-0 md:w-100 md:px-10">
                <p className="py-3 text-xl md:text-2xl font-semibold">¡Hola!</p>
                <strong className="px-10 py-0 text-4xl md:text-5xl">Administrador</strong>
                
                <div className="flex flex-col gap-5 px-10 py-10">
                    <Link className="flex gap-3 justify-start rounded-lg bg-custom-brown1 px-5 py-3 text-base font-light text-white transition-colors hover:bg-custom-brown2"
                        href="/login"  to="/" //ruta a la que lleva 
                        ><PlusCircleIcon className="w-6" /> <span>REALIZAR NUEVO EVENTO</span> 
                    </Link>

                    <Link className="flex gap-3 justify-start rounded-lg bg-custom-brown1 px-5 py-3 text-base font-light text-white transition-colors hover:bg-custom-brown2"
                        href="/login"  to="/" //ruta a la que lleva
                        ><PlusCircleIcon className="w-6" /> <span>INGRESAR DOCENTE</span>
                    </Link>

                    <Link className="flex gap-3 justify-start rounded-lg bg-custom-brown1 px-5 py-3 text-base font-light text-white transition-colors hover:bg-custom-brown2"
                        href="/login"  to="/" //ruta a la que lleva
                        ><PlusCircleIcon className="w-6" /> <span>INGRESAR SECTOR</span>
                    </Link>

                    <Link className="flex gap-3 justify-start rounded-lg bg-custom-brown1 px-5 py-3 text-base font-light text-white transition-colors hover:bg-custom-brown2"
                        href="/login"  to="/" //ruta a la que lleva
                        ><PlusCircleIcon className="w-6" /> <span >CREAR CURSO</span> 
                    </Link>
                </div>
            </div>
            
            {/*Versiculo de bienvenida*/}
            <div className="flex flex-col gap-3 ml-3 mr-3 mt-5 py-8 md:mt-0 md:ml-0 md:mr-0">
                <p className="text-custom-brown2 text-xl text-center">
                VERSICULO DEL DIA
                </p>
                <p className="text-white text-2xl font-medium text-center bg-custom-brown2 rounded-lg ml-5 mr-5 mt-5 px-5 py-10 md:ml-5 md:mr-5 md:py-10 md:px-5">
                    <strong>
                        Porque tanto amó Dios al mundo que dio a su Hijo unigénito, para que todo el que cree en él no se pierda, sino que tenga vida eterna.
                    </strong>
                <p className='mt-5 text-base md:mt-5 md:text-2xl'>
                    Juan 3:16
                </p>
                </p>
            </div>
      </div>
    );
}

export default IndexAdmin