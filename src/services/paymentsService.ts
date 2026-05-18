import { apiFetch } from "./apiClient.js";

// Reponse renvoyee par POST /api/payments (mode mock).
export type PaymentResponse = {
  id: number;
  booking_id: number;
  amount: number;
  status: "paid";
};

// Paie une reservation en attente (mode mock — dev sans Stripe).
// Le booking passe automatiquement en "confirmed" cote back.
export const payBooking = (token: string, bookingId: number): Promise<PaymentResponse> => {
  return apiFetch<PaymentResponse>("/payments", {
    method: "POST",
    body: { bookingId },
    token,
  });
};

// Demande au back une session Stripe Checkout et renvoie l'URL de redirection.
// 503 attendu si STRIPE_SECRET_KEY n'est pas configure cote back.
export const createCheckoutSession = (
  token: string,
  bookingId: number,
): Promise<{ url: string }> => {
  return apiFetch<{ url: string }>("/payments/checkout-session", {
    method: "POST",
    body: { bookingId },
    token,
  });
};
