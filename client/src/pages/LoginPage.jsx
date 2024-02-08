import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    const {
        register, 
        handleSubmit,
        formState: { errors },
    } = useForm();
    const {signin, errors: signinErrors, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const onSubmit = handleSubmit(data => {
       signin(data);
    })

    useEffect(() => {
        if (isAuthenticated) navigate("/sectores");
    }, [isAuthenticated])

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                
                {signinErrors.map((error, i) => (
                        <div className="bg-red-500 p-2 text-white text-center" key={i}>
                            {error}
                        </div>
                ))}

                <h1 className='text-2xl font-bold my-2'>Login</h1>
                
                <form onSubmit={onSubmit}>
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

                    <input type="submit" value="Login"></input>

                </form>
            </div>
        </div>
    )
}

export default LoginPage