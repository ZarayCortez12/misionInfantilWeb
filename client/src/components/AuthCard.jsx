
function AuthCard({ usuario }) {

    return (
        <div className="bg-zinc-800 max-w-md  w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{usuario.identificacion}</h1>
                <div className="flex gap-x-2 items-center">
                    {usuario.correo}
                </div>
            </header>
            <p className="text-slate-300">{usuario.nombre}</p>
        </div>
    )
}

export default AuthCard