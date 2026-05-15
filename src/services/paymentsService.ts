import { apiFetch } from "./apiClient.js";

// Reponse renvoyee par POST /api/payments.
export type PaymentResponse = {
  id: number;
  booking_id: number;
  amount: number;
  status: "paid";
};

// Paie une reservation en attente. Le booking passe automatiquement en "confirmed" cote back.
export const payBooking = (token: string, bookingId: number): Promise<PaymentResponse> => {
  return apiFetch<PaymentResponse>("/payments", {
    method: "POST",
    body: { bookingId },
    token,
  });
};
