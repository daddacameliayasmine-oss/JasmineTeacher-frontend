import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";

// En-tete affiche sur toutes les pages.
// Affiche "Connexion" pour les visiteurs et "Bonjour <prenom> · Deconnexion" pour les connectes.
const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        borderBottom: "1px solid var(--color-border)",
        background: "rgba(26, 14, 14, 0.9)",
        backdropFilter: "blur(8px)",
        flexWrap: "wrap",
        gap: "var(--space-md)",
      }}
    >
      <Link to="/" style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem" }}>
        Jasmine Teacher
      </Link>
      <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
        <Link to="/cours">Cours</Link>
        <Link to="/a-propos">À propos</Link>
        <Link to="/contact">Nous contacter</Link>
        {user ? (
          <>
            <Link to="/mon-espace">Mon espace</Link>
            {user.role === "admin" && <Link to="/admin">Admin</Link>}
            <span style={{ color: "var(--color-text-muted)" }}>Bonjour {user.firstname}</span>
            <button
              type="button"
              onClick={logout}
              style={{ background: "transparent", border: "none", color: "var(--color-gold)", cursor: "pointer" }}
            >
              Déconnexion
            </button>
          </>
        ) : (
          <Link to="/connexion">Connexion</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
