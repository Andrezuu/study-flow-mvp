import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Grid,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { spaceService } from "../services/spaceService";
import SpaceCard from "./SpaceCard";

export default function CatalogScreen() {
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSpaces();
  }, []);

  const loadSpaces = async () => {
    try {
      setLoading(true);
      const spacesData = await spaceService.getSpaces();
      setSpaces(spacesData);
      setError(null);
    } catch (err) {
      console.error("Error loading spaces:", err);
      setError(
        "Error al cargar los espacios. Verifica que el servidor esté funcionando."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (spaceId: number) => {
    navigate(`/space/${spaceId}`);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          // background: "linear-gradient(135deg, #9C88D4 0%, #B8A9D4 100%)",
          // boxShadow: "0 4px 20px rgba(156, 136, 212, 0.3)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            Study Flow
          </Typography>
          <Button
            color="inherit"
            onClick={() => navigate("/my-reservations")}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
              borderRadius: 2,
              px: 2,
            }}
          >
            Mis Reservas
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            color: "#333333",
            fontWeight: 600,
            textAlign: "center",
            mb: 4,
          }}
        >
          Espacios de Estudio Disponibles
        </Typography>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress sx={{ color: "#9C88D4" }} />
          </Box>
        )}

        {error && (
          <Alert
            severity="error"
            sx={{
              mt: 2,
              "& .MuiAlert-icon": {
                color: "#d32f2f",
              },
            }}
          >
            {error}
          </Alert>
        )}

        {!loading && !error && (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {spaces.map((space) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={space.id}>
                <SpaceCard space={space} onViewDetails={handleViewDetails} />
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && !error && spaces.length === 0 && (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No hay espacios disponibles en este momento.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Intenta más tarde o contacta con soporte.
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}
