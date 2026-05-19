import { type Page, expect } from "@playwright/test";

// Mot de passe commun a tous les comptes du seed (scripts/seed.ts cote back).
export const SEED_PASSWORD = "motdepasse123";

// Comptes seedés disponibles pour les tests.
export const accounts = {
  admin: { email: "jasmine@danse.com", firstname: "Jasmine" },
  bob: { email: "bob@example.com", firstname: "Bob" },
  charlie: { email: "charlie@example.com", firstname: "Charlie" },
  diana: { email: "diana@example.com", firstname: "Prince" },
};

// Helper de connexion via le formulaire (cible un user du seed).
// On verifie l'apparition de la nav connectee avant de rendre la main.
export const login = async (page: Page, email: string, firstname: string): Promise<void> => {
  await page.goto("/connexion");
  await page.getByPlaceholder("E-mail").fill(email);
  await page.getByPlaceholder("Mot de passe").fill(SEED_PASSWORD);
  await page.getByRole("button", { name: "Connexion" }).click();
  await expect(page.getByText(`Bonjour ${firstname}`)).toBeVisible();
};

// Pour les tests qui creent des comptes (US "creer un compte"),
// on genere un email unique a chaque run pour ne pas collisionner.
export const uniqueEmail = (prefix: string): string =>
  `${prefix}.${Date.now()}@example.com`;
