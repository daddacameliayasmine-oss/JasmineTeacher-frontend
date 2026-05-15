import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.js";
import { type AdminStats, fetchAdminStats } from "../../services/statsService.js";
import Card from "../ui/Card.js";

// Composant carte KPI : grosse valeur + label. Utilise dans la grille de stats.
const KpiCard = ({ label, value }: { label: string; value: string | number }) => (
  <Card>
    <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>{label}</p>
    <p
      style={{
        fontSize: "2.5rem",
        fontFamily: "var(--font-heading)",
        color: "var(--color-gold)",
        marginTop: "var(--space-sm)",
      }}
    >
      {value}
    </p>
  </Card>
);

// Onglet "Statistiques" : grille de KPIs charges depuis /api/stats.
const AdminStatsTab = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    fetchAdminStats(token).then(setStats).catch((e) => setError(e.message));
  }, [token]);

  if (error) return <Card><p style={{ color: "salmon" }}>{error}</p></Card>;
  if (!stats) return <Card><p>Chargement…</p></Card>;

  return (
    <div
      style={{
        display: "grid",
        gap: "var(--space-md)",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      }}
    >
      <KpiCard label="Élèves inscrits" value={stats.total_students} />
      <KpiCard label="Cours créés" value={stats.total_courses} />
      <KpiCard label="Cours à venir" value={stats.upcoming_courses} />
      <KpiCard label="Réservations actives" value={stats.active_bookings} />
      <KpiCard label="Revenus encaissés" value={`${stats.revenue_paid}€`} />
    </div>
  );
};

export default AdminStatsTab;
