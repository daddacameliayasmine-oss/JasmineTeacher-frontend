import { useState } from "react";
import AdminBookingsTab from "../components/admin/AdminBookingsTab.js";
import AdminCoursesTab from "../components/admin/AdminCoursesTab.js";
import AdminStatsTab from "../components/admin/AdminStatsTab.js";
import AdminUsersTab from "../components/admin/AdminUsersTab.js";
import AdminVideosTab from "../components/admin/AdminVideosTab.js";

type Tab = "stats" | "courses" | "users" | "bookings" | "videos";

// Style des onglets, avec etat actif sur le bouton selectionne.
const tabButton = (active: boolean) => ({
  padding: "0.5rem 1rem",
  background: active ? "var(--color-accent)" : "transparent",
  color: "var(--color-text)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  cursor: "pointer",
});

// Definition des onglets : tableau pour eviter la duplication des boutons.
const TABS: { key: Tab; label: string }[] = [
  { key: "stats", label: "Statistiques" },
  { key: "courses", label: "Cours" },
  { key: "users", label: "Élèves" },
  { key: "bookings", label: "Réservations" },
  { key: "videos", label: "Vidéos" },
];

// Page admin avec navigation par onglets.
const AdminDashboard = () => {
  // Stats est l'onglet d'accueil : Jasmine voit d'abord un apercu chiffre.
  const [tab, setTab] = useState<Tab>("stats");

  return (
    <section
      style={{ maxWidth: 1200, margin: "var(--space-xl) auto", padding: "0 var(--space-lg)" }}
    >
      <h1 style={{ marginBottom: "var(--space-lg)" }}>Dashboard admin</h1>

      <div
        style={{
          display: "flex",
          gap: "var(--space-sm)",
          marginBottom: "var(--space-lg)",
          flexWrap: "wrap",
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            style={tabButton(tab === t.key)}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "stats" && <AdminStatsTab />}
      {tab === "courses" && <AdminCoursesTab />}
      {tab === "users" && <AdminUsersTab />}
      {tab === "bookings" && <AdminBookingsTab />}
      {tab === "videos" && <AdminVideosTab />}
    </section>
  );
};

export default AdminDashboard;
