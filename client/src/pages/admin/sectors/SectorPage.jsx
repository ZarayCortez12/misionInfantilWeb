import { useSectores } from "../../../context/SectorContext"; //acomodar
import { useEffect } from "react";
import React, { useState } from "react";

import axios from "axios";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import * as Yup from "yup";
import { Form, Formik } from "formik";

import { VscEdit, VscTrash } from "react-icons/vsc";

import { MdSaveAlt } from "react-icons/md";
import { record } from "zod";

Modal.setAppElement("#root"); // Necesario para accesibilidad

function SectorPage() {
  const { getSectores, sectores, deleteSector, createSector, updateSector } =
    useSectores();

  useEffect(() => {
    getSectores();
  }, []);

  const [selectedSectors, setSelectedSectors] = useState(null); // []
  const [showDiv, setShowDiv] = useState(false);

  const [showEliminarAviso, setShowEliminarAviso] = useState(false);
  const [showCrearAviso, setShowCrearAviso] = useState(false);
  const [showEditarAviso, setEditarAviso] = useState(false);

  const handleDeleteSector = async (id) => {
    try {
      await deleteSector(id);
      setShowEliminarAviso(false);
      console.log("Sector eliminado exitosamente");
      // Realizar cualquier acción adicional después de eliminar el sector
    } catch (error) {
      console.error("Error al eliminar el sector:", error);
      // Manejar el error apropiadamente
    }
  };

  const handleEliminarClick = () => {
    if (selectedRows.selectedRows.length === 0) {
      alert("Por favor, seleccione un sector para eliminar");
    } else {
      const P1 = selectedRows.selectedRows[0].id;
      const sector = records.find((record) => record._id === P1);
      setSelectedSectors(sector);
      setShowEliminarAviso(true);
    }
  };

  const handleEditarClick = () => {
    if (selectedRows.selectedRows.length === 0) {
      alert("Por favor, seleccione un sector para editar");
    } else {
      const P1 = selectedRows.selectedRows[0].id;
      const sector = records.find((record) => record._id === P1);
      setSelectedSectors(sector);
      setEditarAviso(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/sectores");
        const sectores = await Promise.all(
          response.data.map(async (item) => {
            return {
              ...item,
              id: item._id,
              numero: item.numero,
              nombre: item.nombre,
              barrio: item.barrio,
              direccion: item.direccion,
            };
          })
        );
        setRecords(sectores);
        setFilteredRecords(sectores);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //variables tabla

  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState({ selectedRows: [] });
  const [mostrarOpciones, setMostrarOpciones] = useState(null);

  const columns = [
    { name: "N° Sector", selector: (row) => row.numero, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Barrio", selector: (row) => row.barrio, sortable: true },
    { name: "Direccion", selector: (row) => row.direccion, sortable: true },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontSize: "20px",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
      },
    },
    table: {
      style: {
        
        borderRadius: "10px",
        overflow: "hidden",
        width: 1100, // Ajusta el ancho de la tabla
      },
    },
  };
  const sectorExistenteNumero = async (numero) => {
    try {
      const response = await axios.get("http://localhost:4000/api/sectores");
      const sectores = response.data;

      // Verificar si el correo está en la lista de usuarios
      const sectoresEncontrados = sectores.some(
        (sector) => sector.numero === numero
      );
      return sectoresEncontrados;
    } catch (error) {
      console.error("Error al verificar el correo:", error);
      return false;
    }
  };

  const sectorExistenteNombre = async (nombre) => {
    try {
      const response = await axios.get("http://localhost:4000/api/sectores");
      const sectores = response.data;

      // Verificar si el correo está en la lista de usuarios
      const sectoresEncontrados = sectores.some(
        (sector) => sector.nombre.toLowerCase() === nombre.toLowerCase()
      );
      return sectoresEncontrados;
    } catch (error) {
      console.error("Error al verificar el correo:", error);
      return false;
    }
  };

  const validationSchema = Yup.object().shape({
    numero: Yup.string()
      .required("El numero es requerido")
      .test("check-duplicado", "N° Sector Existente", async (numero) => {
        const Duplicado = await sectorExistenteNumero(numero);
        return !Duplicado;
      }),
    nombre: Yup.string()
      .max(50, "El nombre no puede tener más de 50 caracteres")
      .matches(/^[A-Za-z ]+$/, "Solo letras permitidas")
      .required("El nombre es requerido")
      .test("check-duplicado", "Nombre Existente", async (nombre) => {
        const Duplicado = await sectorExistenteNombre(nombre);
        return !Duplicado;
      }),
    barrio: Yup.string()
      .max(50, "El barrio no puede tener más de 50 caracteres")
      .matches(/^[A-Za-z ]+$/, "Solo letras permitidas")
      .required("El apellido es requerido"),
    direccion: Yup.string().required("La direcion es requerida"),
  });
  const validationSchemaEditar = Yup.object().shape({
    barrio: Yup.string()
      .max(50, "El barrio no puede tener más de 50 caracteres")
      .matches(/^[A-Za-z ]+$/, "Solo letras permitidas")
      .required("El apellido es requerido"),
    direccion: Yup.string().required("La direcion es requerida"),
  });
  return (
    <>
      <div className="mt-2 flex grow flex-col gap-4 md:flex-row static">
        {/*tabla de sectores*/}

        <div className="p-5  h-auto w-screen relative">
          <div className="mb-6">
            <h1 className="text-[38px] poppins text-center poppins bold-text">
              {" "}
              Sectores Registrados
            </h1>
          </div>

          {mostrarOpciones && (
        <div className="flex grow justify-end items-end mt-20 mr-20 w-auto md:mt-0">
          <div
            className="flex items-center bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-3 rounded mr-5"
            onClick={() => handleEditarClick()}
          >
            <VscEdit size="30px" className="w-5 md:w-6" />
          </div>
          <div
            className="flex items-center bg-red-500 hover:bg-red-700 text-white text-sm py-2 px-3 rounded"
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
              onClick={() => setShowCrearAviso(true)}
            >
              <div className="flex justify-center text-white carrois-gothicSC">
                {" "}
                <PlusCircleIcon className="w-6 mr-2" /> Ingresar Sector{" "}
              </div>
            </button>{" "}
          </div>
        </div>

        {/* Aviso de Eliminacion*/}
        <Modal
          isOpen={showEliminarAviso}
          onRequestClose={() => setShowEliminarAviso(false)}
          contentLabel="Eliminar Sector"
          className="absolute  top-1/4 left-1/2"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="absolute bg-blue-900  z-50  rounded-lg flex flex-col justify-center items-center p-6 w-96">
            <div className="mb-8 text-white text-center poppins text-[25px] m-6">
              <h2 className="mb-8 text-white text-center poppins text-[25px] m-6">
                ¿Estás seguro que deseas eliminar el sector?
              </h2>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-green-600 py-2 px-4 rounded-lg hover:bg-green-900 text-white flex items-center"
                onClick={() => {
                  handleDeleteSector(selectedSectors._id);
                  setShowEliminarAviso(false);
                }}
              >
                <FaCheck className="w-6 mr-2" />
                Si, Eliminar
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

        {/* Aviso de crear*/}
        <Modal
          isOpen={showCrearAviso}
          onRequestClose={() => setShowCrearAviso(false)}
          contentLabel="Crear Sector"
          className="  top-50 left-1/2"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className=" bg-blue-900  z-50  rounded-lg flex flex-col justify-center items-center p-6 w-96">
            <div className=" text-white text-center poppins text-[25px] ">
              <h2 className=" text-white text-center poppins text-[25px] m-6">
                INGRESAR SECTOR
              </h2>
            </div>

            <Formik
              initialValues={{
                numero: "",
                nombre: "",
                direccion: "",
                barrio: "",
              }}
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  values.nombre =
                    values.nombre.charAt(0).toUpperCase() +
                    values.nombre.slice(1);
                  console.log("voy a crear esto ", values);
                  await createSector(values);
                  resetForm();
                  setShowCrearAviso(false);
                  location.reload();
                } catch (error) {
                  console.error("Error al crear el entrenador:", error);
                }
                setSubmitting(false);
              }}
            >
              {({
                handleChange,
                handleSubmit,
                errors,
                touched,
                isSubmitting,
                values,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="justify-center m-2">
                    <div
                      className={`flex m-4 items-center ${
                        errors.numero ? "mb-0" : "mb-4"
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="Numero"
                        className="m-2 ml-3 h-12 rounded-lg bg-gray-700 text-white w-full pl-4"
                        name="numero"
                        onChange={handleChange}
                      />
                    </div>
                    {errors.numero && touched.numero && (
                      <div className="text-red-500 justify-center text-center">
                        {errors.numero}
                      </div>
                    )}

                    <div
                      className={`flex m-4 items-center ${
                        errors.nombre ? "mb-0" : "mb-4"
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="Nombre"
                        className="m-2 ml-3 h-12 rounded-lg bg-gray-700 text-white w-full pl-4"
                        name="nombre"
                        onChange={handleChange}
                      />
                    </div>
                    {errors.nombre && touched.nombre && (
                      <div className="text-red-500 justify-center text-center">
                        {errors.nombre}
                      </div>
                    )}
                    <div
                      className={`flex m-4 items-center ${
                        errors.direccion ? "mb-0" : "mb-4"
                      }`}
                    >
                      <input
                        type="text"
                        className="m-2 h-12 ml-3 rounded-lg bg-gray-700 text-white w-full pl-4"
                        placeholder="Direccion"
                        name="direccion"
                        onChange={handleChange}
                      />
                    </div>
                    {errors.direccion && touched.direccion && (
                      <div className="text-red-500 justify-center text-center">
                        {errors.direccion}
                      </div>
                    )}

                    <div
                      className={`flex m-4 items-center ${
                        errors.barrio ? "mb-0" : "mb-4"
                      }`}
                    >
                      <input
                        type="text"
                        className="m-2 h-12 ml-3 rounded-lg bg-gray-700 text-white w-full pl-4"
                        placeholder="Barrio"
                        name="barrio"
                        onChange={handleChange}
                      />
                    </div>
                    {errors.barrio && touched.barrio && (
                      <div className="text-red-500 justify-center text-center">
                        {errors.barrio}
                      </div>
                    )}

                    <div className="flex justify-center space-x-4 m-5 ">
                      <button
                        type="submit"
                        className="bg-yellow-700 py-2 px-4 rounded-lg hover:bg-yellow-600 text-white flex items-center"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Cargando..."
                        ) : (
                          <div className="flex items-center">
                            <MdSaveAlt className="w-6 mr-2" />
                            <span className="">Guardar</span>
                          </div>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCrearAviso(false)}
                        className="bg-red-600 py-2 px-4 rounded-lg hover:bg-red-800 text-white flex items-center"
                      >
                        <IoClose className="w-6 mr-2" />
                        <span className="">Cancelar</span>
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal>

        {/* Aviso de Editar*/}
        <Modal
          isOpen={showEditarAviso}
          onRequestClose={() => setEditarAviso(false)}
          contentLabel="Editar Sector"
          className="  top-50 left-1/2"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className=" bg-blue-900  z-50  rounded-lg flex flex-col justify-center items-center p-6 w-96">
            <div className=" text-white text-center poppins text-[25px] ">
              <h2 className=" text-white text-center poppins text-[25px] m-6">
                EDITAR SECTOR
              </h2>
            </div>

            <Formik
              initialValues={{
                numero: selectedSectors?.numero || "",
                nombre: selectedSectors?.nombre || "",
                direccion: selectedSectors?.direccion || "",
                barrio: selectedSectors?.barrio || "",
              }}
              enableReinitialize={true}
              validationSchema={validationSchemaEditar}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  await updateSector(selectedSectors._id, values);
                  setEditarAviso(false);
                  resetForm();
                  location.reload();
                } catch (error) {
                  console.error("Error al crear el entrenador:", error);
                }
                setSubmitting(false);
              }}
            >
              {({
                handleChange,
                handleSubmit,
                errors,
                touched,
                isSubmitting,
                values,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="justify-center m-2">
                    <div
                      className={`flex m-4 items-center ${
                        errors.numero ? "mb-0" : "mb-4"
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="Numero"
                        className="m-2 ml-3 h-12 rounded-lg bg-gray-700 text-white w-full pl-4"
                        name="numero"
                        value={values.numero}
                        onChange={handleChange}
                        disabled
                      />
                    </div>

                    <div
                      className={`flex m-4 items-center ${
                        errors.nombre ? "mb-0" : "mb-4"
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="Nombre"
                        className="m-2 ml-3 h-12 rounded-lg bg-gray-700 text-white w-full pl-4"
                        name="nombre"
                        value={values.nombre}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                    {errors.nombre && touched.nombre && (
                      <div className="text-red-500 justify-center text-center">
                        {errors.nombre}
                      </div>
                    )}

                    <div
                      className={`flex m-4 items-center ${
                        errors.barrio ? "mb-0" : "mb-4"
                      }`}
                    >
                      <input
                        type="text"
                        className="m-2 h-12 ml-3 rounded-lg bg-gray-700 text-white w-full pl-4"
                        placeholder="Barrio"
                        name="barrio"
                        value={values.barrio}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.barrio && touched.barrio && (
                      <div className="text-red-500 justify-center text-center">
                        {errors.barrio}
                      </div>
                    )}

                    <div
                      className={`flex m-4 items-center ${
                        errors.direccion ? "mb-0" : "mb-4"
                      }`}
                    >
                      <input
                        type="text"
                        className="m-2 h-12 ml-3 rounded-lg bg-gray-700 text-white w-full pl-4"
                        placeholder="Direccion"
                        name="direccion"
                        value={values.direccion}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.direccion && touched.direccion && (
                      <div className="text-red-500 justify-center text-center">
                        {errors.direccion}
                      </div>
                    )}

                    <div className="flex justify-center space-x-4 m-5 ">
                      <button
                        type="submit"
                        className="bg-yellow-600 py-2 px-4 rounded-lg hover:bg-yellow-700 text-white flex items-center"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Cargando..."
                        ) : (
                          <div className="flex items-center">
                            <MdSaveAlt className="w-6 mr-2" />
                            <span className="">Guardar</span>
                          </div>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditarAviso(false)}
                        className="bg-red-600 py-2 px-4 rounded-lg hover:bg-red-800 text-white flex items-center"
                      >
                        <IoClose className="w-6 mr-2" />
                        <span className="">Cancelar</span>
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default SectorPage;
