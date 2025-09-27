import { mockReservations } from "../data/mock";

// Simular almacenamiento local
let reservations = [...mockReservations];
let nextId = Math.max(...mockReservations.map((r) => r.id)) + 1;

export const reservationService = {
  // Crear nueva reserva
  createReservation: async (reservationData: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newReservation = {
      ...reservationData,
      id: nextId++,
      createdAt: new Date().toISOString(),
    };

    reservations.push(newReservation);
    return newReservation;
  },

  // Obtener reservas de un usuario
  getUserReservations: async (userId: number) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return reservations
      .filter((r) => r.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  // Obtener reserva por ID
  getReservationById: async (id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const reservation = reservations.find((r) => r.id === id);
    if (!reservation) {
      throw new Error("Reserva no encontrada");
    }
    return reservation;
  },

  // Actualizar estado de reserva
  updateReservationStatus: async (id: number, status: any) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const reservation = reservations.find((r) => r.id === id);
    if (!reservation) {
      throw new Error("Reserva no encontrada");
    }
    reservation.status = status;
    return reservation;
  },
};
