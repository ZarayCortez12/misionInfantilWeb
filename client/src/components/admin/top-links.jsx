'use client'

import { BellIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: '', 
    to: '/indexAdmin/Notifications', 
    icon: BellIcon },
  {
    name: '',
    to: '/',
    icon: ArrowRightStartOnRectangleIcon,
  },
];

export default function TopLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            to={link.to}    
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-custom-blue1 p-3 text-sm text-white font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 md:hidden',
              {
                'bg-custom-blue2 text-white': pathname === link.to,
              },
            )}
           >

          <LinkIcon className="w-6" />
        </Link>
        );
      })}
    </>
  );
}
