import { type FormEvent, useState } from "react";
import Button from "../components/ui/Button.js";
import Card from "../components/ui/Card.js";

// Page "Nous contacter" : coordonnees + formulaire (Frame 4).
// Le formulaire est local pour l'instant (pas d'endpoint /contact cote API).
const Contact = () => {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO Sprint suivant : appel a POST /api/contact une fois la route creee cote back.
    setSent(true);
    setMessage("");
  };

  return (
    <section
      style={{
        padding: "var(--space-xl) var(--space-lg)",
        maxWidth: 1000,
        margin: "0 auto",
        display: "grid",
        gap: "var(--space-lg)",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <div>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "var(--space-lg)" }}>Nous contacter</h1>
        <p style={{ marginBottom: "var(--space-md)" }}>📞 +33 6 00 00 00 00</p>
        <p style={{ marginBottom: "var(--space-md)" }}>✉️ jasmineteacher@gmail.com</p>
        <p>📍 4 Av. des Philippe, 75015 Paris</p>
      </div>

      <Card title="Posez votre question">
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ecrivez votre demande…"
            rows={6}
            required
            style={{
              padding: "var(--space-md)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              background: "rgba(255, 255, 255, 0.05)",
              color: "var(--color-text)",
              fontFamily: "inherit",
              resize: "vertical",
            }}
          />
          <Button type="submit">Envoyer</Button>
          {sent && <p style={{ color: "var(--color-gold)" }}>Message bien reçu, merci !</p>}
        </form>
      </Card>
    </section>
  );
};

export default Contact;
