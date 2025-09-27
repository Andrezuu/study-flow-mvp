import api from "./api";

export const spaceService = {
  // Obtener todos los espacios
  getSpaces: async () => {
    const response = await api.get("/spaces");
    return response.data;
  },

  // Obtener un espacio por ID
  getSpaceById: async (id: number) => {
    const response = await api.get(`/spaces/${id}`);
    return response.data;
  },

  // Obtener espacios disponibles
  getAvailableSpaces: async () => {
    const response = await api.get("/spaces?availability=true");
    return response.data;
  },
};
