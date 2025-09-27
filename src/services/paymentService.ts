export const paymentService = {
  // Procesar pago (simulado)
  processPayment: async (paymentData: any) => {
    // Simular procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (paymentData.method === "qr") {
      return {
        success: true,
        transactionId: `QR_${Date.now()}`,
      };
    }

    return { success: true };
  },

  // Generar QR para pago (simulado)
  generateQRCode: (amount: number): string => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PAY_${amount}_${Date.now()}`;
  },
};
