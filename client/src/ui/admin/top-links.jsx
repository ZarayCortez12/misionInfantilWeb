'use client'

import { BellIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: '', 
    href: '/admin/notificaciones', 
    icon: BellIcon },
  {
    name: '',
    href: '/out',
    icon: ArrowRightOnRectangleIcon,
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
            href={link.href}    
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-custom-blue1 p-3 text-sm text-white font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 md:hidden',
              {
                'bg-custom-blue2 text-white': pathname === link.href,
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
