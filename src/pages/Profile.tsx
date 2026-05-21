import { type FormEvent, useState } from "react";
import Button from "../components/ui/Button.js";
import Card from "../components/ui/Card.js";
import { useAuth } from "../context/AuthContext.js";
import { updateMyProfile } from "../services/usersService.js";

// Style commun aux inputs du formulaire profil.
const inputStyle = {
  padding: "0.5rem 0.75rem",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--color-border)",
  background: "rgba(255, 255, 255, 0.05)",
  color: "var(--color-text)",
  fontFamily: "inherit",
  width: "100%",
};

// Page "Mon profil" : permet a tout utilisateur connecte (eleve OU admin)
// de modifier son prenom et son nom. L'email et le role sont volontairement
// non editables ici (email = identifiant, role = privilege).
const Profile = () => {
  const { user, token, updateUser } = useAuth();
  const [firstname, setFirstname] = useState(user?.firstname ?? "");
  const [lastname, setLastname] = useState(user?.lastname ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;
    setError(null);
    setSuccess(false);
    setSubmitting(true);
    try {
      const updated = await updateMyProfile(token, { firstname, lastname });
      updateUser(updated);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de mise a jour");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      style={{ maxWidth: 600, margin: "var(--space-xl) auto", padding: "0 var(--space-lg)" }}
    >
      <h1 style={{ marginBottom: "var(--space-md)" }}>Mon profil</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-xl)" }}>
        Modifiez votre prénom et votre nom. L'email et le rôle ne peuvent pas être changés ici.
      </p>

      <Card>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "var(--space-md)" }}>
          <label style={{ display: "grid", gap: "var(--space-xs)" }}>
            <span style={{ color: "var(--color-text-muted)" }}>Prénom</span>
            <input
              style={inputStyle}
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              minLength={1}
              maxLength={100}
            />
          </label>

          <label style={{ display: "grid", gap: "var(--space-xs)" }}>
            <span style={{ color: "var(--color-text-muted)" }}>Nom</span>
            <input
              style={inputStyle}
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              minLength={1}
              maxLength={100}
            />
          </label>

          <label style={{ display: "grid", gap: "var(--space-xs)" }}>
            <span style={{ color: "var(--color-text-muted)" }}>Email (non modifiable)</span>
            <input style={inputStyle} value={user?.email ?? ""} disabled />
          </label>

          <label style={{ display: "grid", gap: "var(--space-xs)" }}>
            <span style={{ color: "var(--color-text-muted)" }}>Rôle</span>
            <input style={inputStyle} value={user?.role ?? ""} disabled />
          </label>

          {error && <p style={{ color: "salmon" }}>{error}</p>}
          {success && <p style={{ color: "var(--color-gold)" }}>Profil mis à jour avec succès.</p>}

          <Button type="submit">{submitting ? "Enregistrement…" : "Enregistrer"}</Button>
        </form>
      </Card>
    </section>
  );
};

export default Profile;
