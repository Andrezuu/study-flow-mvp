import api from "./api";

export const reservationService = {
  // Crear nueva reserva
  createReservation: async (reservationData: any) => {
    const newReservation = {
      ...reservationData,
      createdAt: new Date().toISOString(),
    };
    const response = await api.post("/reservations", newReservation);
    return response.data;
  },

  // Obtener reservas de un usuario
  getUserReservations: async (userId: number) => {
    const response = await api.get(`/reservations?userId=${userId}`);
    return response.data;
  },

  // Obtener reserva por ID
  getReservationById: async (id: number) => {
    const response = await api.get(`/reservations/${id}`);
    return response.data;
  },

  // Actualizar estado de reserva
  updateReservationStatus: async (id: number, status: any) => {
    const response = await api.patch(`/reservations/${id}`, { status });
    return response.data;
  },
};
