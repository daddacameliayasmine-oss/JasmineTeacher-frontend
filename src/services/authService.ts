import type { AuthResponse, User } from "../types/User.js";
import { apiFetch } from "./apiClient.js";

// Service auth : isole les appels reseau pour register, login, me.

export const register = (data: {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  return apiFetch<AuthResponse>("/auth/register", { method: "POST", body: data });
};

export const login = (data: { email: string; password: string }): Promise<AuthResponse> => {
  return apiFetch<AuthResponse>("/auth/login", { method: "POST", body: data });
};

// Recupere le profil de l'utilisateur connecte a partir d'un token deja stocke.
export const fetchMe = (token: string): Promise<User> => {
  return apiFetch<User>("/auth/me", { token });
};
