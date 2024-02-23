import React, { useState } from 'react';
import { useAuth } from "../../../context/AuthContext";
import { useEffect } from 'react';
import AuthCard from '../../../components/AuthCard'

function Teachers() {

  const { getUsuarios, usuarios } = useAuth();

  useEffect(() => {
    getUsuarios()
  }, [])

  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  //Lleva un control de las casillas se han seleccionado
  const handleCheckboxChange = (teacherId) => {
    if (selectedTeachers.includes(teacherId)) {
      setSelectedTeachers(selectedTeachers.filter(id => id !== teacherId));
    } else {
      setSelectedTeachers([...selectedTeachers, teacherId]);
    }
  };

  //Permite seleccionar todas las casillas
  const selectAllChange = () => {
    if (selectAll) {
      setSelectedTeachers([]);
    } else {
      setSelectedTeachers(teachers.map(teacher => teacher.id));
    }
    setSelectAll(!selectAll);
  };

  return (
    <div>
      <div className="flex justify-end items-end mb-5 py-3 px-4">
        {selectedTeachers.length > 0 && (
          <>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Editar</button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Eliminar</button>
          </>
        )}
      </div>

      <table>
      <thead /*Encabezado de la tabla*/ >
            <tr className="items-center justify-center text-left py-3 px-4 uppercase font-semibold text-sm bg-gray-100 border-b">
              <th className='px-4 py-3'>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={selectAllChange}
                />
              </th>
              <th className='px-3'>N° de documento</th>
              <th className='px-3'>Nombres</th>
              <th className='px-3'>Apellidos</th>
              <th className='px-3'>Correo</th>
              <th className='px-3'>Telefono</th>
            </tr>
          </thead>

      {usuarios.map(usuario => (
        <TeacherTable teachers={usuario} key={usuario._id} />
      ))}
      </table>

      {/*<h1 className="mt-4 mb-10 text-center text-2xl font-semibold md:text-3xl">Docentes Registrados</h1>
      <TeacherTable teachers={teachers} />*/}
    </div>
  );
}

function TeacherTable({ teachers }) {

  return (
    <div>
      

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <tbody>
            {teachers.map((teacher, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedTeachers.includes(teacher.id)}
                    onChange={() => handleCheckboxChange(teacher.id)}
                  />
                </td>
                <td className="py-3 px-4">{teacher.id}</td>
                <td className="py-3 px-4">{teacher.firstName}</td>
                <td className="py-3 px-4">{teacher.lastName}</td>
                <td className="py-3 px-4">{teacher.email}</td>
                <td className="py-3 px-4">{teacher.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Teachers;
