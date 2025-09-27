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
    return new Intl.NumberFormat("es-CL", {
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
      "https://via.placeholder.com/400x200/e3f2fd/1976d2?text=Study+Space";
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {imageLoading && <Skeleton variant="rectangular" height={200} />}

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

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {space.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" paragraph>
          {space.description.length > 100
            ? `${space.description.substring(0, 100)}...`
            : space.description}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <LocationOn sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {space.location}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <People sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }} />
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
            />
          ))}
          {space.amenities.length > 3 && (
            <Chip
              label={`+${space.amenities.length - 3} más`}
              size="small"
              variant="outlined"
              color="primary"
            />
          )}
        </Box>

        <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
          {formatPrice(space.pricePerHour)}/hora
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => onViewDetails(space.id)}
          disabled={!space.availability}
        >
          {space.availability ? "Ver más" : "No disponible"}
        </Button>
      </CardActions>
    </Card>
  );
}
