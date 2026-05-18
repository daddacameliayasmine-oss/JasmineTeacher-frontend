import { type FormEvent, useState } from "react";
import Button from "../components/ui/Button.js";
import Card from "../components/ui/Card.js";
import { useAuth } from "../context/AuthContext.js";
import { sendContactMessage } from "../services/contactService.js";

// Style commun aux champs du formulaire.
const fieldStyle = {
  padding: "var(--space-md)",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--color-border)",
  background: "rgba(255, 255, 255, 0.05)",
  color: "var(--color-text)",
  fontFamily: "inherit",
  resize: "vertical" as const,
};

// Page "Nous contacter" : coordonnees + formulaire branche sur POST /api/contact.
const Contact = () => {
  const { user } = useAuth();
  // Si user connecte, on pre-remplit l'email avec son adresse.
  const [email, setEmail] = useState(user?.email ?? "");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await sendContactMessage(email || null, message);
      setSent(true);
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      style={{
        padding: "var(--space-xl) var(--space-lg)",
        maxWidth: 1000,
        margin: "0 auto",
        display: "grid",
        gap: "var(--space-lg)",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      }}
    >
      <div>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "var(--space-lg)" }}>Nous contacter</h1>
        <p style={{ marginBottom: "var(--space-md)" }}>📞 +33 6 00 00 00 00</p>
        <p style={{ marginBottom: "var(--space-md)" }}>✉️ jasmineteacher@gmail.com</p>
        <p>📍 4 Av. des Philippe, 75015 Paris</p>
      </div>

      <Card title="Posez votre question">
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email (optionnel)"
            style={fieldStyle}
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ecrivez votre demande…"
            rows={6}
            required
            minLength={5}
            style={fieldStyle}
          />
          {error && <p style={{ color: "salmon" }}>{error}</p>}
          <Button type="submit">{submitting ? "Envoi…" : "Envoyer"}</Button>
          {sent && <p style={{ color: "var(--color-gold)" }}>Message bien reçu, merci !</p>}
        </form>
      </Card>
    </section>
  );
};

export default Contact;
