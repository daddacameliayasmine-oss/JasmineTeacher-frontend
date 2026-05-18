import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import type { User } from "../types/User.js";
import ProtectedRoute from "./ProtectedRoute.js";

// On mock le hook useAuth en exposant une valeur mutable qu'on adapte
// pour chaque scenario de test (chargement, anonyme, student, admin).
const authState: { user: User | null; loading: boolean } = {
  user: null,
  loading: false,
};

vi.mock("../context/AuthContext.js", () => ({
  useAuth: () => authState,
}));

// Helper de rendu : on definit 2 routes protegees + 2 routes publiques
// pour observer les redirections via MemoryRouter.
const renderWith = (initialEntries: string[]) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <div>contenu prive</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-only"
          element={
            <ProtectedRoute role="admin">
              <div>contenu admin</div>
            </ProtectedRoute>
          }
        />
        <Route path="/connexion" element={<div>page connexion</div>} />
        <Route path="/" element={<div>accueil</div>} />
      </Routes>
    </MemoryRouter>,
  );

const student: User = {
  id: 1,
  firstname: "Eve",
  lastname: "T",
  email: "e@e.com",
  role: "student",
};

describe("ProtectedRoute", () => {
  it("affiche un placeholder pendant le chargement de la session", () => {
    authState.user = null;
    authState.loading = true;
    renderWith(["/protected"]);
    expect(screen.getByText(/Chargement/)).toBeInTheDocument();
  });

  it("redirige vers /connexion si l'utilisateur n'est pas connecte", () => {
    authState.user = null;
    authState.loading = false;
    renderWith(["/protected"]);
    expect(screen.getByText("page connexion")).toBeInTheDocument();
  });

  it("affiche le contenu si l'utilisateur est connecte", () => {
    authState.user = student;
    authState.loading = false;
    renderWith(["/protected"]);
    expect(screen.getByText("contenu prive")).toBeInTheDocument();
  });

  it("redirige vers / si le role demande ne correspond pas", () => {
    authState.user = student;
    authState.loading = false;
    renderWith(["/admin-only"]);
    expect(screen.getByText("accueil")).toBeInTheDocument();
  });

  it("autorise un admin sur une route role=admin", () => {
    authState.user = { ...student, role: "admin" };
    authState.loading = false;
    renderWith(["/admin-only"]);
    expect(screen.getByText("contenu admin")).toBeInTheDocument();
  });
});
