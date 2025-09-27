import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Rating,
  Skeleton,
} from "@mui/material";
import { LocationOn, People } from "@mui/icons-material";

interface SpaceCardProps {
  space: any;
  onViewDetails: (spaceId: number) => void;
}

export default function SpaceCard({ space, onViewDetails }: SpaceCardProps) {
  const [imageLoading, setImageLoading] = React.useState(true);
  const [imageError, setImageError] = React.useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-BO", {
      style: "currency",
      currency: "BOB",
    }).format(price);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoading(false);
    setImageError(true);
    (e.target as HTMLImageElement).src =
      "https://via.placeholder.com/400x200/9C88D4/ffffff?text=Study+Space";
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(156, 136, 212, 0.2)",
        },
      }}
    >
      {imageLoading && (
        <Skeleton
          variant="rectangular"
          height={200}
          sx={{ backgroundColor: "#f0f0f0" }}
        />
      )}

      <CardMedia
        component="img"
        height="200"
        image={space.imageUrl}
        alt={space.name}
        sx={{
          objectFit: "cover",
          display: imageLoading ? "none" : "block",
        }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />

      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          sx={{ fontWeight: 600 }}
        >
          {space.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" paragraph>
          {space.description.length > 100
            ? `${space.description.substring(0, 100)}...`
            : space.description}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <LocationOn
            sx={{
              fontSize: 16,
              mr: 0.5,
              //color: "#9C88D4"
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {space.location}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <People
            sx={{
              fontSize: 16,
              mr: 0.5,
              //color: "#9C88D4"
            }}
          />
          <Typography variant="body2" color="text.secondary">
            Capacidad: {space.capacity} persona{space.capacity > 1 ? "s" : ""}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Rating value={space.rating} precision={0.1} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({space.rating})
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
          {space.amenities.slice(0, 3).map((amenity: any) => (
            <Chip
              key={amenity}
              label={amenity}
              size="small"
              variant="outlined"
              sx={{
                // borderColor: "#9C88D4", color: "#7B68B8",
                fontSize: "0.75rem",
              }}
            />
          ))}
          {space.amenities.length > 3 && (
            <Chip
              label={`+${space.amenities.length - 3} más`}
              size="small"
              variant="filled"
              color="primary"
              sx={{ fontSize: "0.75rem" }}
            />
          )}
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            // color: "#9C88D4",
            textAlign: "center",
            py: 1,
            backgroundColor: "rgba(156, 136, 212, 0.08)",
            borderRadius: 1,
          }}
        >
          {formatPrice(space.pricePerHour)}/hora
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2.5, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => onViewDetails(space.id)}
          disabled={!space.availability}
          sx={{
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          {space.availability ? "Ver más detalles" : "No disponible"}
        </Button>
      </CardActions>
    </Card>
  );
}
