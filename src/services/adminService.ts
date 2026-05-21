import type { User } from "../types/User.js";
import { apiFetch } from "./apiClient.js";

// Type renvoye par GET /api/bookings/all (admin).
export type BookingFull = {
  id: number;
  user_id: number;
  course_id: number;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
  course_title: string;
  course_start_at: string;
  course_price: number;
  course_visio_url: string | null;
  user_firstname: string;
  user_lastname: string;
  user_email: string;
};

// Donnees admin (eleves inscrits + toutes les reservations).

export const fetchAllUsers = (token: string): Promise<(User & { created_at: string })[]> => {
  return apiFetch<(User & { created_at: string })[]>("/users", { token });
};

// Modifie le prenom/nom d'un eleve. Endpoint reserve a l'admin.
export const updateUser = (
  token: string,
  id: number,
  input: { firstname: string; lastname: string },
): Promise<User & { created_at: string }> => {
  return apiFetch<User & { created_at: string }>(`/users/${id}`, {
    method: "PUT",
    body: input,
    token,
  });
};

// Supprime un eleve (cascade sur ses reservations).
export const deleteUser = (token: string, id: number): Promise<void> => {
  return apiFetch<void>(`/users/${id}`, { method: "DELETE", token });
};

export const fetchAllBookings = (token: string): Promise<BookingFull[]> => {
  return apiFetch<BookingFull[]>("/bookings/all", { token });
};
