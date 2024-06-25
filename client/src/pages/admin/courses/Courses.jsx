import React from 'react';
import { FaEye, FaTrash, FaPlus } from 'react-icons/fa';

const CursoCard = ({ title, date }) => (
    <div className="border border-blue-500 rounded-lg p-4 flex flex-col justify-between">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm">Fecha Creación: {date}</p>
      <div className="flex justify-end space-x-2 mt-2">
        <button className="text-green-500">
          <FaEye />
        </button>
        <button className="text-red-500">
          <FaTrash />
        </button>
      </div>
    </div>
  );
  
  const Courses = () => {
    const cursos = [
      { title: 'Palabra De Dios', date: '24/12/2023' },
      { title: 'Caminemos de la Mano', date: '30/12/2024' },
      { title: 'Pacto De Dios', date: '10/10/2024' },
      { title: 'Fuerza De Dios', date: '20/05/2024' },
      { title: 'Camino del Señor', date: '15/04/2024' },
      { title: 'Manos de Cristo', date: '17/06/2024' },
    ];
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Cursos Registrados</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cursos.map((curso, index) => (
          <CursoCard key={index} title={curso.title} date={curso.date} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button className="bg-brown-500 text-white px-4 py-2 rounded-full flex items-center space-x-2">
          <FaPlus />
          <span>Crear Curso</span>
        </button>
      </div>
    </div>
  );
};

export default Courses;



