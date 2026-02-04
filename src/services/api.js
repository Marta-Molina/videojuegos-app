import axios from "axios";

//Base URL de json-server
const API_URL = "http://localhost:5000"; //json-server corre en el puerto 5000

// helper to set auth token globally on axios
export const setAuthToken = (token) => {
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axios.defaults.headers.common["Authorization"];
};

//Traer todos los videojuegos
export const getVideojuegos = async () => {
  try {
    const response = await axios.get(`${API_URL}/videojuegos`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener videojuegos:", error);
    return [];
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

// Auth: register and login (json-server-auth)
export const registerUser = async (user) => {
  try {
    const res = await axios.post(`${API_URL}/register`, user);
    return res.data;
  } catch (error) {
    console.error("Error en register (trying fallback):", error?.response?.data || error.message);
    // Fallback: if json-server-auth is not present, create a user directly in /users
    if (error?.response?.status === 404) {
      try {
        const res = await axios.post(`${API_URL}/users`, user);
        // return created user object for the caller to handle (no token)
        return { user: res.data };
      } catch (e) {
        console.error("Fallback register failed:", e?.response?.data || e.message);
        throw e;
      }
    }
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const res = await axios.post(`${API_URL}/login`, credentials);
    return res.data; // { accessToken, user }
  } catch (error) {
    console.error("Error en login (trying fallback):", error?.response?.data || error.message);
    // Fallback: if json-server-auth not available, try to find user in /users
    if (error?.response?.status === 404) {
      try {
        const res = await axios.get(`${API_URL}/users`, { params: { email: credentials.email } });
        const users = res.data || [];
        const user = users.find((u) => u.email === credentials.email && u.password === credentials.password);
        if (user) {
          // Return a fake token so the frontend can treat the user as authenticated.
          const fakeToken = `local-${btoa(user.email)}`;
          return { accessToken: fakeToken, user };
        }
        const e = new Error('Invalid credentials');
        e.response = { data: 'Invalid credentials', status: 401 };
        throw e;
      } catch (e) {
        console.error("Fallback login failed:", e?.response?.data || e.message);
        throw e;
      }
    }
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
