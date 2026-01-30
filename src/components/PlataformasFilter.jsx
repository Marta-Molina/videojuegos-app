import React from "react";

const PlataformasFilter = ({ plataformas, selectedPlataformas, setSelectedPlataformas }) => {
  const togglePlataforma = (nombre) => {
    if (selectedPlataformas.includes(nombre)) {
      setSelectedPlataformas(selectedPlataformas.filter(p => p !== nombre));
    } else {
      setSelectedPlataformas([...selectedPlataformas, nombre]);
    }
  };

  return (
    <div className="filtro-plataformas">
      {plataformas.map(plat => (
        <label key={plat.id}>
          <input
            type="checkbox"
            checked={selectedPlataformas.includes(plat.nombre)}
            onChange={() => togglePlataforma(plat.nombre)}
          />
          {plat.nombre}
        </label>
      ))}
    </div>
  );
};

export default PlataformasFilter;
