import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getVideojuegos, getCategorias, getPlataformas } from '../services/api';
import VideojuegoList from '../components/VideojuegoList';
import Loading from '../components/Loading';
import {
    Container,
    Typography,
    Box,
    Button,
    Divider,
    Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink } from 'react-router-dom';

const MyGamesPage = () => {
    const { user } = useAuth();
    const [videojuegos, setVideojuegos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [juegos, cats, plats] = await Promise.all([
                    getVideojuegos(),
                    getCategorias(),
                    getPlataformas()
                ]);

                // Mapas id -> nombre
                const catMap = Object.fromEntries(cats.map(c => [c.id, c.nombre]));
                const platMap = Object.fromEntries(plats.map(p => [p.id, p.nombre]));

                // Filtramos por user
                const misJuegos = juegos
                    .filter(j => j.userId === user?.id)
                    .map(j => ({
                        ...j,
                        categoriasNombres: (j.categorias || []).map(id => catMap[id]).filter(Boolean),
                        plataformasNombres: (j.plataformas || []).map(id => platMap[id]).filter(Boolean)
                    }));

                setVideojuegos(misJuegos);
            } catch (error) {
                console.error("Error fetching my games", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    const handleDeleted = (id) => {
        setVideojuegos(prev => prev.filter(j => j.id !== id));
    };

    if (loading) return <Loading />;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                    Mis Videojuegos
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={RouterLink}
                    to="/add-videojuego"
                >
                    Añadir Juego
                </Button>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {videojuegos.length === 0 ? (
                <Paper sx={{ p: 6, textAlign: 'center', bgcolor: 'background.paper' }}>
                    <Typography variant="h6" color="text.secondary">
                        Aún no has añadido ningún videojuego.
                    </Typography>
                    <Button
                        variant="outlined"
                        sx={{ mt: 2 }}
                        component={RouterLink}
                        to="/add-videojuego"
                    >
                        ¡Empieza ahora!
                    </Button>
                </Paper>
            ) : (
                <VideojuegoList
                    videojuegos={videojuegos}
                    onDeleted={handleDeleted}
                />
            )}
        </Container>
    );
};

export default MyGamesPage;
