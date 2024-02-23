import React from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useSectores } from "../context/SectorContext"
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { IoIosSave } from "react-icons/io";


 function viewSectores() {

  const [sectorNumero, setSectorNumero] = useState();
    
    const { register, handleSubmit, setValue } = useForm();
  
    const { createSector, getSector, updateSector } = useSectores();
    
    const navigate = useNavigate();
    
    const params = useParams();
  
    useEffect(() => {
      async function loadSector() {
        if (params.id) {
          const sector = await getSector(params.id)
          setSectorNumero(sector.numero);
          setValue('nombre', sector.nombre)
          setValue('direccion', sector.direccion)
          setValue('barrio', sector.barrio)  
        }
      }
      loadSector();
    }, []);

    const onSubmit = handleSubmit((data) => {  
        if (params.id) {
          updateSector(params.id, data);
        } else {  
          createSector(data);
        }
        navigate('/sectores');
      });
    

    return(
        <div>

            <div className='flex h-[calc(100vh-100px)] items-center justify-center space-x-20'>

            <div className='bg-blue-900 max-w-md w-full p-10 rounded-md items-center justify-center relative'>
                <form onSubmit={onSubmit}>
                    <label className='text-white'>Número de Sector:</label>
                    {params.id ? (
                        // Editando
                        <input 
                            type="text"
                            value={sectorNumero}
                            disabled  
                            className="w-full bg-gray-500 text-white px-4 py-2 rounded-md my-2"  
                        />
                    ) : (
                        // Creando
                        <input 
                            type="text"
                            {...register("numero")} 
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"  
                        />
                    )}
                    

                    <label className='text-white'>Nombre:</label>
                    <input 
                        type="text " 
                        {...register("nombre", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Nombre del Sector"
                    ></input>
                    

                    <label className='text-white'>Direccion:</label>
                    <input 
                        type="text" 
                        {...register("direccion", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Dirección"
                    ></input>
                    

                    <label className='text-white'>Barrio:</label>
                    <input 
                        type="text" 
                        {...register("barrio", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Barrio"
                    ></input>
                    
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:text-custom-brown2 poppins mt-4" type="submit">
                        <div className='flex'>Guardar <IoIosSave className='ml-4 mt-1'/></div>
                    </button>
                </form>

            </div>

            </div>

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
                              <tr className=''>
                                <td className='p-3 text-sm text-gray-700 '>
                                <input type='checkbox'/>
                                </td>
                                <td className='p-3 text-sm text-gray-700 '>
                                <h1>pepito</h1>
                                </td>
                                <td className='p-3 text-sm text-gray-700 '>
                                <h1>pepito</h1>
                                </td>
                                <td className='p-3 text-sm text-gray-700 '>
                                <h1>pepito</h1>
                                </td>
                                <td className='p-3 text-sm text-gray-700 '>
                                <h1>pepito</h1>
                                </td>
                              </tr>
                              <tr className=''> 
                                <td className='p-3 text-sm text-gray-700 '>
                                <input type='checkbox'/>
                                </td>
                                <td className='p-3 text-sm text-gray-700 '>
                                <h1>pepito</h1>
                                </td>
                                <td className='p-3 text-sm text-gray-700 '>
                                <h1>pepito</h1>
                                </td>
                                <td className='p-3 text-sm text-gray-700 '>
                                <h1>pepito</h1>
                                </td>
                                <td className='p-3 text-sm text-gray-700 '>
                                <h1>pepito</h1>
                                </td>
                              </tr>
                              <tr>
                                <td className='p-3 text-sm text-gray-700 '>
                                <input type='checkbox'/>
                                </td>
                                <td className='p-3 text-sm text-gray-700 '>
                                <h1>pepito</h1>
                                </td>
                                <td className='p-3 text-sm text-gray-700 '>
                                <h1>pepito</h1>
                                </td>
                                <td className='p-3 text-sm text-gray-700 '>
                                <h1>pepito</h1>
                                </td>
                                <td className='p-3 text-sm text-gray-700 '>
                                <h1>pepito</h1>
                                </td>
                              </tr>
                              <tr>
                                <td className='p-3 text-sm text-gray-700 '>
                                <input type='checkbox'/>
                                </td>
                                <td className='p-3 text-sm text-gray-700 '>
                                <h1>pepito</h1>
                                </td>
                                <td className='p-3 text-sm text-gray-700 '>
                                <h1>pepito</h1>
                                </td>
                                <td className='p-3 text-sm text-gray-700 '>
                                <h1>pepito</h1>
                                </td>
                                <td className='p-3 text-sm text-gray-700 '>
                                <h1>pepito</h1>
                                </td>
                              </tr>

                            </tbody>

                            </table>

                              <div className=' flex justify-center'> <button className='bg-yellow-900 py-2 px-4 rounded-lg hover:bg-yellow-500  poppins lg:mr-24 mr-0 items-center' > 
                            <div className='flex justify-around text-white'> <PlusCircleIcon className="w-6 mr-2" /> Ingresar Sector </div></button> </div>
                            
                            
                        </div>
                  </div>

        </div>
        
    );
}

export default viewSectores