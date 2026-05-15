import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button.js";
import Card from "../components/ui/Card.js";
import { useAuth } from "../context/AuthContext.js";
import { register } from "../services/authService.js";

// Style commun aux champs du formulaire d'inscription.
const inputStyle = {
  padding: "0.75rem 1rem",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--color-border)",
  background: "rgba(255, 255, 255, 0.05)",
  color: "var(--color-text)",
  fontFamily: "inherit",
};

const Register = () => {
  const { setSession } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Helper pour mettre a jour un champ en gardant l'immutabilite du state.
  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (form.password !== form.confirm) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    setSubmitting(true);
    try {
      const { token, user } = await register({
        lastname: form.lastname,
        firstname: form.firstname,
        email: form.email,
        password: form.password,
      });
      setSession(token, user);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={{ maxWidth: 500, margin: "var(--space-xl) auto", padding: "0 var(--space-lg)" }}>
      <h1 style={{ textAlign: "center", marginBottom: "var(--space-lg)" }}>Inscrivez-vous</h1>
      <Card>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          <input type="text" value={form.lastname} onChange={update("lastname")} placeholder="Nom" required style={inputStyle} />
          <input type="text" value={form.firstname} onChange={update("firstname")} placeholder="Prénom" required style={inputStyle} />
          <input type="email" value={form.email} onChange={update("email")} placeholder="E-mail" required style={inputStyle} />
          <input type="password" value={form.password} onChange={update("password")} placeholder="Mot de passe (8 min)" required minLength={8} style={inputStyle} />
          <input type="password" value={form.confirm} onChange={update("confirm")} placeholder="Confirmation du mot de passe" required style={inputStyle} />
          {error && <p style={{ color: "salmon" }}>{error}</p>}
          <Button type="submit">{submitting ? "Inscription…" : "S'inscrire"}</Button>
        </form>
      </Card>
      <p style={{ textAlign: "center", marginTop: "var(--space-md)", color: "var(--color-text-muted)" }}>
        Déjà inscrit ? <Link to="/connexion">Connectez-vous</Link>
      </p>
    </section>
  );
};

export default Register;
