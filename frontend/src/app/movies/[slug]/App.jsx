import "../estilos/App.css";
import Pelicula from "./pelicula.jsx";

export default function App({ slug }) {
  return (
    <>
      <div>
        <Pelicula slug={slug}></Pelicula>
      </div>
    </>
  );
}
