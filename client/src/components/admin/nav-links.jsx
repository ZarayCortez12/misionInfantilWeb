'use client'

import { HandRaisedIcon, UserIcon, AcademicCapIcon, BookOpenIcon, GlobeAmericasIcon, CalendarIcon} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'INICIO', 
    to: "/indexAdmin" , 
    icon: HandRaisedIcon },
  {
    name: 'DOCENTES',
    to: "/indexAdmin/Teachers",
    icon: UserIcon },
  {
    name: 'ESTUDIANTES', 
    to: "/indexAdmin/Students", 
    icon: AcademicCapIcon },
  {
    name: 'CURSOS',
    to: "/indexAdmin/Courses",
    icon: BookOpenIcon },
  {
    name: 'SECTORES',
    to: "/indexAdmin/Sectors",
    icon: GlobeAmericasIcon },
  {
    name: 'EVENTOS',
    to: "/indexAdmin/Events",
    icon: CalendarIcon }
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
            to={link.to}
            className={clsx(
              'flex h-[48px] gap-3 grow items-center justify-center rounded-md bg-custom-blue1 p-3 text-sm text-white font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-7',
              {
                'bg-custom-blue2 text-white': pathname === link.to,
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
