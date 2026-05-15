// Pied de page minimaliste affiche sur toutes les pages.
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
      Mentions légales · Politique de confidentialité
    </footer>
  );
};

export default Footer;
