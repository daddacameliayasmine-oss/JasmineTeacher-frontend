import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button.js";
import Card from "../components/ui/Card.js";
import { useAuth } from "../context/AuthContext.js";
import { login } from "../services/authService.js";

// Reutilise pour les 2 champs du formulaire Login.
const inputStyle = {
  padding: "0.75rem 1rem",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--color-border)",
  background: "rgba(255, 255, 255, 0.05)",
  color: "var(--color-text)",
  fontFamily: "inherit",
};

const Login = () => {
  const { setSession } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const { token, user } = await login({ email, password });
      setSession(token, user);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      style={{ maxWidth: 500, margin: "var(--space-xl) auto", padding: "0 var(--space-lg)" }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "var(--space-lg)" }}>Connectez-vous</h1>
      <Card>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            required
            style={inputStyle}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
            style={inputStyle}
          />
          {error && <p style={{ color: "salmon" }}>{error}</p>}
          <Button type="submit">{submitting ? "Connexion…" : "Connexion"}</Button>
        </form>
      </Card>
      <p
        style={{
          textAlign: "center",
          marginTop: "var(--space-md)",
          color: "var(--color-text-muted)",
        }}
      >
        Pas encore de compte ? <Link to="/inscription">Inscrivez-vous</Link>
      </p>
    </section>
  );
};

export default Login;
