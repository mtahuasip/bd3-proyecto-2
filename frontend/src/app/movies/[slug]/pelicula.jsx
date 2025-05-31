import React from "react";
import "../estilos/pelicula.css";
import Reproductor from "./Reproductor.jsx";
import Comentarios from "./Comentarios.jsx";
import Detalle from "./Detalle.jsx";
import Datos from "./Datos.jsx";

export default function Pelicula({ slug }) {
  return (
    <div className="pel">
      <div className="repr">
        <Reproductor slug={slug}></Reproductor>
      </div>
      <div className="deta">
        <Detalle slug={slug}></Detalle>
      </div>
      <div className="dat">
        <Datos slug={slug}></Datos>
      </div>
      <div className="comen">
        <Comentarios slug={slug}></Comentarios>
      </div>
    </div>
  );
}
