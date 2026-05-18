import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { apiFetch } from "./apiClient.js";

// Helper pour mocker fetch avec une reponse JSON donnee.
const mockFetch = (status: number, body: unknown) => {
  const responseBody = typeof body === "string" ? body : JSON.stringify(body);
  globalThis.fetch = vi.fn().mockResolvedValue(
    new Response(responseBody, {
      status,
      headers: { "Content-Type": "application/json" },
    }),
  );
};

describe("apiFetch", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("retourne le JSON parse en cas de succes", async () => {
    mockFetch(200, { hello: "world" });
    const result = await apiFetch<{ hello: string }>("/test");
    expect(result.hello).toBe("world");
  });

  it("extrait le champ error du JSON quand le back renvoie 4xx", async () => {
    mockFetch(400, { error: "Reservation a minimum 7 jours d'avance" });
    await expect(apiFetch("/test")).rejects.toThrow("Reservation a minimum 7 jours d'avance");
  });

  it("retombe sur le texte brut si la reponse n'est pas du JSON", async () => {
    mockFetch(500, "Internal Server Error");
    await expect(apiFetch("/test")).rejects.toThrow("Internal Server Error");
  });

  it("utilise un message par defaut si la reponse d'erreur est vide", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(new Response("", { status: 503 }));
    await expect(apiFetch("/test")).rejects.toThrow("Erreur 503");
  });

  it("retourne undefined sur 204 No Content", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    const result = await apiFetch("/test");
    expect(result).toBeUndefined();
  });

  it("envoie le bearer token quand il est fourni", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    globalThis.fetch = fetchMock;
    await apiFetch("/private", { token: "abc123" });
    const headers = fetchMock.mock.calls[0][1].headers as Record<string, string>;
    expect(headers.Authorization).toBe("Bearer abc123");
  });

  it("envoie le body en JSON sur POST", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ id: 1 }), { status: 201 }));
    globalThis.fetch = fetchMock;
    await apiFetch("/courses", { method: "POST", body: { title: "Test" } });
    expect(fetchMock.mock.calls[0][1].method).toBe("POST");
    expect(fetchMock.mock.calls[0][1].body).toBe(JSON.stringify({ title: "Test" }));
  });
});
