import React, { useState } from 'react';
import { useAuth } from "../../../context/AuthContext";
import { useEffect } from 'react';
import { VscEdit, VscTrash } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import { HiPlusCircle } from "react-icons/hi";

function Teachers() {

  const { getTeachers, usuarios, teachers, index } = useAuth();
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

  
  useEffect(() => {
    getTeachers()
  }, [])


  return (
    <div className="max-h-screen">
      <div className="flex mr-8 ml-5 mt-5 mb-5">
        <div className="text-left justify-start text-3xl font-semibold py-7 pb-20 md:pb-10">
          Docentes Registrados
        </div>
        <div className="flex grow justify-end items-end mt-20 w-auto md:mt-0">
          {selectedTeachers.length > 0 && (
            <>
              <Link className="flex items-center bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-3 rounded mr-5" href="/login"  to="/">
                  <VscEdit size="30px" className='w-5 md:w-6'/>
              </Link>
              <Link className="flex items-center bg-red-500 hover:bg-red-700 text-white text-sm py-2 px-3 rounded" href="/login"  to="/">
                  <VscTrash size="30px" className='w-5 md:w-6'/>
              </Link>
            </>
          )}
        </div>
      </div>
      
      <div className="outer-wrapper p-5">
        <div className="table-wrapper overflow-x-auto overflow-y-auto max-h-screen rounded-lg">
           <table className="w-screen min-h-full bg-white border-collapse rounded-lg">
          <thead /*Encabezado de la tabla*/ >
                <tr className="items-center justify-center text-center uppercase font-semibold text-xs">
                  <th>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={selectAllChange}
                    />
                  </th>
                  <th >N° de documento</th>
                  <th >Nombres</th>
                  <th >Apellidos</th>
                  <th >Correo</th>
                  <th >Telefono</th>
                </tr>
          </thead>
          <tbody>
          {usuarios.map(teacher => (
            <TeacherTable 
              key={teacher._id} 
              teacher={teacher} 
              handleCheckboxChange={handleCheckboxChange} 
              selectedTeachers={selectedTeachers} 
              index={index+1}
            />
        ))}
          </tbody>
             </table>
           </div>
      </div>
      <div className="mt-16 ml-5 md:mt-7"> 
          <Link className="flex gap-3 items-center justify-start rounded-lg bg-custom-brown1 w-56 md:w-64 px-5 py-3 text-sm font-light text-white transition-colors hover:bg-custom-brown2"
                to='/administrador/docentes/register' //ruta a la que lleva 
                ><HiPlusCircle size={24} /> <span>INGRESAR DOCENTE</span> 
          </Link>
      </div>
    </div>
  );
}

function TeacherTable({ teacher, handleCheckboxChange, selectedTeachers, index }) {

  return (
    <tr className="text-xs">
      <td>
        <input type="checkbox" 
                checked={selectedTeachers.includes(teacher._id)} 
                onChange={() => handleCheckboxChange(teacher._id)} />
      </td>
      <td>{teacher.identificacion}</td>
      <td>{teacher.nombre}</td>
      <td>{teacher.apellido}</td>
      <td>{teacher.correo}</td>
      <td>{teacher.telefono}</td>
    </tr>
  );
}

export default Teachers;
