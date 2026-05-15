import { Link } from "react-router-dom";

// En-tete affiche sur toutes les pages. Liens vers les sections publiques.
const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <Link to="/" style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem" }}>
        Jasmine Teacher
      </Link>
      <nav style={{ display: "flex", gap: "1.5rem" }}>
        <Link to="/a-propos">À propos</Link>
        <Link to="/contact">Nous contacter</Link>
        <Link to="/connexion">Connexion</Link>
      </nav>
    </header>
  );
};

export default Header;
