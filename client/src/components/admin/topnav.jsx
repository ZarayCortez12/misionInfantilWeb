import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { BellIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
=======
import { BellIcon, ArrowRightStartOnRectangleIcon} from '@heroicons/react/24/outline';
>>>>>>> RamaAngie

export default function TopNav() {
    const { logout } = useAuth();

    return (
        <div className="flex h-20 items-center justify-end">
<<<<<<< HEAD
            <Link href="/notifications" className='text-white flex items-center mr-5 hover:text-yellow-500' >
                <BellIcon className="w-7 md:w-8" />
            </Link>

            <Link 
                className='text-white mr-4 hover:text-red-600'
                to='/'
                onClick={() => {
                    logout();
                }}
            >
                <ArrowRightOnRectangleIcon className="w-7 md:w-8" />
=======
            <Link to= "/indexAdmin/Notifications" className='text-white flex items-center mr-5 hover:text-yellow-500' >
            <BellIcon className="w-7 md:w-8" />
            </Link>

            <Link to="/" className='text-white mr-4 hover:text-red-600'>
            <ArrowRightStartOnRectangleIcon className="w-7 md:w-8" />
>>>>>>> RamaAngie
            </Link>
        </div>
    )
}