import React from "react";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Box
} from '@mui/material';

const PlataformasFilter = ({ plataformas, selectedPlataformas, setSelectedPlataformas }) => {
  const togglePlataforma = (nombre) => {
    if (selectedPlataformas.includes(nombre)) {
      setSelectedPlataformas(selectedPlataformas.filter(p => p !== nombre));
    } else {
      setSelectedPlataformas([...selectedPlataformas, nombre]);
    }
  };

  return (
    <Box sx={{ mt: 1 }}>
      <FormGroup sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}>
        {plataformas.map(plat => (
          <FormControlLabel
            key={plat.id}
            control={
              <Checkbox
                checked={selectedPlataformas.includes(plat.nombre)}
                onChange={() => togglePlataforma(plat.nombre)}
                size="small"
                color="secondary"
              />
            }
            label={<Typography variant="body2">{plat.nombre}</Typography>}
            sx={{ mr: 2 }}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default PlataformasFilter;
