import React, { useState, useEffect } from "react";
import VideojuegoList from "../components/VideojuegoList";
import VideojuegoDetalle from "../components/VideojuegoDetalle";
import CategoriasFilter from "../components/CategoriasFilter";
import PlataformasFilter from "../components/PlataformasFilter";
import Buscador from "../components/Buscador";
import { getVideojuegos, getCategorias, getPlataformas } from "../services/api";
import Loading from "../components/Loading";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  useTheme
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';

const MainPage = () => {
  const theme = useTheme();
  const [videojuegos, setVideojuegos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [plataformas, setPlataformas] = useState([]);
  const [selectedCategorias, setSelectedCategorias] = useState([]);
  const [selectedPlataformas, setSelectedPlataformas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [sortOption, setSortOption] = useState("relevance");
  const [videojuegoSeleccionado, setVideojuegoSeleccionado] = useState(null);
  const [loading, setLoading] = useState(false);

  // carrusel images (single for hero now, simplified)
  const heroImage = "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [juegos, cats, plats] = await Promise.all([
          getVideojuegos(),
          getCategorias(),
          getPlataformas()
        ]);

        const sortedCats = [...cats].sort((a, b) => a.nombre.localeCompare(b.nombre));
        const sortedPlats = [...plats].sort((a, b) => a.nombre.localeCompare(b.nombre));

        const catMap = Object.fromEntries(sortedCats.map(c => [c.id, c.nombre]));
        const platMap = Object.fromEntries(sortedPlats.map(p => [p.id, p.nombre]));

        const enrichedJuegos = juegos.map(j => ({
          ...j,
          categoriasNombres: (j.categorias || []).map(id => catMap[id]).filter(Boolean),
          plataformasNombres: (j.plataformas || []).map(id => platMap[id]).filter(Boolean)
        }));

        setVideojuegos(enrichedJuegos);
        setCategorias(sortedCats);
        setPlataformas(sortedPlats);

        setSelectedCategorias(sortedCats.map(c => c.nombre));
        setSelectedPlataformas(sortedPlats.map(p => p.nombre));
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const videojuegosFiltrados = videojuegos.filter(juego => {
    const nombresCats = juego.categoriasNombres || [];
    const nombresPlats = juego.plataformasNombres || [];

    const allCatsSelected = selectedCategorias.length === categorias.length;
    const allPlatsSelected = selectedPlataformas.length === plataformas.length;

    const enCategoria = allCatsSelected || nombresCats.some(cat => selectedCategorias.includes(cat));
    const enPlataforma = allPlatsSelected || nombresPlats.some(plat => selectedPlataformas.includes(plat));
    const enBusqueda = juego.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (juego.descripcion || "").toLowerCase().includes(busqueda.toLowerCase());

    return enCategoria && enPlataforma && enBusqueda;
  });

  const busquedaTrim = busqueda.trim().toLowerCase();
  const resultadosBusqueda = videojuegosFiltrados.filter(j => {
    if (busquedaTrim.length === 0) return true;
    return (j.nombre || "").toLowerCase().startsWith(busquedaTrim);
  });

  const sortedResultados = (() => {
    const list = [...resultadosBusqueda];
    switch (sortOption) {
      case "price-asc": return list.sort((a, b) => (a.precio || 0) - (b.precio || 0));
      case "price-desc": return list.sort((a, b) => (b.precio || 0) - (a.precio || 0));
      case "alpha-asc": return list.sort((a, b) => (a.nombre || "").localeCompare(b.nombre || ""));
      case "alpha-desc": return list.sort((a, b) => (b.nombre || "").localeCompare(a.nombre || ""));
      case "newest": return list.sort((a, b) => new Date(b.fechaLanzamiento) - new Date(a.fechaLanzamiento));
      case "oldest": return list.sort((a, b) => new Date(a.fechaLanzamiento) - new Date(b.fechaLanzamiento));
      default: return list;
    }
  })();

  const handleDeleted = (id) => {
    setVideojuegos(prev => prev.filter(j => j.id !== id));
    setVideojuegoSeleccionado(null);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: '400px',
          width: '100%',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: 'white',
          textAlign: 'center',
          mb: 6
        }}
      >
        <Typography variant="h2" component="h1" sx={{ fontWeight: 900, mb: 2, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          LEVEL UP YOUR GAME!
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.9, letterSpacing: 2 }}>
          Descubre los mejores títulos aquí
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {/* Sidebar Filters */}
          <Grid item xs={12} md={3}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', position: 'sticky', top: 100 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FilterListIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Filtros</Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Categorías</Typography>
                <CategoriasFilter
                  categorias={categorias}
                  selectedCategorias={selectedCategorias}
                  setSelectedCategorias={setSelectedCategorias}
                />
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Plataformas</Typography>
                <PlataformasFilter
                  plataformas={plataformas}
                  selectedPlataformas={selectedPlataformas}
                  setSelectedPlataformas={setSelectedPlataformas}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 4 }}>
              <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Explorar Juegos ({sortedResultados.length})
                </Typography>

                <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
                  <InputLabel id="sort-select-label">Ordenar por</InputLabel>
                  <Select
                    labelId="sort-select-label"
                    id="sort-select"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    label="Ordenar por"
                    startAdornment={<SortIcon sx={{ mr: 1, color: 'action.active' }} />}
                  >
                    <MenuItem value="relevance">Relevancia</MenuItem>
                    <MenuItem value="price-asc">Precio: menor a mayor</MenuItem>
                    <MenuItem value="price-desc">Precio: mayor a menor</MenuItem>
                    <MenuItem value="alpha-asc">Título: A → Z</MenuItem>
                    <MenuItem value="alpha-desc">Título: Z → A</MenuItem>
                    <MenuItem value="newest">Fecha: más nuevo</MenuItem>
                    <MenuItem value="oldest">Fecha: más antiguo</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {loading ? <Loading message="Cargando catálogo..." /> : (
              <VideojuegoList
                videojuegos={sortedResultados}
                onSelect={setVideojuegoSeleccionado}
              />
            )}

            {!loading && sortedResultados.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No se encontraron videojuegos que coincidan con tu búsqueda.
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>

      <VideojuegoDetalle
        juego={videojuegoSeleccionado}
        onClose={() => setVideojuegoSeleccionado(null)}
        onDeleted={handleDeleted}
      />

      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} GameCatalog - 2ºDAM Desarrollo de Interfaces
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MainPage;
