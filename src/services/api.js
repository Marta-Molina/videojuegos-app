import axios from "axios";

//Base URL del backend Express con JWT
//Base URL del backend json-server con auth
const API_URL = "http://localhost:5000"; // json-server corre en el puerto 5000

// helper to set auth token globally on axios
export const setAuthToken = (token) => {
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axios.defaults.headers.common["Authorization"];
};

//Traer todos los videojuegos (con paginación)
export const getVideojuegos = async (page = 1, limit = 12) => {
  try {
    const response = await axios.get(`${API_URL}/videojuegos`, {
      params: {
        _page: page,
        _limit: limit
      }
    });
    // json-server devuelve el total en el header X-Total-Count
    const totalCount = parseInt(response.headers["x-total-count"] || 0);
    return {
      data: response.data,
      total: totalCount
    };
  } catch (error) {
    console.error("Error al obtener videojuegos:", error);
    return { data: [], total: 0 };
  }
};

//Traer todas las categorías
export const getCategorias = async () => {
  try {
    const response = await axios.get(`${API_URL}/categorias`);
    const data = response.data;
    if (!Array.isArray(data)) return [];
    //Si el backend devuelve un array de strings, convertir a objetos {id, nombre}
    if (data.length > 0 && typeof data[0] === "string") {
      return data.map((nombre, index) => ({ id: index + 1, nombre }));
    }
    //Si ya vienen como objetos {id, nombre}, devolver tal cual
    return data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
};

//Traer todas las plataformas
export const getPlataformas = async () => {
  try {
    const response = await axios.get(`${API_URL}/plataformas`);
    const data = response.data;
    if (!Array.isArray(data)) return [];
    //Si el backend devuelve un array de strings, convertir a objetos {id, nombre}
    if (data.length > 0 && typeof data[0] === "string") {
      return data.map((nombre, index) => ({ id: index + 1, nombre }));
    }
    //Si ya vienen como objetos {id, nombre}, devolver tal cual
    return data;
  } catch (error) {
    console.error("Error al obtener plataformas:", error);
    return [];
  }
};

//Eliminar un videojuego por ID
export const deleteVideojuego = async (id) => {
  try {
    await axios.delete(`${API_URL}/videojuegos/${id}`);
  } catch (error) {
    console.error(`Error al eliminar videojuego ${id}:`, error);
    throw error;
  }
};

// Auth: register and login (json-server-auth uses /register and /login)
export const registerUser = async (user) => {
  try {
    const res = await axios.post(`${API_URL}/register`, user);
    return res.data; // { accessToken, user }
  } catch (error) {
    console.error("Error en register:", error?.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const res = await axios.post(`${API_URL}/login`, credentials);
    return res.data; // { accessToken, user }
  } catch (error) {
    console.error("Error en login:", error?.response?.data || error.message);
    throw error;
  }
};

// Crear videojuego autenticado
export const createVideojuego = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/videojuegos`, data);
    return res.data;
  } catch (error) {
    console.error("Error al crear videojuego:", error?.response?.data || error.message);
    throw error;
  }
};
