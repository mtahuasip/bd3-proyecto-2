"use client";
import React, { useEffect, useState } from "react";
import "../estilos/detalle.css";
import { getMovieBySlug } from "@/services/movies"; // ajusta el path si es necesario

export default function Detalle({ slug }) {
  const [pelicula, setPelicula] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    console.log("Slug recibido en Detalle:", slug);

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
    <div className="banlink">
      <p>{slug}</p>
      <div className="botones">
        <div>like</div>
        <div>favorito</div>
      </div>
      <div className="info">
        <p>Descripcion: </p>
        <p>{pelicula.descripcion}</p>
      </div>
    </div>
  );
}
