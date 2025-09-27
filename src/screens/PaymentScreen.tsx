import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  AppBar,
  Toolbar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { ArrowBack, QrCode, Money, CreditCard } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { paymentService } from "../services/paymentService";
import { reservationService } from "../services/reservationService";

interface BookingData {
  spaceId: number;
  userId: number;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalPrice: number;
}

export default function PaymentScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state as BookingData;

  const [paymentMethod, setPaymentMethod] = useState<"qr" | "cash" | "card">(
    "qr"
  );
  const [processing, setProcessing] = useState(false);
  const [qrCode, setQrCode] = useState<string>("");

  React.useEffect(() => {
    if (paymentMethod === "qr" && bookingData) {
      const qr = paymentService.generateQRCode(bookingData.totalPrice);
      setQrCode(qr);
    }
  }, [paymentMethod, bookingData]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);
  };

  const handlePayment = async () => {
    if (!bookingData) return;

    setProcessing(true);
    try {
      // Crear la reserva
      const reservation = await reservationService.createReservation({
        ...bookingData,
        status: paymentMethod === "cash" ? "pending" : "confirmed",
        paymentMethod,
      });

      // Procesar el pago (simulado)
      const paymentResult = await paymentService.processPayment({
        amount: bookingData.totalPrice,
        method: paymentMethod,
        reservationId: reservation.id,
      });

      if (paymentResult.success) {
        navigate("/confirmation", {
          state: {
            reservation,
            paymentMethod,
            transactionId: paymentResult.transactionId,
          },
        });
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    } finally {
      setProcessing(false);
    }
  };

  if (!bookingData) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">
          Error: No se encontraron datos de reserva
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate(`/booking/${bookingData.spaceId}`)}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Método de Pago
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Resumen de la reserva */}
          <Grid size={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Resumen de tu reserva
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {bookingData.date} • {bookingData.startTime} -{" "}
                  {bookingData.endTime}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Duración: {bookingData.duration} hora
                  {bookingData.duration > 1 ? "s" : ""}
                </Typography>
                <Typography variant="h6" color="primary">
                  Total: {formatPrice(bookingData.totalPrice)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Métodos de pago */}
          <Grid size={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Elige tu método de pago
                </Typography>

                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value as "qr" | "cash" | "card")
                  }
                >
                  <FormControlLabel
                    value="qr"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <QrCode sx={{ mr: 1 }} />
                        Pagar con QR (inmediato)
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="cash"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Money sx={{ mr: 1 }} />
                        Pagar en efectivo al llegar
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="card"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CreditCard sx={{ mr: 1 }} />
                        Tarjeta de crédito/débito
                      </Box>
                    }
                  />
                </RadioGroup>

                {/* Mostrar QR si está seleccionado */}
                {paymentMethod === "qr" && qrCode && (
                  <Box sx={{ mt: 3, textAlign: "center" }}>
                    <Typography variant="body2" gutterBottom>
                      Escanea el código QR para pagar:
                    </Typography>
                    <img
                      src={qrCode}
                      alt="QR Code"
                      style={{ maxWidth: "200px", height: "auto" }}
                    />
                  </Box>
                )}

                {/* Información para pago en efectivo */}
                {paymentMethod === "cash" && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Tu reserva quedará pendiente hasta que pagues en efectivo al
                    llegar al espacio.
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Botón de confirmar pago */}
          <Grid size={12}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handlePayment}
              disabled={processing}
              sx={{ py: 2 }}
            >
              {processing ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                `Confirmar ${paymentMethod === "cash" ? "reserva" : "pago"}`
              )}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
