import { useStudent } from "../../../context/StudentContext"; //acomodar
import { useEffect } from "react";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { PlusCircleIcon } from "@heroicons/react/24/solid";


import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import * as Yup from "yup";

import { VscEdit, VscTrash } from "react-icons/vsc";


Modal.setAppElement("#root"); // Necesario para accesibilidad

function Students() {
  
  const { 
    getStudents,
    deleteStudent,
   } =
  useStudent();

  useEffect(() => {
    getStudents();
  }, []);

  const [selectedStudents, setSelectedStudens] = useState(null); // []
  const [showDiv, setShowDiv] = useState(false);

  const [showEliminarAviso, setShowEliminarAviso] = useState(false);

  const handleDeleteStudent = async (id) => {
    try {
      await deleteStudent(id);
      setShowEliminarAviso(false);
      console.log("Estudiante eliminado exitosamente");
      // Realizar cualquier acción adicional después de eliminar el estudiante
    } catch (error) {
      console.error("Error al eliminar al Estudiante:", error);
      // Manejar el error apropiadamente
    }
  };

  const handleEliminarClick = () => {
    if (selectedRows.selectedRows.length === 0) {
      alert("Por favor, seleccione un estudiante para Inhabilitar");
    } else {
      const P1 = selectedRows.selectedRows[0]._id;
      const sector = records.find((record) => record._id === P1);
      setSelectedStudens(sector);
      setShowEliminarAviso(true);
    }
  };

  const handleEditarClick = () => {
    if (selectedRows.selectedRows.length === 0) {
      alert("Por favor, seleccione un Estudiante para editar");
    } else {
      const P1 = selectedRows.selectedRows[0]._id;
      const estudiante = records.find((record) => record._id === P1);
      setSelectedStudens(estudiante);
       VistaEditar(estudiante._id);
    }
  };

  const VistaEditar = (id) => {
    navigate(`${id}`);
  
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/estudiantes");
        const estudiantes = await Promise.all(
          response.data.map(async (item) => {
            return {
              ...item,
              _id: item._id,
              documento: item.documento,
              nombre: item.nombre,
              apellido: item.apellido,
              correo: item.correo,
              telefono: item.telefono,
              estado: item.estado,
            };
          })
        );
        setRecords(estudiantes);
        setFilteredRecords(estudiantes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //variables tabla


  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/administrador/estudiantes/registrar');
  };

  
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState({ selectedRows: [] });
  const [mostrarOpciones, setMostrarOpciones] = useState(null);

  const columns = [
    { name: "Documento", selector: (row) => row.identificacion, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Apellido", selector: (row) => row.apellido, sortable: true },
    { name: "Correo", selector: (row) => row.correo, sortable: true },
    { name: "Estado", selector: (row) => row.estado, sortable: true },
   
  ];

  const customStyles = {
    headCells: {
      style: {
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        fontSize: "12px",
      },
    },
    table: {
      style: {
        borderRadius: "15px",
        overflow: "hidden",
        width: 1100, // Ajusta el ancho de la tabla
      },
    },
  };

  return (
    <>
      <div className="mt-2 flex grow flex-col gap-4 md:flex-row static">
        {/*tabla de estudiantes*/}

        <div className="p-5  h-auto w-screen relative">
          <div className="mb-6">
            <h1 className="text-[38px] poppins text-center poppins bold-text">
              {" "}
              Estudiante Registrados
            </h1>
          </div>

          {mostrarOpciones && (
        <div className="flex grow justify-end items-end mt-20 mr-20 w-auto md:mt-0">
          <div
            className="flex items-center bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-3 rounded mr-5 cursor-pointer"
            onClick={() => {handleEditarClick();
            }}
          >
            <VscEdit size="30px" className="w-5 md:w-6" />
          </div>
          <div
            className="flex items-center bg-red-500 hover:bg-red-700 text-white text-sm py-2 px-3 rounded cursor-pointer"
            onClick={() => handleEliminarClick()}
          >
            <VscTrash size="30px" className="w-5 md:w-6" />
          </div>
        </div>
      )}

          <div className="outer-wrapper p-5 h-auto">
        <div className=" overflow-x-auto overflow-y-auto max-h-screen rounded-lg">
        <DataTable
              columns={columns}
              data={filteredRecords}
              selectableRows
              selectableRowsSingle
              pagination
              paginationPerPage={5}
              onSelectedRowsChange={(state) => {setSelectedRows(state);
                setMostrarOpciones(state.selectedRows[0]);
              }

              }
              fixedHeader
              progressPending={loading}
              customStyles={customStyles}
            />
           </div>
      </div>
          
          <div className=" flex justify-center mt-6 ">
            {" "}
            <button
              className="bg-yellow-900 py-4 px-6 rounded-lg hover:bg-yellow-500  poppins  items-center w-96"
              onClick={() => handleClick()}
            >
              <div className="flex justify-center text-white carrois-gothicSC">
                {" "}
                <PlusCircleIcon className="w-6 mr-2" /> Ingresar Estudiante{" "}
              </div>
            </button>{" "}
          </div>
        </div>

        {/* Aviso de Eliminacion*/}
        <Modal
          isOpen={showEliminarAviso}
          onRequestClose={() => setShowEliminarAviso(false)}
          contentLabel="Eliminar Estudiante"
          className="absolute  top-1/4 left-1/2"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="absolute bg-blue-900  z-50  rounded-lg flex flex-col justify-center items-center p-6 w-96">
            <div className="mb-8 text-white text-center poppins text-[25px] m-6">
              <h2 className="mb-8 text-white text-center poppins text-[25px] m-6">
                ¿Estás seguro que deseas inhabilitar?
              </h2>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-green-600 py-2 px-4 rounded-lg hover:bg-green-900 text-white flex items-center"
                onClick={() => {
                  handleDeleteStudent(selectedStudents._id);
                  setShowEliminarAviso(false);
                  location.reload();
                }} 
              >
                <FaCheck className="w-6 mr-2" />
                Si, inhabilitar
              </button>
              <button
                className="bg-red-600 py-2 px-4 rounded-lg hover:bg-red-900 text-white flex items-center"
                onClick={() => setShowEliminarAviso(false)}
              >
                <IoClose className="w-6 mr-2" />
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
  
        
      </div>
    </>
  );
}

export default Students;


