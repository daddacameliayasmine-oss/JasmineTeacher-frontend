// Petit client fetch centralise. Vite proxy /api vers le backend en dev.
// Une seule fonction pour gerer la base URL, les headers JSON et les erreurs.

const BASE_URL = "/api";

type Options = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  token?: string;
};

export const apiFetch = async <T>(path: string, options: Options = {}): Promise<T> => {
  const { method = "GET", body, token } = options;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Erreur ${response.status}`);
  }

  // 204 No Content : pas de corps a parser.
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
};
