import type { User } from "../types/User.js";
import { apiFetch } from "./apiClient.js";

// Service self : l'utilisateur connecte met a jour son propre profil
// (prenom + nom uniquement, ni email ni role pour eviter toute escalation).
export const updateMyProfile = (
  token: string,
  input: { firstname: string; lastname: string },
): Promise<User> => {
  return apiFetch<User>("/users/me", { method: "PUT", body: input, token });
};
