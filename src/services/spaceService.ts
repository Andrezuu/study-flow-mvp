import { mockSpaces } from "../data/mock";

export const spaceService = {
  // Obtener todos los espacios
  getSpaces: async () => {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockSpaces;
  },

  // Obtener un espacio por ID
  getSpaceById: async (id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const space = mockSpaces.find((s) => s.id === id);
    if (!space) {
      throw new Error("Espacio no encontrado");
    }
    return space;
  },

  // Obtener espacios disponibles
  getAvailableSpaces: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockSpaces.filter((space) => space.availability);
  },
};
