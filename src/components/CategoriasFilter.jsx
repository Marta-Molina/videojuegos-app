import React from "react";

const CategoriasFilter = ({ categorias, selectedCategorias, setSelectedCategorias }) => {
  const toggleCategoria = (nombre) => {
    if (selectedCategorias.includes(nombre)) {
      setSelectedCategorias(selectedCategorias.filter(c => c !== nombre));
    } else {
      setSelectedCategorias([...selectedCategorias, nombre]);
    }
  };

  return (
    <div className="filtro-categorias">
      {categorias.map(cat => (
        <label key={cat.id}>
          <input
            type="checkbox"
            checked={selectedCategorias.includes(cat.nombre)}
            onChange={() => toggleCategoria(cat.nombre)}
          />
          {cat.nombre}
        </label>
      ))}
    </div>
  );
};

export default CategoriasFilter;
