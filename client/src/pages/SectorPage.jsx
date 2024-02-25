import { useSectores } from "../context/SectorContext"
import { useEffect } from "react";
import React, { useState } from 'react';


import { PlusCircleIcon } from '@heroicons/react/24/solid';

import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

function SectorPage() {

    const { getSectores, sectores, deleteSector} = useSectores();

    useEffect(() => {
        getSectores()
    }, [])

    const [selectedSectors, setSelectedSectors] = useState([]); // []
    const [showDiv, setShowDiv] = useState(false);

    const handleCheckboxChange = (id) => {
        const index = selectedSectors.indexOf(id);
        if (index === -1) {
            setSelectedSectors([...selectedSectors, id]);
            setShowDiv(true); // Mostrar el div cuando se marca un checkbox
            console.log(id);
        } else {
            const updatedSelection = [...selectedSectors];
            updatedSelection.splice(index, 1);
            setSelectedSectors(updatedSelection);
            if (updatedSelection.length === 0) {
                setShowDiv(false); // Ocultar el div cuando no hay checkboxes marcados
            }
        }
    };
    const [showEliminarAviso, setShowEliminarAviso] = useState(false);

    const handleDeleteSector = async (id) => {
        try {
            await deleteSector(id);
            setShowEliminarAviso(false)
            console.log("Sector eliminado exitosamente");
            // Realizar cualquier acción adicional después de eliminar el sector
        } catch (error) {
            console.error("Error al eliminar el sector:", error);
            // Manejar el error apropiadamente
        }
    };

    return (    
        <>    
    <div className='mt-2 flex grow flex-col gap-4 md:flex-row static'>
            
            {/*tabla de sectores*/}

        <div className='p-5 bg-gray-100 h-auto w-screen relative'>

            <div className="mb-6"> 
            <h1 className='text-[28px] poppins text-center poppins bold-text'> Sectores Registrados</h1>
            </div>

            {showDiv && (
                <div id='opciones' className='flex justify-around mb-4' >
                <div className='flex items-center hover:text-red-500 hover:cursor-pointer' onClick={() => setShowEliminarAviso(true)}> 
                <RiDeleteBin6Line className="hover:text-red-500 mr-2"/>  <h1 className='ml-2'>Eliminar</h1>
                </div> 
                <div className='flex items-center hover:text-yellow-500 hover:cursor-pointer '>
                     <MdOutlineEdit className="hover:text-red-500 mr-2"/> <h1 className='ml-2'>Editar</h1> 
                     </div> 
                <div className='flex items-center hover:text-blue-500 hover:cursor-pointer'> <
                    FaRegEye className="hover:text-red-500 mr-2"/><h1 className='ml-2'>Visualizar</h1>
                    </div>
             </div>
                )}
          

          <table className='w-full mb-12'>
            <thead className='bg-gray-50 border-b-2 border-gray-200'>
                <tr>
                    <th></th>
                    <th className='p-3 text-sm poppins tracking-wide text-left'>N° Sector</th>
                    <th className='p-3 text-sm poppins tracking-wide text-left'>Nombre</th>
                    <th className='p-3 text-sm poppins tracking-wide text-left'>Barrio</th>
                    <th className='p-3 text-sm poppins tracking-wide text-left'>Direccion</th>
                </tr>
            </thead>
            <tbody>
                {sectores.map((sector, index) => (
                    <tr key={index}>
                        <td className='p-3 text-sm text-gray-700 '>
                            {/* Agregar el controlador de eventos onChange */}
                            <input 
                                id={`checkbox-${index}`} 
                                type='checkbox' 
                                onChange={() => handleCheckboxChange(sector._id)} 
                            />
                        </td>
                        <td className='p-3 text-sm text-gray-700 '>
                            <h1>{sector.numero}</h1>
                        </td>
                        <td className='p-3 text-sm text-gray-700 '>
                            <h1>{sector.nombre}</h1>
                        </td>
                        <td className='p-3 text-sm text-gray-700 '>
                            <h1>{sector.barrio}</h1>
                        </td>
                        <td className='p-3 text-sm text-gray-700 '>
                            <h1>{sector.direccion}</h1>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

               <div className=' flex justify-center'> <button className='bg-yellow-900 py-2 px-4 rounded-lg hover:bg-yellow-500  poppins  items-center' > 
            <div className='flex justify-around text-white carrois-gothicSC'> <PlusCircleIcon className="w-6 mr-2" /> Ingresar Sector </div></button> </div>
            
        </div> 

        {/* Aviso de Eliminacion*/ }

        {showEliminarAviso && (  <div className=" absolute  top-1/4 left-1/2 ">
        <div className=" absolute bg-blue-900  z-50 h-64 w-96  rounded-lg flex flex-col justify-center items-center ">
           <h1 className="mb-8 text-white text-center poppins text-[25px] m-6">¿Seguro de eliminar el sector seleccionado?</h1>

             <div className="flex justify-center space-x-4">
             {selectedSectors.map((sector, index) => (
                    <button key={index} className="bg-green-600 py-2 px-4 rounded-lg hover:bg-green-900 text-white flex items-center"
                     onClick={() => handleDeleteSector(sector)}>
                    <FaCheck className="w-6 mr-2" />
                     <span className="carrois-gothicSC">Si, Eliminar</span>
                   </button>
                ))}

               <button className="bg-red-600 py-2 px-4 rounded-lg hover:bg-red-900 text-white flex items-center" onClick={() => setShowEliminarAviso(false)}>
               <IoClose className="w-6 mr-2" />
                 <span className="carrois-gothicSC">Cancelar</span>
               </button>
             </div>
        </div>
    </div>)}
  </div>    
  </> 
    );
             }

export default SectorPage