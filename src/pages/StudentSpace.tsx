import { useEffect, useState } from "react";
import Button from "../components/ui/Button.js";
import Card from "../components/ui/Card.js";
import { useAuth } from "../context/AuthContext.js";
import { cancelBooking, fetchMyBookings } from "../services/bookingsService.js";
import { payBooking } from "../services/paymentsService.js";
import type { BookingWithCourse } from "../types/Booking.js";

// Couleurs des badges de statut.
const statusColor: Record<BookingWithCourse["status"], string> = {
  pending: "var(--color-gold)",
  confirmed: "#7fc97f",
  cancelled: "var(--color-text-muted)",
};

const statusLabel: Record<BookingWithCourse["status"], string> = {
  pending: "En attente de paiement",
  confirmed: "Confirme",
  cancelled: "Annule",
};

// Page "Mon espace" : liste des reservations + bouton d'annulation + lien visio.
const StudentSpace = () => {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState<BookingWithCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = () => {
    if (!token) return;
    setLoading(true);
    fetchMyBookings(token)
      .then(setBookings)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(refresh, [token]);

  const handleCancel = async (id: number) => {
    if (!token) return;
    try {
      await cancelBooking(token, id);
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur d'annulation");
    }
  };

  const handlePay = async (id: number) => {
    if (!token) return;
    try {
      await payBooking(token, id);
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de paiement");
    }
  };

  return (
    <section
      style={{ maxWidth: 900, margin: "var(--space-xl) auto", padding: "0 var(--space-lg)" }}
    >
      <h1 style={{ marginBottom: "var(--space-md)" }}>Bonjour {user?.firstname}</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-xl)" }}>
        Retrouvez ici vos réservations à venir, votre historique et vos liens de visio.
      </p>

      {loading && <p>Chargement…</p>}
      {error && <p style={{ color: "salmon" }}>{error}</p>}
      {!loading && bookings.length === 0 && (
        <Card>
          <p style={{ textAlign: "center" }}>
            Aucune réservation pour le moment. Direction la page <a href="/cours">cours</a> !
          </p>
        </Card>
      )}

      <div style={{ display: "grid", gap: "var(--space-md)" }}>
        {bookings.map((b) => (
          <Card key={b.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3>{b.course_title}</h3>
                <p style={{ color: "var(--color-text-muted)" }}>
                  {new Date(b.course_start_at).toLocaleString("fr-FR")} · {b.course_price}€
                </p>
                <p style={{ color: statusColor[b.status], marginTop: "var(--space-sm)" }}>
                  {statusLabel[b.status]}
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
                {b.status === "pending" && (
                  <Button onClick={() => handlePay(b.id)}>Payer {b.course_price}€</Button>
                )}
                {b.status === "confirmed" && b.course_visio_url && (
                  <a
                    href={b.course_visio_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "var(--color-gold)" }}
                  >
                    Rejoindre le cours
                  </a>
                )}
                {b.status !== "cancelled" && (
                  <Button variant="outline" onClick={() => handleCancel(b.id)}>
                    Annuler
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default StudentSpace;
