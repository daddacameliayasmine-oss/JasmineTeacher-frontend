import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.js";
import { fetchAllUsers } from "../../services/adminService.js";
import type { User } from "../../types/User.js";
import Card from "../ui/Card.js";

// Onglet "Eleves" : table simple des comptes inscrits.
type UserRow = User & { created_at: string };

const AdminUsersTab = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    fetchAllUsers(token)
      .then(setUsers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <Card title="Élèves inscrits">
      {loading && <p>Chargement…</p>}
      {error && <p style={{ color: "salmon" }}>{error}</p>}
      {!loading && users.length === 0 && <p>Aucun élève.</p>}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
            <th style={{ textAlign: "left", padding: "var(--space-sm)" }}>Nom</th>
            <th style={{ textAlign: "left", padding: "var(--space-sm)" }}>Email</th>
            <th style={{ textAlign: "left", padding: "var(--space-sm)" }}>Rôle</th>
            <th style={{ textAlign: "left", padding: "var(--space-sm)" }}>Inscrit le</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "var(--space-sm)" }}>{u.firstname} {u.lastname}</td>
              <td style={{ padding: "var(--space-sm)" }}>{u.email}</td>
              <td style={{ padding: "var(--space-sm)" }}>{u.role}</td>
              <td style={{ padding: "var(--space-sm)" }}>{new Date(u.created_at).toLocaleDateString("fr-FR")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default AdminUsersTab;
