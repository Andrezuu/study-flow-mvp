export const mockSpaces = [
  {
    id: 1,
    name: "Sala Silenciosa Norte",
    description:
      "Espacio perfecto para estudio individual. Ambiente completamente silencioso con luz natural.",
    pricePerHour: 15,
    location: "Edificio Norte, Piso 2",
    imageUrl:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop&crop=faces",
    amenities: ["WiFi", "Enchufes", "Aire acondicionado", "Luz natural"],
    capacity: 1,
    rating: 4.8,
    availability: true,
  },
  {
    id: 2,
    name: "Sala Grupal Centro",
    description:
      "Ideal para grupos de estudio de 4-6 personas. Incluye pizarra y proyector.",
    pricePerHour: 25,
    location: "Edificio Central, Piso 1",
    imageUrl:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop&crop=faces",
    amenities: [
      "WiFi",
      "Pizarra",
      "Proyector",
      "Mesa grande",
      "Aire acondicionado",
    ],
    capacity: 6,
    rating: 4.6,
    availability: true,
  },
  {
    id: 3,
    name: "Cabina Premium",
    description:
      "Cabina individual con escritorio ergonómico y máxima privacidad.",
    pricePerHour: 20,
    location: "Edificio Sur, Piso 3",
    imageUrl:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=400&fit=crop&crop=faces",
    amenities: [
      "WiFi",
      "Escritorio ergonómico",
      "Lámpara LED",
      "Cafetera",
      "Silencioso",
    ],
    capacity: 1,
    rating: 4.9,
    availability: true,
  },
  {
    id: 4,
    name: "Sala Colaborativa",
    description:
      "Espacio flexible para trabajo en equipo con mobiliario modular.",
    pricePerHour: 30,
    location: "Edificio Oeste, Piso 2",
    imageUrl:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=400&fit=crop&crop=faces",
    amenities: [
      "WiFi",
      "Mobiliario modular",
      "TV 55''",
      "Pizarra digital",
      "Café gratis",
    ],
    capacity: 8,
    rating: 4.7,
    availability: false,
  },
  {
    id: 5,
    name: "Estudio Ejecutivo",
    description:
      "Oficina privada equipada para profesionales y reuniones importantes.",
    pricePerHour: 35,
    location: "Edificio Central, Piso 5",
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop&crop=faces",
    amenities: [
      "WiFi",
      "Escritorio ejecutivo",
      "Silla ergonómica",
      "Teléfono",
      "Ventana panorámica",
    ],
    capacity: 2,
    rating: 4.9,
    availability: true,
  },
];

export const mockUsers = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan@email.com",
    phone: "+56987654321",
  },
];

export const mockReservations = [
  {
    id: 1,
    spaceId: 1,
    userId: 1,
    date: "2025-09-28",
    startTime: "14:00",
    endTime: "16:00",
    duration: 2,
    totalPrice: 30,
    status: "confirmed",
    paymentMethod: "qr",
    createdAt: "2025-09-27T10:30:00Z",
  },
  {
    id: 2,
    spaceId: 2,
    userId: 1,
    date: "2025-09-25",
    startTime: "10:00",
    endTime: "12:00",
    duration: 2,
    totalPrice: 50,
    status: "completed",
    paymentMethod: "cash",
    createdAt: "2025-09-24T15:20:00Z",
  },
];

export const mockFeedback = [
  {
    id: 1,
    reservationId: 2,
    userId: 1,
    spaceId: 2,
    rating: 5,
    comment:
      "Excelente espacio, muy cómodo y bien equipado. La pizarra funcionó perfectamente.",
    createdAt: "2025-09-25T14:30:00Z",
  },
];
