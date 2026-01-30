import React, { useState, useEffect } from "react";
import { createVideojuego, getCategorias, getPlataformas } from "../services/api";
import { useNavigate } from "react-router-dom";

const AddVideojuego = () => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    fechaLanzamiento: "",
    compania: "",
    plataformas: [],
    categorias: [],
    precio: 0,
    imagen: ""
  });
  const [categorias, setCategorias] = useState([]);
  const [plataformas, setPlataformas] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const cats = await getCategorias();
      const plats = await getPlataformas();
      setCategorias(cats);
      setPlataformas(plats);
    };
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleMulti = (e, key) => {
    const val = Array.from(e.target.selectedOptions).map((o) => Number(o.value));
    setForm((f) => ({ ...f, [key]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVideojuego(form);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || err.message || "Error creando videojuego");
    }
  };

  return (
    <div className="add-video-page">
      <h2>Añadir videojuego</h2>
      <form onSubmit={handleSubmit} className="add-video-form">
        <label>
          Nombre
          <input name="nombre" value={form.nombre} onChange={handleChange} required />
        </label>
        <label>
          Descripción
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} />
        </label>
        <label>
          Fecha de lanzamiento
          <input type="date" name="fechaLanzamiento" value={form.fechaLanzamiento} onChange={handleChange} />
        </label>
        <label>
          Compañía
          <input name="compania" value={form.compania} onChange={handleChange} />
        </label>
        <label>
          Categorías (ctrl/shift para seleccionar varias)
          <select multiple name="categorias" onChange={(e) => handleMulti(e, "categorias")}>
            {categorias.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </label>
        <label>
          Plataformas (ctrl/shift para seleccionar varias)
          <select multiple name="plataformas" onChange={(e) => handleMulti(e, "plataformas")}>
            {plataformas.map(p => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </label>
        <label>
          Precio
          <input type="number" step="0.01" name="precio" value={form.precio} onChange={handleChange} />
        </label>
        <label>
          Imagen (URL)
          <input name="imagen" value={form.imagen} onChange={handleChange} />
        </label>

        <button type="submit">Crear</button>
        {error && <div className="error">{String(error)}</div>}
      </form>
    </div>
  );
};

export default AddVideojuego;
