import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.js";
import { deleteUser, fetchAllUsers, updateUser } from "../../services/adminService.js";
import type { User } from "../../types/User.js";
import Button from "../ui/Button.js";
import Card from "../ui/Card.js";

// Style commun aux inputs du mode edition.
const inputStyle = {
  padding: "0.25rem 0.5rem",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--color-border)",
  background: "rgba(255, 255, 255, 0.05)",
  color: "var(--color-text)",
  fontFamily: "inherit",
  width: "100%",
  maxWidth: "140px",
};

// Onglet "Eleves" : table des comptes inscrits + edition inline du prenom/nom
// + suppression (avec confirmation). L'admin ne peut pas se modifier lui-meme.
type UserRow = User & { created_at: string };

const AdminUsersTab = () => {
  const { user: me, token } = useAuth();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edition inline : id du user en cours d'edition + valeurs tampon.
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFirstname, setEditFirstname] = useState("");
  const [editLastname, setEditLastname] = useState("");

  const refresh = () => {
    if (!token) return;
    setLoading(true);
    fetchAllUsers(token)
      .then(setUsers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(refresh, [token]);

  const startEdit = (u: UserRow) => {
    setEditingId(u.id);
    setEditFirstname(u.firstname);
    setEditLastname(u.lastname);
    setError(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleSave = async (id: number) => {
    if (!token) return;
    try {
      await updateUser(token, id, { firstname: editFirstname, lastname: editLastname });
      setEditingId(null);
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de mise a jour");
    }
  };

  const handleDelete = async (u: UserRow) => {
    if (!token) return;
    const ok = window.confirm(
      `Supprimer definitivement ${u.firstname} ${u.lastname} (${u.email}) ?\nLes reservations associees seront aussi supprimees.`,
    );
    if (!ok) return;
    try {
      await deleteUser(token, u.id);
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de suppression");
    }
  };

  return (
    <Card title="Élèves inscrits">
      {loading && <p>Chargement…</p>}
      {error && <p style={{ color: "salmon" }}>{error}</p>}
      {!loading && users.length === 0 && <p>Aucun élève.</p>}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <th style={{ textAlign: "left", padding: "var(--space-sm)" }}>Nom</th>
              <th style={{ textAlign: "left", padding: "var(--space-sm)" }}>Email</th>
              <th style={{ textAlign: "left", padding: "var(--space-sm)" }}>Rôle</th>
              <th style={{ textAlign: "left", padding: "var(--space-sm)" }}>Inscrit le</th>
              <th style={{ textAlign: "left", padding: "var(--space-sm)" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const isEditing = editingId === u.id;
              const isSelf = me?.id === u.id;
              return (
                <tr key={u.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "var(--space-sm)" }}>
                    {isEditing ? (
                      <div style={{ display: "flex", gap: "var(--space-xs)", flexWrap: "wrap" }}>
                        <input
                          style={inputStyle}
                          value={editFirstname}
                          onChange={(e) => setEditFirstname(e.target.value)}
                          placeholder="Prénom"
                        />
                        <input
                          style={inputStyle}
                          value={editLastname}
                          onChange={(e) => setEditLastname(e.target.value)}
                          placeholder="Nom"
                        />
                      </div>
                    ) : (
                      `${u.firstname} ${u.lastname}`
                    )}
                  </td>
                  <td style={{ padding: "var(--space-sm)" }}>{u.email}</td>
                  <td style={{ padding: "var(--space-sm)" }}>{u.role}</td>
                  <td style={{ padding: "var(--space-sm)" }}>
                    {new Date(u.created_at).toLocaleDateString("fr-FR")}
                  </td>
                  <td style={{ padding: "var(--space-sm)" }}>
                    <div style={{ display: "flex", gap: "var(--space-xs)", flexWrap: "wrap" }}>
                      {isEditing ? (
                        <>
                          <Button onClick={() => handleSave(u.id)}>Enregistrer</Button>
                          <Button variant="outline" onClick={cancelEdit}>
                            Annuler
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button variant="outline" onClick={() => startEdit(u)}>
                            Modifier
                          </Button>
                          {!isSelf && (
                            <Button variant="outline" onClick={() => handleDelete(u)}>
                              Supprimer
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default AdminUsersTab;
