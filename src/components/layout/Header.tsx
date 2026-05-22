import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import UserMenu from "./UserMenu.js";

// En-tete affiche sur toutes les pages.
// Visiteurs : liens Connexion / S'inscrire.
// Connectes : dropdown "Mon compte" qui regroupe Mon espace / Mon profil /
// Admin / Deconnexion pour eviter d'encombrer le menu.
const Header = () => {
  const { user } = useAuth();

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
          <UserMenu />
        ) : (
          <>
            <Link to="/connexion">Connexion</Link>
            <Link to="/inscription">S'inscrire</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
