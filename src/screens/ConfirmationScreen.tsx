import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Alert,
  Chip,
  Divider,
} from "@mui/material";
import { CheckCircle, QrCode, Money, CreditCard } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

interface ConfirmationData {
  reservation: any;
  paymentMethod: string;
  transactionId?: string;
}

export default function ConfirmationScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state as ConfirmationData;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPaymentIcon = () => {
    switch (data?.paymentMethod) {
      case "qr":
        return <QrCode />;
      case "cash":
        return <Money />;
      case "card":
        return <CreditCard />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    if (data?.reservation.status === "confirmed") return "success";
    if (data?.reservation.status === "pending") return "warning";
    return "default";
  };

  if (!data) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">
          Error: No se encontraron datos de confirmación
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <CheckCircle sx={{ fontSize: 80, color: "success.main", mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          {data.reservation.status === "confirmed"
            ? "¡Reserva Confirmada!"
            : "¡Reserva Creada!"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {data.reservation.status === "confirmed"
            ? "Tu pago ha sido procesado exitosamente"
            : "Tu reserva está pendiente de pago"}
        </Typography>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Detalles de la reserva</Typography>
            <Chip
              label={
                data.reservation.status === "confirmed"
                  ? "Confirmada"
                  : "Pendiente"
              }
              color={getStatusColor()}
              variant="filled"
            />
          </Box>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            ID de reserva: #{data.reservation.id}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Fecha y hora
            </Typography>
            <Typography variant="body1">
              {formatDate(data.reservation.date)}
            </Typography>
            <Typography variant="body1">
              {data.reservation.startTime} - {data.reservation.endTime}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Duración
            </Typography>
            <Typography variant="body1">
              {data.reservation.duration} hora
              {data.reservation.duration > 1 ? "s" : ""}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Método de pago
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {getPaymentIcon()}
              <Typography variant="body1" sx={{ ml: 1 }}>
                {data.paymentMethod === "qr" && "Código QR"}
                {data.paymentMethod === "cash" && "Efectivo al llegar"}
                {data.paymentMethod === "card" && "Tarjeta"}
              </Typography>
            </Box>
          </Box>

          {data.transactionId && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                ID de transacción
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                {data.transactionId}
              </Typography>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Total pagado</Typography>
            <Typography variant="h6" color="primary">
              {formatPrice(data.reservation.totalPrice)}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {data.reservation.status === "pending" && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Importante:</strong> Recuerda llevar efectivo para pagar al
            llegar. Tu reserva se confirmará una vez realices el pago.
          </Typography>
        </Alert>
      )}

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => navigate("/my-reservations")}
        >
          Ver mis reservas
        </Button>
        <Button variant="contained" fullWidth onClick={() => navigate("/")}>
          Buscar más espacios
        </Button>
      </Box>
    </Container>
  );
}
