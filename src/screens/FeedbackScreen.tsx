import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  TextField,
  Rating,
  Alert,
  AppBar,
  Toolbar,
  IconButton,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { ArrowBack, Star } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { reservationService } from "../services/reservationService";
import { feedbackService } from "../services/feedbackService";

export default function FeedbackScreen() {
  const navigate = useNavigate();
  const { reservationId } = useParams<{ reservationId: string }>();
  const [reservation, setReservation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (reservationId) {
      loadReservation(parseInt(reservationId));
    }
  }, [reservationId]);

  const loadReservation = async (id: number) => {
    try {
      setLoading(true);
      const reservationData = await reservationService.getReservationById(id);
      setReservation(reservationData);
      setError(null);
    } catch (err) {
      console.error("Error loading reservation:", err);
      setError("Error al cargar la reserva");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFeedback = async () => {
    if (!reservation || rating === 0) return;

    setSubmitting(true);
    try {
      await feedbackService.submitFeedback({
        reservationId: reservation.id,
        userId: reservation.userId,
        spaceId: reservation.spaceId,
        rating,
        comment: comment.trim(),
      });

      setSuccess(true);
      setTimeout(() => {
        navigate("/my-reservations");
      }, 2000);
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setError("Error al enviar la calificación");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !reservation) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
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
            onClick={() => navigate("/my-reservations")}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Calificar Experiencia
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        {reservation && (
          <>
            {/* Información de la reserva */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Reserva #{reservation.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(reservation.date)} • {reservation.startTime} -{" "}
                  {reservation.endTime}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duración: {reservation.duration} hora
                  {reservation.duration > 1 ? "s" : ""}
                </Typography>
              </CardContent>
            </Card>

            {/* Formulario de feedback */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ¿Cómo fue tu experiencia?
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography component="legend" sx={{ mb: 2 }}>
                    Califica tu experiencia:
                  </Typography>
                  <Rating
                    name="rating"
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue || 0);
                    }}
                    size="large"
                    precision={1}
                    emptyIcon={
                      <Star style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />

                  {rating > 0 && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {rating === 1 && "Muy malo"}
                      {rating === 2 && "Malo"}
                      {rating === 3 && "Regular"}
                      {rating === 4 && "Bueno"}
                      {rating === 5 && "Excelente"}
                    </Typography>
                  )}
                </Box>

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Cuéntanos más sobre tu experiencia (opcional)"
                  placeholder="¿Qué te gustó? ¿Qué se podría mejorar?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  sx={{ mb: 3 }}
                />

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleSubmitFeedback}
                  disabled={rating === 0 || submitting}
                  sx={{ py: 2 }}
                >
                  {submitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Enviar calificación"
                  )}
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        <Snackbar
          open={success}
          autoHideDuration={2000}
          message="¡Gracias por tu feedback!"
        />
      </Container>
    </>
  );
}
