import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importar pantallas
import BookingScreen from "../screens/BookingScreen";
import PaymentScreen from "../screens/PaymentScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import MyReservationsScreen from "../screens/MyReservationsScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import CatalogScreen from "../screens/CatalogueScreen";
import SpaceDetailScreen from "../screens/SpaceDetailScreen";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CatalogScreen />} />
        <Route path="/space/:id" element={<SpaceDetailScreen />} />
        <Route path="/booking/:id" element={<BookingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/confirmation" element={<ConfirmationScreen />} />
        <Route path="/my-reservations" element={<MyReservationsScreen />} />
        <Route path="/feedback/:reservationId" element={<FeedbackScreen />} />
      </Routes>
    </Router>
  );
}
