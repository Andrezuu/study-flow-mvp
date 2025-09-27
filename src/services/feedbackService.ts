import api from "./api";

export const feedbackService = {
  // Crear feedback
  submitFeedback: async (feedbackData: any) => {
    const newFeedback = {
      ...feedbackData,
      createdAt: new Date().toISOString(),
    };
    const response = await api.post("/feedback", newFeedback);
    return response.data;
  },

  // Obtener feedback de un espacio
  getSpaceFeedback: async (spaceId: number) => {
    const response = await api.get(`/feedback?spaceId=${spaceId}`);
    return response.data;
  },
};
