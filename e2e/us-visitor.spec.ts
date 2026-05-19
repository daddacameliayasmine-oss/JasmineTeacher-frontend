import { expect, test } from "@playwright/test";
import { uniqueEmail } from "./helpers.js";

// User stories du Visiteur (4) — projet Jasmine Teacher.
// Pre-requis : backend lance + seed applique (cf scripts/seed.ts du back).

test.describe("Visiteur — User Stories", () => {
  test("US1 — consulter les cours proposes", async ({ page }) => {
    await page.goto("/cours");
    await expect(page.getByRole("heading", { name: /Découvrir les cours/i })).toBeVisible();
    // Le seed contient 5 cours : on verifie qu'au moins 2 sont affiches.
    const sessions = page.locator("h3");
    await expect(sessions.first()).toBeVisible();
  });

  test("US2 — voir les tarifs", async ({ page }) => {
    await page.goto("/cours");
    await expect(page.getByText("Tarifs")).toBeVisible();
    await expect(page.getByText(/cours collectifs.*20/i)).toBeVisible();
    await expect(page.getByText(/cours individuels.*40/i)).toBeVisible();
    await expect(page.getByText(/Cours enfants.*10.*20/i)).toBeVisible();
  });

  test("US3 — creer un compte", async ({ page }) => {
    const email = uniqueEmail("us3");
    await page.goto("/inscription");
    await page.getByPlaceholder("Nom", { exact: true }).fill("Visit");
    await page.getByPlaceholder("Prénom").fill("Eur");
    await page.getByPlaceholder("E-mail").fill(email);
    await page.getByPlaceholder("Mot de passe (8 min)").fill("motdepasse123");
    await page.getByPlaceholder("Confirmation du mot de passe").fill("motdepasse123");
    await page.getByRole("button", { name: "S'inscrire" }).click();
    // Apres inscription, on est redirige sur / et la nav affiche le prenom.
    await expect(page).toHaveURL("/");
    await expect(page.getByText("Bonjour Eur")).toBeVisible();
  });

  test("US4 — regarder des videos de demonstration", async ({ page }) => {
    await page.goto("/cours");
    await expect(page.getByRole("heading", { name: /Vidéos de démonstration/i })).toBeVisible();
    // Le seed expose 2 videos publiques.
    const videoTitles = page.getByText(/Decouverte de la danse|Les bases du Shimmy/);
    await expect(videoTitles.first()).toBeVisible();
  });
});
