import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  AppBar,
  Toolbar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { spaceService } from "../services/spaceService";

export default function BookingScreen() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [space, setSpace] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (id) {
      loadSpace(parseInt(id));
    }
  }, [id]);

  useEffect(() => {
    if (space && duration > 0) {
      setTotalPrice(space.pricePerHour * duration);
    }
  }, [space, duration]);

  const loadSpace = async (spaceId: number) => {
    try {
      setLoading(true);
      const spaceData = await spaceService.getSpaceById(spaceId);
      setSpace(spaceData);
      setError(null);
    } catch (err) {
      console.error("Error loading space:", err);
      setError("Error al cargar el espacio");
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

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const getEndTime = () => {
    if (!startTime) return "";
    const [hours, minutes] = startTime.split(":").map(Number);
    const endHour = hours + duration;
    return `${endHour.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const handleContinueToPayment = () => {
    if (!space || !date || !startTime) return;

    const bookingData = {
      spaceId: space.id,
      userId: 1, // Usuario hardcodeado para MVP
      date,
      startTime,
      endTime: getEndTime(),
      duration,
      totalPrice,
    };

    // Pasar datos a través del state de navegación
    navigate("/payment", { state: bookingData });
  };

  const isFormValid = date && startTime && duration > 0;

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !space) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error || "Espacio no encontrado"}</Alert>
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
            onClick={() => navigate(`/space/${space.id}`)}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Reservar: {space.name}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Información del espacio */}
          <Grid size={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {space.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {space.location} • {formatPrice(space.pricePerHour)}/hora
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Formulario de reserva */}
          <Grid size={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Detalles de la reserva
                </Typography>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Fecha"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: getTomorrowDate() }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      type="time"
                      label="Hora de inicio"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Duración (horas)</InputLabel>
                      <Select
                        value={duration}
                        label="Duración (horas)"
                        onChange={(e) => setDuration(e.target.value as number)}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((hours) => (
                          <MenuItem key={hours} value={hours}>
                            {hours} hora{hours > 1 ? "s" : ""}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Hora de fin"
                      value={getEndTime()}
                      InputProps={{ readOnly: true }}
                      disabled
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Resumen de precios */}
          <Grid size={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Resumen
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>
                    {formatPrice(space.pricePerHour)} × {duration} hora
                    {duration > 1 ? "s" : ""}
                  </Typography>
                  <Typography>{formatPrice(totalPrice)}</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pt: 1,
                    borderTop: 1,
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" color="primary">
                    {formatPrice(totalPrice)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Botón de continuar */}
          <Grid size={12}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleContinueToPayment}
              disabled={!isFormValid}
              sx={{ py: 2 }}
            >
              Continuar al pago
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
