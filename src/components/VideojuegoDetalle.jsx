import React from "react";
import { deleteVideojuego } from "../services/api";

const VideojuegoDetalle = ({ juego, onClose, onDeleted }) => {
  const handleDelete = async () => {
    try {
      await deleteVideojuego(juego.id);
      onDeleted(juego.id);
      onClose();
    } catch (error) {
      console.error("Error al eliminar el videojuego:", error);
    }
  };

  return (
    <div className="videojuego-detalle">
      <div className="contenido">
        <button className="cerrar" onClick={onClose}>Cerrar</button>
        <h2>{juego.nombre}</h2>
        <img src={juego.imagen} alt={juego.nombre} />
        <p>{juego.descripcion}</p>
        <p>Fecha de lanzamiento: {juego.fechaLanzamiento}</p>
        <p>Compañía: {juego.compania}</p>
        <p>Plataformas: {juego.plataformasNombres.join(", ")}</p>
        <p>Categorías: {juego.categoriasNombres.join(", ")}</p>
        <p>Precio: ${juego.precio}</p>
        <p>
          Video: <a href={juego.video} target="_blank" rel="noopener noreferrer">Ver</a>
        </p>
        <button className="eliminar" onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
};

export default VideojuegoDetalle;
