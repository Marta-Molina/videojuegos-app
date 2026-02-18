import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  CardActionArea,
  useTheme
} from '@mui/material';

const VideojuegoCard = ({ juego, onClick }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.shadows[10],
        },
        position: 'relative'
      }}
    >
      <CardActionArea onClick={() => onClick && onClick(juego)} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="220"
            image={juego.imagen}
            alt={juego.nombre}
            sx={{ objectFit: 'cover' }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              bgcolor: 'primary.main',
              color: 'white',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontWeight: 'bold',
              boxShadow: 2
            }}
          >
            ${juego.precio}
          </Box>
        </Box>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            {juego.nombre}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
            {(juego.plataformasNombres || []).slice(0, 3).map((plat, idx) => (
              <Chip key={idx} label={plat} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
            ))}
            {(juego.plataformasNombres || []).length > 3 && (
              <Chip label={`+${(juego.plataformasNombres || []).length - 3}`} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
            )}
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {juego.descripcion || "Sin descripción disponible."}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default VideojuegoCard;
