// Petit client fetch centralise. Une seule fonction pour gerer la base URL,
// les headers JSON et les erreurs.
// En dev : Vite proxy /api vers localhost:3310.
// En prod : VITE_API_URL pointe sur l'URL Render (ex. https://jasmine-teacher-api.onrender.com/api).
const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

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
    // Le back renvoie { error: "..." } en JSON. On extrait le message
    // pour afficher quelque chose de lisible dans l'UI (pas le JSON brut).
    const raw = await response.text();
    let message = raw;
    try {
      const parsed = JSON.parse(raw) as { error?: string };
      if (parsed?.error) message = parsed.error;
    } catch {
      // Reponse non-JSON (rare) : on garde le texte brut.
    }
    throw new Error(message || `Erreur ${response.status}`);
  }

  // 204 No Content : pas de corps a parser.
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
};
