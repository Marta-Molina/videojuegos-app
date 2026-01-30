import axios from "axios";

//Base URL de json-server
const API_URL = "http://localhost:5000"; //json-server corre en el puerto 5000

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
