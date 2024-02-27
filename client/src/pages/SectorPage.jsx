import { useSectores } from "../context/SectorContext"
import { useEffect } from "react";
import SectorCard from '../components/SectorCard'

function SectorPage() {

    const { getSectores, sectores } = useSectores();

    useEffect(() => {
        getSectores()
    }, [])
    
    return ( 
        <div>
            <div className="grid grid-cols-3 gap-2">
                {sectores.map(sector => (
                    <SectorCard sector={sector} key={sector._id} />
                ))}
            </div>
        </div>
    );
}

export default SectorPage