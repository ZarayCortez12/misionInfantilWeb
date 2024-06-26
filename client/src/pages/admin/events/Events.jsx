import React, { useEffect, useState } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const EventCard = ({ title, date }) => (
  <div className="border border-blue-500 rounded-lg p-4 flex flex-col justify-between">
    <h2 className="text-lg font-bold">{title}</h2>
    <p className="text-sm">Fecha Creación: {new Date(date).toLocaleDateString()}</p>
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

const EventCarousel = ({ title, events }) => (
  <div className="my-8">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <div className="flex items-center space-x-4 justify-center">
      <button className="text-3xl">&lt;</button>
      <div className="flex space-x-4 overflow-x-auto">
        {events.map((event, index) => (
          <EventCard key={index} title={event.nombre} date={event.fecha} />
        ))}
      </div>
      <button className="text-3xl">&gt;</button>
    </div>
  </div>
);

const Events = () => {
  const [eventosPasados, setEventosPasados] = useState([]);
  const [eventosProximos, setEventosProximos] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/eventos');
        const events = response.data;
        console.log(events)
        console.log(events[0].fecha)
        // Separar eventos pasados y próximos según la fecha actual
        const currentDate = new Date();
        const pastEvents = events.filter(event => new Date(event.fecha) < currentDate);
        const upcomingEvents = events.filter(event => new Date(event.fecha) >= currentDate);
        
        setEventosPasados(pastEvents);
        setEventosProximos(upcomingEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold text-center mb-8">Eventos Registrados</h1>
      <EventCarousel title="Eventos Pasados" events={eventosPasados} />
      <EventCarousel title="Eventos Próximos" events={eventosProximos} />
    </div>
  );
};

export default Events;
