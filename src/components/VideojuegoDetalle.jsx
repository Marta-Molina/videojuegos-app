import React from "react";
import { deleteVideojuego } from "../services/api";
import { useAuth } from "../context/AuthContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';

const VideojuegoDetalle = ({ juego, onClose, onDeleted }) => {
  const { user } = useAuth();

  if (!juego) return null;

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este videojuego?")) {
      try {
        await deleteVideojuego(juego.id);
        if (onDeleted) onDeleted(juego.id);
        onClose();
      } catch (error) {
        console.error("Error al eliminar el videojuego:", error);
      }
    }
  };

  const isOwner = user?.id === juego.userId;

  return (
    <Dialog
      open={!!juego}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: { borderRadius: 3, bgcolor: 'background.paper' }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
          {juego.nombre}
        </Typography>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src={juego.imagen}
              alt={juego.nombre}
              sx={{
                width: '100%',
                borderRadius: 2,
                boxShadow: 3,
                maxHeight: '400px',
                objectFit: 'cover'
              }}
            />
          </Grid>

          <Grid item xs={12} md={7}>
            <Typography variant="h6" gutterBottom color="primary.main" sx={{ fontWeight: 600 }}>
              Descripción
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              {juego.descripcion || "Sin descripción."}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 700 }}>
                Plataformas:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {(juego.plataformasNombres || []).map((plat, idx) => (
                  <Chip key={idx} label={plat} color="secondary" variant="outlined" size="small" />
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 700 }}>
                Categorías:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {(juego.categoriasNombres || []).map((cat, idx) => (
                  <Chip key={idx} label={cat} color="primary" variant="outlined" size="small" />
                ))}
              </Box>
            </Box>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Typography variant="caption" display="block" color="text.secondary">Compañía</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{juego.compania}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" display="block" color="text.secondary">Fecha Lanzamiento</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{juego.fechaLanzamiento}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" display="block" color="text.secondary">Precio</Typography>
                <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>${juego.precio}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
        <Box>
          {juego.video && (
            <Button
              startIcon={<LaunchIcon />}
              href={juego.video}
              target="_blank"
              rel="noopener noreferrer"
              variant="text"
            >
              Ver Video
            </Button>
          )}
        </Box>
        <Box>
          {isOwner && (
            <Button
              startIcon={<DeleteIcon />}
              color="error"
              onClick={handleDelete}
              variant="outlined"
              sx={{ mr: 1 }}
            >
              Eliminar
            </Button>
          )}
          <Button onClick={onClose} variant="contained" sx={{ px: 4 }}>
            Cerrar
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default VideojuegoDetalle;
