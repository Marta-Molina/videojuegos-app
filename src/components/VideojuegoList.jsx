import React from "react";
import { Grid } from '@mui/material';
import VideojuegoCard from "./VideojuegoCard";

const VideojuegoList = ({ videojuegos, onSelect }) => {
  return (
    <Grid container spacing={4}>
      {videojuegos.map(juego => (
        <Grid item key={juego.id} xs={12} sm={6} md={4} lg={3}>
          <VideojuegoCard juego={juego} onClick={onSelect} />
        </Grid>
      ))}
    </Grid>
  );
};

export default VideojuegoList;
