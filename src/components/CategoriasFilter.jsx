import React from "react";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Box
} from '@mui/material';

const CategoriasFilter = ({ categorias, selectedCategorias, setSelectedCategorias }) => {
  const toggleCategoria = (nombre) => {
    if (selectedCategorias.includes(nombre)) {
      setSelectedCategorias(selectedCategorias.filter(c => c !== nombre));
    } else {
      setSelectedCategorias([...selectedCategorias, nombre]);
    }
  };

  return (
    <Box sx={{ mt: 1 }}>
      <FormGroup sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}>
        {categorias.map(cat => (
          <FormControlLabel
            key={cat.id}
            control={
              <Checkbox
                checked={selectedCategorias.includes(cat.nombre)}
                onChange={() => toggleCategoria(cat.nombre)}
                size="small"
              />
            }
            label={<Typography variant="body2">{cat.nombre}</Typography>}
            sx={{ mr: 2 }}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default CategoriasFilter;
