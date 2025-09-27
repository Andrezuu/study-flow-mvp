import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Chip,
  Grid,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import { ArrowBack, LocationOn, AccessTime } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { reservationService } from "../services/reservationService";

export default function MyReservationsScreen() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      setLoading(true);
      const userReservations = await reservationService.getUserReservations(1); // Usuario hardcodeado
      setReservations(userReservations);
      setError(null);
    } catch (err) {
      console.error("Error loading reservations:", err);
      setError("Error al cargar las reservas");
    } finally {
      setLoading(false);
    }
  };

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
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      case "completed":
        return "info";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmada";
      case "pending":
        return "Pendiente";
      case "cancelled":
        return "Cancelada";
      case "completed":
        return "Completada";
      default:
        return status;
    }
  };

  const filterReservations = () => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];

    if (tabValue === 0) {
      // Próximas reservas
      return reservations.filter(
        (r) =>
          (r.date > today ||
            (r.date === today && r.endTime > now.toTimeString().slice(0, 5))) &&
          (r.status === "confirmed" || r.status === "pending")
      );
    } else {
      // Historial
      return reservations.filter(
        (r) =>
          r.date < today ||
          (r.date === today && r.endTime <= now.toTimeString().slice(0, 5)) ||
          r.status === "cancelled" ||
          r.status === "completed"
      );
    }
  };

  const handleFeedback = (reservationId: number) => {
    navigate(`/feedback/${reservationId}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const filteredReservations = filterReservations();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate("/")}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mis Reservas
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
          >
            <Tab label="Próximas" />
            <Tab label="Historial" />
          </Tabs>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {filteredReservations.length === 0 && !loading && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {tabValue === 0
                ? "No tienes reservas próximas"
                : "No hay reservas en el historial"}
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/")}
              sx={{ mt: 2 }}
            >
              Buscar espacios
            </Button>
          </Box>
        )}

        <Grid container spacing={3}>
          {filteredReservations.map((reservation) => (
            <Grid size={{ xs: 12, md: 6 }} key={reservation.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">
                      Reserva #{reservation.id}
                    </Typography>
                    <Chip
                      label={getStatusText(reservation.status)}
                      color={getStatusColor(reservation.status)}
                      size="small"
                    />
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <AccessTime
                      sx={{ fontSize: 16, mr: 1, color: "text.secondary" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(reservation.date)} • {reservation.startTime} -{" "}
                      {reservation.endTime}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Duración: {reservation.duration} hora
                    {reservation.duration > 1 ? "s" : ""}
                  </Typography>

                  <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    {formatPrice(reservation.totalPrice)}
                  </Typography>

                  {reservation.status === "completed" && tabValue === 1 && (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleFeedback(reservation.id)}
                      sx={{ mt: 1 }}
                    >
                      Calificar experiencia
                    </Button>
                  )}

                  {reservation.status === "pending" && (
                    <Alert severity="info" sx={{ mt: 1 }}>
                      <Typography variant="body2">
                        Pendiente de pago en efectivo
                      </Typography>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
