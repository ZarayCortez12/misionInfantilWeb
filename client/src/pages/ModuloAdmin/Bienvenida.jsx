import { BellIcon, ArrowRightOnRectangleIcon, HandRaisedIcon, UserIcon, AcademicCapIcon, BookOpenIcon, GlobeAmericasIcon, CalendarIcon} from '@heroicons/react/24/outline';
import { PlusCircleIcon } from '@heroicons/react/24/solid'

function BienvenidaAdmin(){
    return(
        <main className="flex min-h-screen flex-col p-0 relative">
            
            {/*Barra superior*/}
            <div className="flex h-20 items-center justify-end bg-custom-blue1">
                <Link href="/notificaciones" className='text-white flex items-center mr-5' >
                <BellIcon className="w-8 md:w-8" />
                </Link>

                <Link className='text-white items-center mr-4' href="/salir">
                <ArrowRightOnRectangleIcon className="w-8 md:w-8" />
                </Link>
            </div>

            <div>HOLA</div>

        </main>
    );
}

export default BienvenidaAdmin