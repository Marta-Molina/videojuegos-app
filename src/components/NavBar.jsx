import React from "react";
import { NavLink as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

const NavBar = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Añadir Juego', path: '/add-videojuego' },
  ];

  if (token) {
    navItems.push({ label: 'Mis Juegos', path: '/mis-juegos' });
  }

  return (
    <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)', bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <VideogameAssetIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'primary.main' }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 0
            }}
          >
            GameCatalog
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {navItems.map((item) => (
                <MenuItem key={item.label} onClick={() => { handleClose(); navigate(item.path); }}>
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <VideogameAssetIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'primary.main' }} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GC
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={RouterLink}
                to={item.path}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            {!token ? (
              <>
                <Button color="inherit" component={RouterLink} to="/login">Login</Button>
                <Button variant="contained" component={RouterLink} to="/register" sx={{ ml: 1 }}>Registro</Button>
              </>
            ) : (
              <>
                <Typography variant="body2" sx={{ mr: 2, display: { xs: 'none', sm: 'block' }, opacity: 0.7 }}>
                  {user?.nombre || user?.email}
                </Typography>
                <Button variant="outlined" color="inherit" onClick={handleLogout} size="small">Cerrar Sesión</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
