import React, { useState, useEffect } from "react";
import { createVideojuego, getCategorias, getPlataformas } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./AddVideojuego.css";

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
        <div className="form-grid">
          <div className="form-field">
            <label className="label-text">Nombre</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} required />
          </div>

          <div className="form-field">
            <label className="label-text">Compañía</label>
            <input name="compania" value={form.compania} onChange={handleChange} />
          </div>

          <div className="form-field full-width">
            <label className="label-text">Descripción</label>
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label className="label-text">Fecha de lanzamiento</label>
            <input type="date" name="fechaLanzamiento" value={form.fechaLanzamiento} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label className="label-text">Precio</label>
            <input type="number" step="0.01" name="precio" value={form.precio} onChange={handleChange} />
          </div>

          <div className="form-field full-width">
            <label className="label-text">Imagen (URL)</label>
            <input name="imagen" value={form.imagen} onChange={handleChange} />
          </div>

          <div className="form-field full-width">
            <label className="label-text">Categorías <span className="hint">(ctrl/shift para seleccionar varias)</span></label>
            <select multiple name="categorias" onChange={(e) => handleMulti(e, "categorias")} className="multi-select">
              {categorias.map(c => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>

          <div className="form-field full-width">
            <label className="label-text">Plataformas <span className="hint">(ctrl/shift para seleccionar varias)</span></label>
            <select multiple name="plataformas" onChange={(e) => handleMulti(e, "plataformas")} className="multi-select">
              {plataformas.map(p => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary">Crear</button>
          {error && <div className="error">{String(error)}</div>}
        </div>
      </form>
    </div>
  );
};

export default AddVideojuego;
