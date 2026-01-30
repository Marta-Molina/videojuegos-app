import React from "react";

const Buscador = ({ busqueda, setBusqueda }) => {
  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Buscar videojuegos..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </div>
  );
};

export default Buscador;
