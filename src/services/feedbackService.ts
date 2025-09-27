import { mockFeedback } from "../data/mock";

// Simular almacenamiento local
let feedback = [...mockFeedback];
let nextId = Math.max(...mockFeedback.map((f) => f.id)) + 1;

export const feedbackService = {
  // Crear feedback
  submitFeedback: async (feedbackData: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newFeedback = {
      ...feedbackData,
      id: nextId++,
      createdAt: new Date().toISOString(),
    };

    feedback.push(newFeedback);
    return newFeedback;
  },

  // Obtener feedback de un espacio
  getSpaceFeedback: async (spaceId: number) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return feedback
      .filter((f) => f.spaceId === spaceId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  },
};
