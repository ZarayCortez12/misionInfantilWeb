import React, { useState } from "react";
import { FaEye, FaTrash, FaPlus } from "react-icons/fa";
import { useCursos } from "../../../context/CursoContext.jsx";

import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import Modal from "react-modal";
import axios from "axios";
import { useEffect } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MdSaveAlt } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaSignature } from "react-icons/fa6";

Modal.setAppElement("#root"); // Necesario para accesibilidad

const Courses = () => {
  const [showDiv, setShowDiv] = useState(false);
  const [cursosE, setCursos] = useState([]);
  const { getCursos, deleteCurso, createCurso } = useCursos();
  const [showCrearAviso, setShowCrearAviso] = useState(false);
  const [cursoToDelete, setCursoToDelete] = useState(null);

  const [docenteValue, setDocenteValue] = useState("");
  // Función para eliminar un curso
  const handleDeleteCurso = async (cursoId) => {
    try {
      // Lógica para eliminar el curso mediante una solicitud HTTP (usando Axios o Fetch)
      await axios.delete(`http://localhost:4000/api/cursos/${cursoId}`);
      // Actualizar la lista de cursos después de eliminar
      const updatedCursos = cursosE.filter((curso) => curso._id !== cursoId);
      setCursos(updatedCursos);
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
    }
  };
  

  const [docenteSeleccionado, setDocenteSeleccionado] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/cursos");
        const responseD = await axios.get("http://localhost:4000/api/docentes");
        const docentesData = responseD.data.map((item) => ({
          _id: item._id,
          nombre: item.nombre,
          apellido: item.apellido,
        }));
        setDocenteSeleccionado(docentesData);
        const cursos = await Promise.all(
          (response.data = await Promise.all(
            response.data.map(async (item) => {
              const date = new Date(item.createdAt);
              const formattedDate = date.toISOString().split("T")[0]; // Obtener solo la fecha en formato YYYY-MM-DD
              return {
                ...item,
                _id: item._id,
                nombre: item.nombre,
                fecha: formattedDate, // Guardar la fecha formateada
              };
            })
          ))
        );
        setCursos(cursos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .max(50, "El nombre no puede tener más de 50 caracteres")
      .matches(/^[A-Za-z ]+$/, "Solo letras permitidas")
      .required("El nombre es requerido"),
  });

  // Componente para la tarjeta de curso
  const CursoCard = ({ curso }) => (
    <div className="border border-blue-500 rounded-lg p-4 flex flex-col justify-between">
      <div className="flex justify-end space-x-2 mt-2">
        <button className="text-green-500 mr-4">
          <FaEye style={{ fontSize: "24px" }} />
        </button>
        <button
          className="text-red-500"
          onClick={() => {
            setCursoToDelete(curso._id); // Almacenar ID del curso a eliminar
            setShowDiv(true); // Mostrar modal de confirmación
          }}
        >
          <FaTrash style={{ fontSize: "24px" }} />
        </button>
      </div>
      <h2 className="text-lg font-bold">{curso.nombre}</h2>
      <p className="text-sm">Fecha Creación: {curso.fecha}</p>
    </div>
  );

  return (
    <div className="container mx-auto p-16 m-5">
      <h1 className="text-3xl font-bold text-center mb-8">
        Cursos Registrados
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {cursosE.length > 0 ? (
    cursosE.map((curso) => (
      <CursoCard key={curso._id} curso={curso} />
    ))
  ) : (
    <div className="col-span-3 text-center">
      No hay cursos registrados
    </div>
  )}
</div>
      <div className="flex justify-center mt-6">
        <button
          className="bg-yellow-900 py-4 px-6 rounded-lg hover:bg-yellow-500 poppins items-center w-96"
          onClick={() => {
            setShowCrearAviso(true); // Mostrar modal de creacion
          }}
        >
          <div className="flex justify-center text-white carrois-gothicSC">
            <FaPlus className="w-6 mr-2" /> Crear Curso
          </div>
        </button>
      </div>

      {/* Aviso de Eliminacion*/}
      <Modal
        isOpen={showDiv}
        onRequestClose={() => setShowDiv(false)}
        contentLabel="Eliminar Estudiante"
        className="absolute  top-1/4 left-1/2"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div className="absolute bg-blue-900  z-50  rounded-lg flex flex-col justify-center items-center p-6 w-96">
          <div className="mb-8 text-white text-center poppins text-[25px] m-6">
            <h2 className="mb-8 text-white text-center poppins text-[25px] m-6">
              ¿Seguro de eliminar el registro?
            </h2>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              className="bg-green-600 py-2 px-4 rounded-lg hover:bg-green-900 text-white flex items-center"
              onClick={() => {
                // Lógica para eliminar el curso
                handleDeleteCurso(cursoToDelete);
                setShowDiv(false);
              }}
            >
              <FaCheck className="w-6 mr-2" />
              Si, Eliminar
            </button>
            <button
              className="bg-red-600 py-2 px-4 rounded-lg hover:bg-red-900 text-white flex items-center"
              onClick={() => setShowDiv(false)}
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
        <div className=" bg-yellow-800  z-50  rounded-lg flex flex-col justify-center items-center p-6 w-96">
          <div className=" text-white text-center poppins text-[25px] ">
            <h2 className=" text-white text-center poppins text-[25px] m-6">
              INGRESAR CURSO
            </h2>
          </div>

          <Formik
            initialValues={{
              nombre: "",
              docentes: [],
              inscritos: [],
            }}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                values.nombre =
                  values.nombre.charAt(0).toUpperCase() +
                  values.nombre.slice(1);
                await createCurso(values);
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
              setFieldValue,
              touched,
              isSubmitting,
              values,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="justify-center m-2">
                  <div
                    className={`flex m-4 items-center ${
                      errors.nombre ? "mb-0" : "mb-4"
                    }`}
                  >
                    <FaSignature
                      className="text-white "
                      style={{ fontSize: "1.5rem" }}
                    />
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
                      errors.docentes ? "mb-0" : "mb-4"
                    }`}
                  >
                    <FaUser
                      className="text-white "
                      style={{ fontSize: "1.5rem" }}
                    />
                    <select
                      className="m-2 h-12 ml-3 rounded-lg bg-gray-700 text-white w-full pl-4"
                      value={values.docentes}
                      onChange={(e) => {
                        setFieldValue("docentes", [e.target.value]); // Establecer el campo `docentes` como un array con un solo valor
                      }}
                    >
                      <option value="" disabled>
                        Docente
                      </option>
                      {docenteSeleccionado.map((docente) => (
                        <option
                          key={docente._id}
                          value={`${docente.nombre} ${docente.apellido}`}
                        >
                          {docente.nombre} {docente.apellido}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.docentes && touched.docentes && (
                    <div className="text-red-500 justify-center text-center">
                      {errors.docentes}
                    </div>
                  )}

                  <div className="flex justify-center space-x-4 m-5 ">
                    <button
                      type="submit"
                      className="bg-blue-900 py-2 px-4 rounded-lg hover:bg-blue-700 text-white flex items-center"
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
                      className="bg-red-700 py-2 px-4 rounded-lg hover:bg-red-600 text-white flex items-center"
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
  );
};

export default Courses;
