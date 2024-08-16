import React from "react";
import Slider from "react-slick";
import { FaEye, FaTrash } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./EventCarousel.css";

// Componente de tarjeta de evento
const EventCard = ({ id, title, date, deleteEvent }) => (
  <div className="border border-blue-500 rounded-lg p-4 flex flex-col justify-between mx-2" style={{ height: "150px" }}>
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

// Componente de carrusel de eventos
const EventoCarousel = ({ title, events, deleteEvent }) => {
  // Configuración del carrusel
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    nextArrow: <div className="slick-arrow slick-nex">Siguiente</div>,
    prevArrow: <div className="slick-arrow slick-prev">Siguiente</div>,
  };
  

  return (
    <div className="my-8 carousel-container">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <Slider {...settings}>
        {events.map((event, index) => (
          <EventCard
            key={index}
            id={event._id}
            title={event.nombre_curso}
            date={event.fecha}
            deleteEvent={deleteEvent}
          />
        ))}
      </Slider>
    </div>
  );
};

export default EventoCarousel;
