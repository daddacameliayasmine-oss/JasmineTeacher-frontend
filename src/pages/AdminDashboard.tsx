import { useState } from "react";
import AdminBookingsTab from "../components/admin/AdminBookingsTab.js";
import AdminCoursesTab from "../components/admin/AdminCoursesTab.js";
import AdminUsersTab from "../components/admin/AdminUsersTab.js";

type Tab = "courses" | "users" | "bookings";

// Style des onglets, avec etat actif sur le bouton selectionne.
const tabButton = (active: boolean) => ({
  padding: "0.5rem 1rem",
  background: active ? "var(--color-accent)" : "transparent",
  color: "var(--color-text)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  cursor: "pointer",
});

// Page admin avec navigation par onglets (cours, eleves, reservations).
const AdminDashboard = () => {
  const [tab, setTab] = useState<Tab>("courses");

  return (
    <section style={{ maxWidth: 1200, margin: "var(--space-xl) auto", padding: "0 var(--space-lg)" }}>
      <h1 style={{ marginBottom: "var(--space-lg)" }}>Dashboard admin</h1>

      <div style={{ display: "flex", gap: "var(--space-sm)", marginBottom: "var(--space-lg)" }}>
        <button type="button" style={tabButton(tab === "courses")} onClick={() => setTab("courses")}>
          Cours
        </button>
        <button type="button" style={tabButton(tab === "users")} onClick={() => setTab("users")}>
          Élèves
        </button>
        <button type="button" style={tabButton(tab === "bookings")} onClick={() => setTab("bookings")}>
          Réservations
        </button>
      </div>

      {tab === "courses" && <AdminCoursesTab />}
      {tab === "users" && <AdminUsersTab />}
      {tab === "bookings" && <AdminBookingsTab />}
    </section>
  );
};

export default AdminDashboard;
