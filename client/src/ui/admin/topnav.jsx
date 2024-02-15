import Link from 'next/link';
import { BellIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function TopNav() {
    return (
        <div className="flex h-20 items-center justify-end">
            <Link href="/notifications" className='text-white flex items-center mr-5 hover:text-yellow-500' >
            <BellIcon className="w-7 md:w-8" />
            </Link>

            <Link href="/out" className='text-white mr-4 hover:text-red-600'>
            <ArrowRightOnRectangleIcon className="w-7 md:w-8" />
            </Link>
        </div>
    )
}