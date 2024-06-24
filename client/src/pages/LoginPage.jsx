import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoOrganizacion from '../assets/logoOrganizacion.png';
import { FaUser, FaChalkboardTeacher, FaArrowAltCircleLeft } from "react-icons/fa";
import { TbLock } from "react-icons/tb";
import { MdAdminPanelSettings, MdRemoveRedEye } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { Link } from "react-router-dom"
import "../components/styles/LoginStyle.css"
import { useState } from 'react';

function LoginPage() {
 
    const {
        register, 
        handleSubmit,
        formState: { errors },
    } = useForm();

    const {signin, errors: signinErrors, isAuthenticated } = useAuth();
    const [ userDatas, setUserDatas ] = useState('');
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        try {
            
            const userData = await signin(data);
            setUserDatas(userData);
            localStorage.setItem('user', JSON.stringify(userData));
    
            navigate(`/${userData.rol}`);
    
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }

    });
    

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center space-x-20'>
            
            <div className="relative">
                
            <div className="bg-yellow-700 h-16 fixed top-0 w-full z-10 flex items-center justify-start right-0 m-0 p-0">
                <Link to='/'>
                    <FaArrowAltCircleLeft className="text-white ml-4 cursor-pointer top-0 z-20 w-8 h-8 hover:text-custom-blue1" />
                </Link>
            </div>
            
            </div>
            

            <div className='text-center'>

                <img src={logoOrganizacion} alt="Logo de la organización" className='w-86 h-64 mx-auto'/><br></br>

                <h1 className='text-4xl font-bold text-blue-800 mt-4 mb-4'>¡ Bienvenidos !</h1>

            </div>



            <div className='contenedor bg-blue-900 max-w-md w-full p-10 rounded-md items-center justify-center relative'>
                  
                {signinErrors.map((error, i) => (
                    <div className="bg-red-500 p-2 text-white text-center" key={i}>
                        {error}
                    </div>
                ))}

                <h1 className='text-2xl font-bold my-2 text-white text-center'>Inicio de Sesión</h1>
                <br></br>
                <form onSubmit={onSubmit}>

                    <div className="flex items-center">
                        <div className="text-white mr-2">
                            <FaUser className='w-5 h-5' />
                        </div>
                        <input 
                            type="text" 
                            {...register("correo", { required: true })}
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                            placeholder="Usuario"
                        ></input>
                    </div>
                    {errors.correo && (
                        <p className="text-red-500">Correo is required</p>
                    )}

                    <div className="flex items-center">
                        <div className="text-white mr-2">
                            <TbLock className='w-6 h-6'/>
                        </div>

                        <input 
                            type="password" 
                            {...register("clave", { required: true })}
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                            placeholder="Contraseña"
                        ></input>
                    </div>
                    {errors.clave && (
                        <p className="text-red-500">Contraseña is required</p>
                    )}
                    <br></br>

                    <fieldset className='flex flex-col items-center'>

                        <h1 className='text-xl font-bold my-2 text-white text-center'>¿Cómo deseas ingresar?</h1><br></br>

                        <div className='flex items-center justify-center space-x-4'>

                            <div className='flex flex-col items-center mb-4'>
                            <MdAdminPanelSettings className='text-4xl text-white' />
                            <label htmlFor='administrador' className='text-xs text-white'>ADMINISTRADOR</label>     
                            <br />
                            <input
                                type="radio"
                                id="administrador"
                                name="option"
                                value="ADMINISTRADOR"
                                {...register('option', {
                                    required: true,
                                    minLength: 1,
                                })}
                            />                       
                            </div>

                            <div className='flex flex-col items-center mb-4'>
                            <FaChalkboardTeacher className='text-4xl text-white' />
                            <label htmlFor='docente' className='text-xs text-white'>DOCENTE</label>
                            <br></br>
                            <input
                                type="radio"
                                id="docente"
                                name="option"
                                value="DOCENTE"
                                {...register('option', {
                                    required: true,
                                    minLength: 1,
                                })}
                            />
                            </div>

                            <div className='flex flex-col items-center mb-4'>
                            <PiStudent className='text-4xl text-white' />
                            <label htmlFor='estudiante' className='text-xs text-white'>ESTUDIANTE</label>
                            <br></br>
                            <input
                                type="radio"
                                id="estudiante"
                                name="option"
                                value="ESTUDIANTE"
                                {...register('option', {
                                    required: true,
                                    minLength: 1,
                                })}
                            />
                            </div>

                        </div>
                        {errors.option && errors.option.type === 'required' && (
                            <p className="text-red-500">Selecciona al menos una opción</p>
                        )}
                        {errors.option && errors.option.type === 'minLength' && (
                            <p className="text-red-500">Selecciona al menos una opción</p>
                        )}

                    </fieldset>
                    
                    <br></br>

                    <div className="flex items-center justify-center">
                        <input 
                            type="submit" 
                            value="Ingresar"
                            className="bg-white text-blue-600 px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-custom-brown1 hover:text-white"
                        />
                    </div>
                </form>
            </div>

            <div className="inferior bg-yellow-700 h-16 fixed bottom-0 right-0 m-0 p-0"></div>

        </div>
    )
}

export default LoginPage