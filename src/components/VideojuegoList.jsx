import React from "react";
import VideojuegoCard from "./VideojuegoCard";

const VideojuegoList = ({ videojuegos, onSelect }) => {
  return (
    <div className="videojuego-list">
      {videojuegos.map(juego => (
        <VideojuegoCard key={juego.id} juego={juego} onClick={onSelect} />
      ))}
    </div>
  );
};

export default VideojuegoList;
