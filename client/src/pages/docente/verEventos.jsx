import { ImUserPlus, ImUserCheck } from "react-icons/im";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DetallesEventos() {
  const { id } = useParams(); // Obtiene el ID de la URL
  const [evento, setEvento] = useState(null);
  const [curso, setCurso] = useState(null);
  const [docentes, setDocentes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventoDetalles = async () => {
      try {
        // 1. Obtiene el evento por ID
        const eventoResponse = await axios.get(
          `http://localhost:4000/api/eventos/${id}`
        );
        const eventoData = eventoResponse.data;
        setEvento(eventoData);

        // 2. Busca el curso relacionado al evento
        const cursosResponse = await axios.get(
          `http://localhost:4000/api/cursos`
        );
        const cursoEncontrado = cursosResponse.data.find(
          (curso) =>
            curso.nombre ===
            eventoData.nombre_curso.replace("Evento Curso ", "").trim()
        );
        setCurso(cursoEncontrado);

        if (cursoEncontrado) {
          // 3. Obtiene los nombres y apellidos de los docentes relacionados
          const usuariosResponse = await axios.get(
            `http://localhost:4000/api/usuarios`
          );
          const docentesInfo = cursoEncontrado.docentes.map((docenteId) => {
            const docente = usuariosResponse.data.find(
              (usuario) => usuario._id === docenteId.toString() // Comparación ajustada
            );
            return docente
              ? `${docente.nombre} ${docente.apellido}` // Solo nombre y apellido
              : "Docente desconocido";
          });
          setDocentes(docentesInfo);
        }
      } catch (err) {
        setError(
          "No se pudo cargar la información. Por favor, inténtalo más tarde."
        );
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventoDetalles();
  }, [id]);

  if (isLoading) {
    return <div>Cargando información del evento...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8 mt-9">
        Información sobre el Evento
      </h1>
      <div
        style={{
          background: "#8C6428",
          padding: "60px",
          width: "1200px",
          height: "400px",
          margin: "40px auto",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          opacity: 0.8,
        }}
        
      >
        {/* Información del evento */}
        <div className="text-center flex">
          <h1 className="text-blue-700 font-bold m-4 ml-20 text-2xl">Nombre:  </h1>
          <p className="text-white m-4 text-center text-lg">{evento.nombre_curso}</p>
        </div>

        <div className="flex justify-center gap-8 my-4">
    <div className="mr-20">
      <h1 className="text-blue-700 font-bold text-2xl  mb-2">Docentes a cargo:</h1>
      {docentes.map((docente, index) => (
        <h1 className="text-white text-lg" key={index}>
          {docente}
        </h1>
      ))}
    </div>
    <div className="ml-20">
      <h1 className="text-blue-700 font-bold text-2xl mb-2">El evento se realizara en</h1>
      <p className="text-white text-lg">{evento.sector}</p>
    </div>
  </div>
        
        <div className="text-center flex justify-end">
          <h1 className="text-blue-700 font-bold m-4 text-2xl">Se realizara en el siguiente horario</h1>
          <p className="text-white m-4 text-lg">
            {new Date(evento.fecha).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="text-white m-4 mr-16 text-lg">{evento.hora}</p>
        </div>
      </div>

      {/* Botones */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginTop: "20px",
        }}
      >
        <button
          style={{
            backgroundColor: "#2a4a7b",
            color: "white",
            padding: "15px 30px",
            borderRadius: "10px",
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          <ImUserCheck />
          Registrar asistencia
        </button>

        <button
          style={{
            backgroundColor: "#2a4a7b",
            color: "white",
            padding: "15px 30px",
            borderRadius: "10px",
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          <ImUserPlus />
          Ingresar asistencias
        </button>
      </div>
    </>
  );
}

export default DetallesEventos;
