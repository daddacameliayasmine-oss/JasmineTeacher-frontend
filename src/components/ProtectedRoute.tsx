import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";

type Props = {
  children: ReactNode;
  // Si fourni, restreint en plus a un role precis (admin par exemple).
  role?: "admin" | "student";
};

// Wrapper de route protegee : redirige vers /connexion si pas connecte,
// vers / si le role ne correspond pas.
// Tant que la session se restaure (loading), affiche un placeholder court.
const ProtectedRoute = ({ children, role }: Props) => {
  const { user, loading } = useAuth();

  if (loading) return <p style={{ textAlign: "center", padding: "var(--space-xl)" }}>Chargement…</p>;
  if (!user) return <Navigate to="/connexion" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
