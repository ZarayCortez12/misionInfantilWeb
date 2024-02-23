import { useSectores } from "../context/SectorContext"
import { useEffect } from "react";
import SectorCard from '../components/SectorCard'

import { PlusCircleIcon } from '@heroicons/react/24/solid';

import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";

function SectorPage() {

    const { getSectores, sectores } = useSectores();

    useEffect(() => {
        getSectores()
    }, [])
    
    return (     
     <div className='mt-2 flex grow flex-col gap-4 md:flex-row'>
            
            {/*tabla de sectores*/}

            <div className='p-5  bg-gray-100 h-auto w-screen'>
                <div> <h1 className='text-xl mb-2 poppins text-center text-[50px]'> Sectores</h1></div>
              <div className='flex justify-around mb-2'>
                 <div className='flex items-center hover:text-red-500'> <RiDeleteBin6Line className="hover:text-red-500 mr-2"/>  <h1 className='ml-2'>Eliminar</h1></div> 
                 <div className='flex items-center hover:text-yellow-500'> <MdOutlineEdit className="hover:text-red-500 mr-2"/> <h1 className='ml-2'>Editar</h1> </div> 
                 <div className='flex items-center hover:text-blue-500'> <FaRegEye className="hover:text-red-500 mr-2"/><h1 className='ml-2'>Visualizar</h1></div>
              </div>

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
                 {sectores.map(sector => (
                            <tr >
                                <td className='p-3 text-sm text-gray-700 '>
                                    <input type='checkbox' />
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

                   <div className=' flex justify-center'> <button className='bg-yellow-900 py-2 px-4 rounded-lg hover:bg-yellow-500  poppins lg:mr-24 mr-0 items-center' > 
                <div className='flex justify-around text-white'> <PlusCircleIcon className="w-6 mr-2" /> Ingresar Sector </div></button> </div>
                
                
            </div>
            
            
      </div>



    );
}

export default SectorPage