import React from "react";
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Buscador = ({ busqueda, setBusqueda }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Buscar videojuegos..."
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
      sx={{ mb: 4, bgcolor: 'background.paper', borderRadius: 2 }}
    />
  );
};

export default Buscador;
