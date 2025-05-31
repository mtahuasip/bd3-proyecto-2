"use client";
import React, { useEffect, useState } from "react";
import "../estilos/comentarios.css";
import { getMovieBySlug } from "@/services/movies"; // ajusta el path si es necesario

export default function Comentarios({ slug }) {
  const [pelicula, setPelicula] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const data = await getMovieBySlug(slug);
        console.log("Película recibida:", data);
        setPelicula(data);
      } catch (err) {
        console.error("Error al obtener película:", err);
        setError("Película no encontrada");
      }
    };

    fetchData();
  }, [slug]);

  if (error) return <p>{error}</p>;
  if (!pelicula) return <p>Cargando...</p>;

  return (
    <div className="comentarios">
      <div className="comentario">
        <p>Caja de Comentarios {pelicula.titulo}</p>
      </div>
      <div className="varioscomen">
        <p>¡Obra maestra del cine!</p>
        <p>------------------------------</p>
      </div>
    </div>
  );
}
