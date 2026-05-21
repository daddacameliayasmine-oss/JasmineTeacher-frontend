import { type ReactNode, createContext, useContext, useEffect, useState } from "react";
import { fetchMe } from "../services/authService.js";
import type { User } from "../types/User.js";

// Cle de stockage du token dans localStorage.
// Centralisee ici pour eviter les magic strings ailleurs.
const TOKEN_KEY = "jt_token";

type AuthContextValue = {
  user: User | null;
  token: string | null;
  // Met a jour l'etat apres un login / register reussi.
  setSession: (token: string, user: User) => void;
  // Met a jour le user courant (ex. apres modification du profil)
  // sans toucher au token.
  updateUser: (user: User) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Provider a placer au-dessus de l'app. Restaure la session au montage.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (!saved) {
      setLoading(false);
      return;
    }
    fetchMe(saved)
      .then((u) => {
        setToken(saved);
        setUser(u);
      })
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false));
  }, []);

  const setSession = (newToken: string, newUser: User) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, setSession, updateUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook pratique pour acceder a l'auth depuis n'importe quel composant.
export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit etre utilise dans un AuthProvider");
  return ctx;
};
