import { apiFetch } from "./apiClient.js";

export type ContactMessage = {
  id: number;
  email: string | null;
  message: string;
  created_at: string;
};

// Depose un message via le formulaire public de contact.
export const sendContactMessage = (
  email: string | null,
  message: string,
): Promise<{ id: number }> => {
  return apiFetch<{ id: number }>("/contact", {
    method: "POST",
    body: { email, message },
  });
};

// Liste tous les messages recus (admin).
export const fetchContactMessages = (token: string): Promise<ContactMessage[]> => {
  return apiFetch<ContactMessage[]>("/contact", { token });
};
