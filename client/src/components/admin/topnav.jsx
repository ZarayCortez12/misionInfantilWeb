import { Link } from 'react-router-dom';
import { BellIcon, ArrowRightStartOnRectangleIcon} from '@heroicons/react/24/outline';

export default function TopNav() {
    return (
        <div className="flex h-20 items-center justify-end">
            <Link to= "/indexAdmin/Notifications" className='text-white flex items-center mr-5 hover:text-yellow-500' >
            <BellIcon className="w-7 md:w-8" />
            </Link>

            <Link to="/" className='text-white mr-4 hover:text-red-600'>
            <ArrowRightStartOnRectangleIcon className="w-7 md:w-8" />
            </Link>
        </div>
    )
}