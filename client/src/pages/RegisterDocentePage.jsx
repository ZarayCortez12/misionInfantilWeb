import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RegisterDocentePage() {
    const { 
        register, 
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/sectores');
    }, [isAuthenticated]);

    const onSubmit = handleSubmit( async (values) => {
        signup(values);
        console.log(values);
    });

    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
            {
                registerErrors.map((error, i) => (
                    <div className="bg-red-500 p-2 text-white" key={i}>
                        {error}
                    </div>
                ))
            }
            <form onSubmit={onSubmit}>
                <label>Número de documento:</label>
                <input 
                    type="text" 
                    {...register("identificacion", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Numero de Identificacion"
                ></input>
                {errors.identificacion && (
                    <p className="text-red-500">identificacion is required</p>
                )}

                <label>Correo Electronico:</label>
                <input 
                    type="email" 
                    {...register("correo", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Correo Electronico"
                ></input>
                {errors.correo && (
                    <p className="text-red-500">Correo is required</p>
                )}

                <label>Nombre:</label>
                <input 
                    type="text" 
                    {...register("nombre", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Nombres"
                ></input>
                {errors.nombre && (
                    <p className="text-red-500">Nombre is required</p>
                )}

                <label>Apellido:</label>
                <input 
                    type="text" 
                    {...register("apellido", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Apellidos"
                ></input>
                {errors.apellido && (
                    <p className="text-red-500">Apellido is required</p>
                )}

                <label>Contraseña:</label>
                <input 
                    type="password" 
                    {...register("contraseña", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Contaseña"
                ></input>
                {errors.contraseña && (
                    <p className="text-red-500">Contraseña is required</p>
                )}

                <input type="submit" value="Guardar"></input>

            </form>
        
        </div>
    )
}

export default RegisterDocentePage