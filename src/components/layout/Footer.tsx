import { Link } from "react-router-dom";

// Pied de page minimaliste affiche sur toutes les pages.
// Lien vers la page Mentions legales (obligation legale en France).
const Footer = () => {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "1.5rem",
        marginTop: "auto",
        color: "var(--color-text-muted)",
        fontSize: "0.875rem",
      }}
    >
      <Link to="/mentions-legales" style={{ color: "var(--color-text-muted)" }}>
        Mentions légales
      </Link>
      <span style={{ margin: "0 var(--space-sm)" }}>·</span>
      <Link to="/mentions-legales#confidentialite" style={{ color: "var(--color-text-muted)" }}>
        Politique de confidentialité
      </Link>
    </footer>
  );
};

export default Footer;
