import React from "react";

const VideojuegoCard = ({ juego, onClick }) => {
  return (
    <div className="videojuego-card" onClick={() => onClick(juego)}>
      <div className="precio-badge">${juego.precio}</div>
      <img src={juego.imagen} alt={juego.nombre} />
      <div className="contenido">
        <h3>{juego.nombre}</h3>
        <p>Plataformas: { (juego.plataformasNombres || []).join(", ") }</p>
        <p>{(juego.descripcion || "").length > 100 ? (juego.descripcion || "").slice(0,100) + "..." : (juego.descripcion || "")}</p>
      </div>
    </div>
  );
};

export default VideojuegoCard;
