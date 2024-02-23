import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { HiIdentification } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import { TbLock } from "react-icons/tb";
import { IoIosSave } from "react-icons/io";

function RegisterDocentePage() {
    const { 
        register, 
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit( async (values) => {
        signup(values);
        console.log(values);
    });

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="bg-yellow-800 bg-opacity-50 w-150 p-10 rounded-md">
                {registerErrors.map((error, i) => (
                    <div className="bg-red-500 p-2 text-white" key={i}>
                        {error}
                    </div>
                ))}

                <form onSubmit={onSubmit} className="flex justify-center">
                    {/* Columna izquierda */}
                    <div className="flex flex-col items-center text-white mr-4">

                        <div className="flex items-center mb-2">
                            <div className="text-white mr-2">
                            <HiIdentification className='w-5 h-5' />
                            </div>
                            <input 
                            type="text" 
                            {...register("identificacion", { required: true })}
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                            placeholder="Número de Identificación"
                            />
                        </div>
                        {errors.identificacion && (
                            <p className="text-red-500">Identificación is required</p>
                        )}

                        <div className="flex items-center mb-2">
                            <div className="text-white mr-2">
                            <FaUser className='w-5 h-5' />
                            </div>
                            <input 
                            type="text" 
                            {...register("nombre", { required: true })}
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                            placeholder="Nombres"
                            />
                        </div>
                        {errors.nombre && (
                            <p className="text-red-500">Nombre is required</p>
                        )}

                        <div className="flex items-center mb-2">
                            <div className="text-white mr-2">
                            <FaUser className='w-5 h-5' />
                            </div>
                            <input 
                            type="text" 
                            {...register("apellido", { required: true })}
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                            placeholder="Apellidos"
                            />
                        </div>
                        {errors.apellido && (
                            <p className="text-red-500">Apellido is required</p>
                        )}
                        </div>

                        {/* Columna derecha */}
                        <div className="flex flex-col items-center text-white">
                        <div className="flex items-center mb-2">
                            <div className="text-white mr-2">
                            <MdEmail className='w-5 h-5' />
                            </div>
                            <input 
                            type="email" 
                            {...register("correo", { required: true })}
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                            placeholder="Correo Electronico"
                            />
                        </div>
                        {errors.correo && (
                            <p className="text-red-500">Correo is required</p>
                        )}

                        <div className="flex items-center mb-2">
                            <div className="text-white mr-2">
                            <FaPhoneAlt className='w-5 h-5' />
                            </div>
                            <input 
                            type="text" 
                            {...register("telefono", { required: true })}
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                            placeholder="Telefono"
                            />
                        </div>
                        {errors.telefono && (
                            <p className="text-red-500">Telefono is required</p>
                        )}

                        <div className="flex items-center mb-2">
                            <div className="text-white mr-2">
                            <TbLock className='w-5 h-5' />
                            </div>
                            <input 
                            type="password" 
                            {...register("contraseña", { required: true })}
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                            placeholder="Contraseña"
                            />
                        </div>
                        {errors.contraseña && (
                            <p className="text-red-500">Contraseña is required</p>
                        )}

                    </div>

                    <div className="flex items-center justify-center mt-4">
                        <input
                            type="submit"
                            value="Guardar"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
                        />
                    </div>

                </form>
            </div>
        </div>
    )
}

export default RegisterDocentePage