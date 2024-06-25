import React from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';

const EventCard = ({ title, date }) => (
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

const EventCarousel = ({ title, events }) => (
  <div className="my-8">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <div className="flex items-center space-x-4 justify-center">
      <button className="text-3xl">&lt;</button>
      <div className="flex space-x-4 overflow-x-auto">
        {events.map((event, index) => (
          <EventCard key={index} title={event.title} date={event.date} />
        ))}
      </div>
      <button className="text-3xl">&gt;</button>
    </div>
  </div>
);

const Events = () => {
  const eventosPasados = [
    { title: 'Palabra De Dios', date: '14/02/2024' },
    { title: 'Aprendamos de DIos', date: '25/04/2024' },
    { title: 'Manos Sagradas', date: '18/05/2024' },
    { title: 'Gozos de Dios', date: '16/06/2024' },
  ];

  const eventosProximos = [
    { title: 'Caminemos de la Mano', date: '11/12/2024' },
    { title: 'Pacto De Dios', date: '09/10/2024' },
    { title: 'Fuerza Externa', date: '15/09/2024' },
    { title: 'Palabra Activgua', date: '11/08/2024' },
  ];

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold text-center mb-8">Eventos Registrados</h1>
      <EventCarousel title="Eventos Pasados" events={eventosPasados} />
      <EventCarousel title="Eventos Próximos" events={eventosProximos} />
    </div>
  );
};

export default Events;




