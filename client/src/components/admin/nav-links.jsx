'use client'

import { HandRaisedIcon, UserIcon, AcademicCapIcon, BookOpenIcon, GlobeAmericasIcon, CalendarIcon} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'INICIO', 
    href: '/admin', 
    icon: HandRaisedIcon },
  {
    name: 'DOCENTES',
    href: '/admin/teachers',
    icon: UserIcon,
  },
  { name: 'ESTUDIANTES', 
    href: '/admin/students', 
    icon: AcademicCapIcon },
  {
    name: 'CURSOS',
    href: '/admin/courses',
    icon: BookOpenIcon,
  },
  {
    name: 'SECTORES',
    href: '/admin/sectors',
    icon: GlobeAmericasIcon,
  },
  {
    name: 'EVENTOS',
    href: '/admin/events',
    icon: CalendarIcon,
  },
];

export default function NavLinks() {
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
              'flex h-[48px] gap-3 grow items-center justify-center rounded-md bg-custom-blue1 p-3 text-sm text-white font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-custom-blue2 text-white': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6 md:w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
