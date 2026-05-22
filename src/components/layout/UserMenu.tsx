import { type CSSProperties, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";

// Menu "Mon compte" : dropdown qui regroupe les actions liees au compte
// utilisateur (Mon espace, Mon profil, Admin, Deconnexion) pour eviter
// d'encombrer le header avec trop de liens.
const menuItemStyle: CSSProperties = {
  display: "block",
  padding: "var(--space-sm) var(--space-md)",
  color: "var(--color-text)",
  textDecoration: "none",
  textAlign: "left",
};

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Ferme le menu quand on clique a l'exterieur du conteneur.
  useEffect(() => {
    if (!open) return;
    const onClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  if (!user) return null;

  const close = () => setOpen(false);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="menu"
        style={{
          background: "transparent",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          padding: "0.4rem 0.8rem",
          color: "var(--color-text)",
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        Mon compte ▾
      </button>
      {open && (
        <div
          role="menu"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            minWidth: 200,
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-md)",
            display: "flex",
            flexDirection: "column",
            padding: "var(--space-xs) 0",
            zIndex: 10,
          }}
        >
          <div
            style={{
              padding: "var(--space-sm) var(--space-md)",
              color: "var(--color-text-muted)",
              fontSize: "0.875rem",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            Bonjour {user.firstname}
          </div>
          <Link to="/mon-espace" onClick={close} style={menuItemStyle}>
            Mon espace
          </Link>
          <Link to="/profil" onClick={close} style={menuItemStyle}>
            Mon profil
          </Link>
          {user.role === "admin" && (
            <Link to="/admin" onClick={close} style={menuItemStyle}>
              Admin
            </Link>
          )}
          <button
            type="button"
            onClick={() => {
              close();
              logout();
            }}
            style={{
              ...menuItemStyle,
              background: "transparent",
              border: "none",
              borderTop: "1px solid var(--color-border)",
              color: "var(--color-gold)",
              cursor: "pointer",
              fontFamily: "inherit",
              width: "100%",
            }}
          >
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
