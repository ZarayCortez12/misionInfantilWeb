import { useForm } from 'react-hook-form'
import { useSectores } from "../context/SectorContext"
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';

function RegisterSectorPage() {

    const  {register, handleSubmit, setValue} = useForm();
    const {createSector, getSector, updateSector} = useSectores();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
    async function loadSector() {
        if (params.id) {
            const sector = await getSector(params.id)
            console.log(sector)
            setValue('numero', sector.numero)
            setValue('nombre', sector.nombre)
            setValue('direccion', sector.direccion)
            setValue('barrio', sector.barrio)
        }
    }
    loadSector()
    }, [])

    const onSubmit = handleSubmit((data) => {
        if (params.id){
            updateSector(params.id, data);
        } else{
            createSector(data);
        }
        
        navigate('/sectores');
    });

    return(
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
            <form onSubmit={onSubmit}>
                <label>Número de Sector:</label>
                <input 
                    type="text" 
                    placeholder="Numero de Sector"
                    {...register("numero", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    autoFocus
                ></input>
                

                <label>Nombre:</label>
                <input 
                    type="text " 
                    {...register("nombre", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Nombre del Sector"
                ></input>
                

                <label>Direccion:</label>
                <input 
                    type="text" 
                    {...register("direccion", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Direccion"
                ></input>
                

                <label>Barrio:</label>
                <input 
                    type="text" 
                    {...register("barrio", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Barrio"
                ></input>
                
                <button>
                    Save
                </button>

            </form>
        
        </div>
    )
}

export default RegisterSectorPage