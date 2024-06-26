import React, { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import axios from "axios";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Modal from "react-modal";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MdSaveAlt } from "react-icons/md";
import { IoClose } from "react-icons/io5";


Modal.setAppElement("#root");

const EventCard = ({ id, title, date, deleteEvent }) => (
  <div className="border border-blue-500 rounded-lg p-4 flex flex-col justify-between">
    <h2 className="text-lg font-bold">{title}</h2>
    <p className="text-sm">
      Fecha Creación: {new Date(date).toLocaleDateString()}
    </p>
    <div className="flex justify-end space-x-2 mt-2">
      <button className="text-green-500">
        <FaEye />
      </button>
      <button className="text-red-500" onClick={() => deleteEvent(id)}>
        <FaTrash />
      </button>
    </div>
  </div>
);

const EventCarousel = ({ title, events, deleteEvent }) => (
  <div className="my-8">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <div className="flex items-center space-x-4 justify-center">
      <button className="text-3xl">&lt;</button>
      <div className="flex space-x-4 overflow-x-auto">
        {events.map((event, index) => (
          <EventCard
            key={index}
            id={event._id}
            title={event.nombre_curso}
            date={event.fecha}
            deleteEvent={deleteEvent}
          />
        ))}
      </div>
      <button className="text-3xl">&gt;</button>
    </div>
  </div>
);

const Events = () => {
  const [eventosPasados, setEventosPasados] = useState([]);
  const [eventosProximos, setEventosProximos] = useState([]);
  const [showCrearAviso, setShowCrearAviso] = useState(false);
  const [sectores, setSectores] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/eventos");
        const events = response.data;
        const currentDate = new Date();
        const pastEvents = events.filter(
          (event) => new Date(event.fecha) < currentDate
        );
        const upcomingEvents = events.filter(
          (event) => new Date(event.fecha) >= currentDate
        );

        setEventosPasados(pastEvents);
        setEventosProximos(upcomingEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const fetchSectores = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/sectores");
        setSectores(response.data);
      } catch (error) {
        console.error("Error fetching sectores:", error);
      }
    };

    fetchEvents();
    fetchSectores();
  }, []);

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/eventos/${id}`);
      setEventosPasados((prevEvents) =>
        prevEvents.filter((event) => event._id !== id)
      );
      setEventosProximos((prevEvents) =>
        prevEvents.filter((event) => event._id !== id)
      );
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const createEvent = async (values) => {
    try {
      console.log("estos son los valores", values);
      await axios.post("http://localhost:4000/api/eventos", values);
      location.reload();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const validationSchema = Yup.object({
    nombre: Yup.string().required("Nombre es requerido"),
    fecha: Yup.date()
      .min(new Date().toISOString().split("T")[0], "La fecha no puede ser anterior a hoy")
      .required("Fecha es requerida"),
    hora: Yup.string().required("Hora es requerida"),
    lugar: Yup.string().required("Lugar es requerido"),
    descripcion: Yup.string().required("Descripción es requerida"),
  });

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold text-center mb-8">
        Eventos Registrados
      </h1>
      <EventCarousel
        title="Eventos Pasados"
        events={eventosPasados}
        deleteEvent={deleteEvent}
      />
      <EventCarousel
        title="Eventos Próximos"
        events={eventosProximos}
        deleteEvent={deleteEvent}
      />
      <div className="flex justify-center mt-6">
        <button
          className="bg-yellow-900 py-4 px-6 rounded-lg hover:bg-yellow-500 items-center w-96"
          onClick={() => setShowCrearAviso(true)}
        >
          <div className="flex justify-center text-white">
            <PlusCircleIcon className="w-6 mr-2" />
            Ingresar Evento
          </div>
        </button>
      </div>
      <Modal
        isOpen={showCrearAviso}
        onRequestClose={() => setShowCrearAviso(false)}
        contentLabel="Crear Evento"
        className="top-50 left-1/2"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div className="bg-yellow-800 rounded-lg flex flex-col justify-center items-center p-6 w-96">
          <h2 className="text-white text-center text-[25px] m-6">
            CREAR EVENTO
          </h2>
          <Formik
            initialValues={{
              nombre: "",
              fecha: "",
              hora: "",
              lugar: "",
              descripcion: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              await createEvent(values);
              resetForm();
              setShowCrearAviso(false);
            }}
          >
            {({
              handleChange,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Nombre"
                    name="nombre"
                    className="m-2 h-12 rounded-lg bg-gray-700 text-white w-full pl-4"
                    onChange={handleChange}
                  />
                  {errors.nombre && touched.nombre && (
                    <div className="text-red-500 text-center">
                      {errors.nombre}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    type="date"
                    name="fecha"
                    className="m-2 h-12 rounded-lg bg-gray-700 text-white w-full pl-4"
                    onChange={handleChange}
                  />
                  {errors.fecha && touched.fecha && (
                    <div className="text-red-500 text-center">
                      {errors.fecha}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    type="time"
                    name="hora"
                    className="m-2 h-12 rounded-lg bg-gray-700 text-white w-full pl-4"
                    onChange={handleChange}
                  />
                  {errors.hora && touched.hora && (
                    <div className="text-red-500 text-center">
                      {errors.hora}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <select
                    name="lugar"
                    className="m-2 h-12 rounded-lg bg-gray-700 text-white w-full pl-4"
                    onChange={handleChange}
                    value={values.lugar}
                  >
                    <option value="" label="Selecciona un lugar" />
                    {sectores.map((sector) => (
                      <option key={sector._id} value={sector.nombre}>
                        {sector.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.lugar && touched.lugar && (
                    <div className="text-red-500 text-center">
                      {errors.lugar}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    className="m-2 h-24 rounded-lg bg-gray-700 text-white w-full pl-4"
                    onChange={handleChange}
                  />
                  {errors.descripcion && touched.descripcion && (
                    <div className="text-red-500 text-center">
                      {errors.descripcion}
                    </div>
                  )}
                </div>
                <div className="flex justify-center space-x-4 m-5">
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
                        <span>Guardar</span>
                      </div>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCrearAviso(false)}
                    className="bg-red-700 py-2 px-4 rounded-lg hover:bg-red-600 text-white flex items-center"
                  >
                    <IoClose className="w-6 mr-2" />
                    <span>Cancelar</span>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
};

export default Events;
