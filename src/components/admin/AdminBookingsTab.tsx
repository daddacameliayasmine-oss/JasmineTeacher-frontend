import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.js";
import { type BookingFull, fetchAllBookings } from "../../services/adminService.js";
import Card from "../ui/Card.js";

// Onglet "Reservations" du dashboard admin : suivi de tous les bookings.
const AdminBookingsTab = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState<BookingFull[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    fetchAllBookings(token)
      .then(setBookings)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <Card title="Toutes les réservations">
      {loading && <p>Chargement…</p>}
      {error && <p style={{ color: "salmon" }}>{error}</p>}
      {!loading && bookings.length === 0 && <p>Aucune réservation.</p>}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
            <th style={{ textAlign: "left", padding: "var(--space-sm)" }}>Élève</th>
            <th style={{ textAlign: "left", padding: "var(--space-sm)" }}>Cours</th>
            <th style={{ textAlign: "left", padding: "var(--space-sm)" }}>Date</th>
            <th style={{ textAlign: "left", padding: "var(--space-sm)" }}>Prix</th>
            <th style={{ textAlign: "left", padding: "var(--space-sm)" }}>Statut</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "var(--space-sm)" }}>
                {b.user_firstname} {b.user_lastname}
                <br />
                <small style={{ color: "var(--color-text-muted)" }}>{b.user_email}</small>
              </td>
              <td style={{ padding: "var(--space-sm)" }}>{b.course_title}</td>
              <td style={{ padding: "var(--space-sm)" }}>
                {new Date(b.course_start_at).toLocaleString("fr-FR")}
              </td>
              <td style={{ padding: "var(--space-sm)" }}>{b.course_price}€</td>
              <td style={{ padding: "var(--space-sm)" }}>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default AdminBookingsTab;
