import React, { useEffect, useState } from "react";
import { FaEye, FaTrash, FaSpinner, FaCheck } from "react-icons/fa";
import axios from "axios";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Modal from "react-modal";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MdSaveAlt } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Slider from "react-slick";
import EventoCarousel from "../../components/docente/EventoCarousel.jsx";
import { useEventos } from "../../context/EventoContext.jsx";

Modal.setAppElement("#root");

function EventosDocente() {

    const [events, setEvents] = useState([]);
    const [showCrearAviso, setShowCrearAviso] = useState(false);
    const [showEditarAviso, setShowEditarAviso] = useState(false);
    const [sectores, setSectores] = useState([]);
    const [cursos, setCursos] = useState([]); // Nuevo estado para los cursos
    const [eventosPasados, setEventosPasados] = useState([]);
    const [eventosProximos, setEventosProximos] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [serverError, setServerError] = useState("");
    const [eventToEdit, setEventToEdit] = useState(null);
    const [showEliminarAviso, setShowEliminarAviso] = useState(false);
    const [eventIdToDelete, setEventIdToDelete] = useState(null);
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await axios.get("http://localhost:4000/api/eventos");
          const fetchedEvents = response.data;
          console.log("Eventos obtenidos:", fetchedEvents); // Verifica si los eventos están llegando
  
          setEvents(fetchedEvents);
  
          const today = new Date();
          const pastEvents = fetchedEvents.filter(
            (event) => new Date(event.fecha) < today
          );
          const upcomingEvents = fetchedEvents.filter(
            (event) => new Date(event.fecha) >= today
          );
  
          setEventosPasados(pastEvents);
          setEventosProximos(upcomingEvents);
  
          console.log("Eventos pasados:", pastEvents);
          console.log("Eventos próximos:", upcomingEvents);
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
  
      const fetchCursos = async () => {
        // Nuevo efecto para obtener los cursos
        try {
          const response = await axios.get("http://localhost:4000/api/cursos");
          setCursos(response.data);
        } catch (error) {
          console.error("Error fetching cursos:", error);
        }
      };
  
      fetchEvents();
      fetchSectores();
      fetchCursos(); // Obtener cursos al cargar el componente
    }, []);
  
    const handleDeleteEvent = (id) => {
      setEventIdToDelete(id); // Guardar el ID del evento a eliminar
      setShowEliminarAviso(true); // Mostrar el modal de confirmación
    };
  
    const deleteEvent = async () => {
      try {
        await axios.delete(`http://localhost:4000/api/eventos/${eventIdToDelete}`);
        setEventosPasados((prevEvents) =>
          prevEvents.filter((event) => event._id !== eventIdToDelete)
        );
        setEventosProximos((prevEvents) =>
          prevEvents.filter((event) => event._id !== eventIdToDelete)
        );
        setShowEliminarAviso(false); // Ocultar el modal de confirmación
        setEventIdToDelete(null); // Limpiar el ID del evento
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    };
  
    const updatedEvent = async (id) => {
      const response = await axios.get(`http://localhost:4000/api/eventos/${id}`);
      const event = response.data;
      // Formatear la fecha antes de establecer el estado
      setEventToEdit({
        ...event,
        fecha: formatDateForInput(event.fecha), // Formatear la fecha
      });
      setShowEditarAviso(true);
      console.log("Evento actualizado:", id);
    };
  
    const formatDateForInput = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0]; // Convertir a YYYY-MM-DD
    };
  
    const updateEvent = async (id, event) => {
      try {
        console.log("Datos del evento a actualizar:", event);
        console.log("ID del evento a actualizar:", id);
        const response = await axios.put(
          `http://localhost:4000/api/eventos/${id}`,
          event
        );
        setEvents((prevEvents) =>
          prevEvents.map((e) => (e._id === id ? response.data : e))
        );
        setShowEditarAviso(false);
        setShowSuccessModal("Evento actualizado exitosamente!");
      } catch (error) {
        console.error("Error creating event:", error);
  
        // Mostrar el mensaje de error del backend si está disponible
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setServerError(error.response.data.message);
        } else {
          setServerError(
            "Error al crear el evento. Por favor, verifica los datos ingresados."
          );
        }
      }
    };
  
    const createEvent = async (values) => {
      try {
        if (values.tipoEvento === "curso" && values.idCurso) {
          const selectedCourse = cursos.find(
            (curso) => curso._id === values.idCurso
          );
          if (selectedCourse) {
            values.nombre = `Evento Curso ${selectedCourse.nombre}`;
          }
        }
  
        console.log("Estos son los valores", values);
        const response = await axios.post(
          "http://localhost:4000/api/eventos",
          values
        );
  
        // Mostrar mensaje de éxito si el backend lo proporciona
        setServerError(""); // Limpiar el error en caso de éxito
        setShowSuccessModal(
          response.data.message || "Evento creado exitosamente!"
        ); // Mensaje del backend o predeterminado
      } catch (error) {
        console.error("Error creating event:", error);
  
        // Mostrar el mensaje de error del backend si está disponible
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setServerError(error.response.data.message);
        } else {
          setServerError(
            "Error al crear el evento. Por favor, verifica los datos ingresados."
          );
        }
      }
    };
  
    
  
   
  
    useEffect(() => {
      if (serverError) {
        const timer = setTimeout(() => {
          setServerError(""); // Limpiar el mensaje de error después de 5 segundos
        }, 5000);
        return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
      }
    }, [serverError]);
  
    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="container mx-auto p-4 ">
          <h1 className="text-3xl font-bold text-center mb-8">
            Eventos Registrados
          </h1>
          <EventoCarousel
            title="Eventos Pasados"
            events={eventosPasados}
            deleteEvent={handleDeleteEvent}
            updateEvent={updatedEvent}
          />
    
                  
          {/* Aviso de Eliminacion*/}
          <Modal
              isOpen={showEliminarAviso}
              onRequestClose={() => setShowEliminarAviso(false)}
              contentLabel="Eliminar Sector"
              className="absolute  top-1/4 left-1/2"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div
                className="absolute bg-blue-900 z-50 rounded-lg flex flex-col justify-center items-center p-6 w-96"
                style={{ marginLeft: "-90px", marginTop: "70px" }}
              >
                {" "}
                <div className="mb-8 text-white text-center poppins text-[25px] m-6">
                  <h2 className="mb-8 text-white text-center poppins text-[25px] m-6">
                    ¿Estás seguro que deseas eliminar el evento?
                  </h2>
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    className="bg-green-600 py-2 px-4 rounded-lg hover:bg-green-900 text-white flex items-center"
                    onClick={() => {
                      deleteEvent(eventIdToDelete);
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
    
          
        </div>
      );
} 


export default EventosDocente;