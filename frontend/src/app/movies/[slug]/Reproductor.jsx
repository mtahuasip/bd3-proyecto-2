"use client";
import React, { useEffect, useState } from "react";
import "../estilos/reproductor.css";
import { getMovieBySlug } from "@/services/movies"; // ajusta el path si es necesario

export default function Reproductor({ slug }) {
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
    <div className="video">
      <div className="pelicula">
        <iframe
          src={pelicula.url}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
