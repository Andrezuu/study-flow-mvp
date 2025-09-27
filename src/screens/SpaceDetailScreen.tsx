import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  Chip,
  Rating,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { ArrowBack, LocationOn, People } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { spaceService } from "../services/spaceService";

export default function SpaceDetailScreen() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [space, setSpace] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadSpace(parseInt(id));
    }
  }, [id]);

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

  const handleBooking = () => {
    if (space) {
      navigate(`/booking/${space.id}`);
    }
  };

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
            onClick={() => navigate("/")}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {space.name}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Card>
          <CardMedia
            component="img"
            height="400"
            image={space.imageUrl}
            alt={space.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/800x400?text=Imagen+No+Disponible";
            }}
          />

          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                mb: 2,
              }}
            >
              <Typography variant="h4" component="h1">
                {space.name}
              </Typography>
              <Typography
                variant="h5"
                color="primary"
                sx={{ fontWeight: "bold" }}
              >
                {formatPrice(space.pricePerHour)}/hora
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating value={space.rating} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({space.rating})
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <LocationOn
                sx={{ fontSize: 20, mr: 1, color: "text.secondary" }}
              />
              <Typography variant="body1">{space.location}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <People sx={{ fontSize: 20, mr: 1, color: "text.secondary" }} />
              <Typography variant="body1">
                Capacidad: {space.capacity} persona
                {space.capacity > 1 ? "s" : ""}
              </Typography>
            </Box>

            <Typography variant="body1" paragraph>
              {space.description}
            </Typography>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Servicios incluidos:
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
              {space.amenities.map((amenity: any) => (
                <Chip
                  key={amenity}
                  label={amenity}
                  variant="outlined"
                  color="primary"
                />
              ))}
            </Box>

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleBooking}
              disabled={!space.availability}
              sx={{ py: 2 }}
            >
              {space.availability ? "Reservar ahora" : "No disponible"}
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
