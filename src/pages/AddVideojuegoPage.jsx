import React, { useState, useEffect } from "react";
import { createVideojuego, getCategorias, getPlataformas } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  OutlinedInput,
  InputAdornment
} from '@mui/material';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

const AddVideojuegoPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    fechaLanzamiento: "",
    compania: "",
    plataformas: [],
    categorias: [],
    precio: 0,
    imagen: "",
    video: ""
  });
  const [categorias, setCategorias] = useState([]);
  const [plataformas, setPlataformas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [cats, plats] = await Promise.all([getCategorias(), getPlataformas()]);
        setCategorias(cats);
        setPlataformas(plats);
      } catch (err) {
        console.error("Error loading categories/platforms", err);
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setForm((f) => ({
      ...f,
      [name]: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Validar campos básicos
      if (form.plataformas.length === 0 || form.categorias.length === 0) {
        throw new Error("Selecciona al menos una categoría y una plataforma.");
      }

      await createVideojuego({
        ...form,
        precio: parseFloat(form.precio),
        userId: user?.id // Asociar con el usuario actual
      });
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || err.message || "Error creando videojuego");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <VideogameAssetIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Añadir Nuevo Videojuego
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{String(error)}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Fila 1 */}
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Nombre del Juego"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Compañía / Desarrollador"
                name="compania"
                value={form.compania}
                onChange={handleChange}
              />
            </Grid>

            {/* Fila 2 - Descripción */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Descripción"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
              />
            </Grid>

            {/* Fila 3 */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fecha de Lanzamiento"
                type="date"
                name="fechaLanzamiento"
                value={form.fechaLanzamiento}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Precio"
                type="number"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>

            {/* Fila 4 - Multimedia */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="URL de Imagen"
                name="imagen"
                value={form.imagen}
                placeholder="https://ejemplo.com/imagen.jpg"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="URL de Video (Youtube/Trailer)"
                name="video"
                value={form.video}
                placeholder="https://youtube.com/..."
                onChange={handleChange}
              />
            </Grid>

            {/* Fila 5 - Selectores Múltiples */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="categorias-label">Categorías</InputLabel>
                <Select
                  labelId="categorias-label"
                  multiple
                  name="categorias"
                  value={form.categorias}
                  onChange={handleSelectChange}
                  input={<OutlinedInput label="Categorías" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={categorias.find(c => c.id === value)?.nombre || value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {categorias.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="plataformas-label">Plataformas</InputLabel>
                <Select
                  labelId="plataformas-label"
                  multiple
                  name="plataformas"
                  value={form.plataformas}
                  onChange={handleSelectChange}
                  input={<OutlinedInput label="Plataformas" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={plataformas.find(p => p.id === value)?.nombre || value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {plataformas.map((plat) => (
                    <MenuItem key={plat.id} value={plat.id}>
                      {plat.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 6, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate("/")}
              disabled={loading}
              sx={{ px: 4 }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ px: 6 }}
            >
              {loading ? "Creando..." : "Crear Videojuego"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddVideojuegoPage;
