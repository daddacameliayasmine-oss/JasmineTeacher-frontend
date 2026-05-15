import type { BookingWithCourse } from "../types/Booking.js";
import { apiFetch } from "./apiClient.js";

// Service reservations cote eleve. Toutes les routes necessitent un token.

export const fetchMyBookings = (token: string): Promise<BookingWithCourse[]> => {
  return apiFetch<BookingWithCourse[]>("/bookings/me", { token });
};

export const createBooking = (token: string, courseId: number): Promise<{ id: number }> => {
  return apiFetch<{ id: number }>("/bookings", {
    method: "POST",
    body: { courseId },
    token,
  });
};

export const cancelBooking = (token: string, bookingId: number): Promise<void> => {
  return apiFetch<void>(`/bookings/${bookingId}`, { method: "DELETE", token });
};
