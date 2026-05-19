import { expect, test } from "@playwright/test";
import { accounts, login } from "./helpers.js";

// User stories de l'Eleve (6) — projet Jasmine Teacher.
// Pre-requis : backend lance + seed applique (Bob a 1 confirmed+payee + 1 pending,
// Diana est vierge donc disponible pour les tests "reserver" sans collision).

test.describe("Eleve — User Stories", () => {
  test("US5 — se connecter a son compte", async ({ page }) => {
    await login(page, accounts.bob.email, accounts.bob.firstname);
    // Apres login, on est sur /, et le lien Mon espace est visible.
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("link", { name: "Mon espace" })).toBeVisible();
  });

  test("US6 — reserver un cours en ligne", async ({ page }) => {
    await login(page, accounts.diana.email, accounts.diana.firstname);
    await page.goto("/cours");
    // Le seed cree 5 cours dans l'ordre. "Initiation danse orientale" est le 2e
    // (index 1). Les boutons "Reserver" suivent le meme ordre.
    await page.getByRole("button", { name: "Réserver" }).nth(1).click();
    await expect(page.getByText("Réservation créée")).toBeVisible();
  });

  test("US7 — payer un cours (fallback mock car pas de cle Stripe)", async ({ page }) => {
    await login(page, accounts.bob.email, accounts.bob.firstname);
    await page.goto("/mon-espace");
    // Bob a une reservation pending sur "Eveil enfants 6-10 ans".
    const pendingCard = page.locator("div").filter({ hasText: "En attente de paiement" }).first();
    await pendingCard.getByRole("button", { name: /Payer/ }).click();
    // En l'absence de Stripe, le booking passe directement en Confirme.
    await expect(page.getByText("Confirme").first()).toBeVisible();
  });

  test("US8 — acceder a ses cours en visio", async ({ page }) => {
    await login(page, accounts.bob.email, accounts.bob.firstname);
    await page.goto("/mon-espace");
    // Bob a au moins 1 booking confirmed depuis le seed → lien visio visible.
    await expect(page.getByRole("link", { name: "Rejoindre le cours" }).first()).toBeVisible();
  });

  test("US9 — voir son historique de cours", async ({ page }) => {
    await login(page, accounts.bob.email, accounts.bob.firstname);
    await page.goto("/mon-espace");
    // Bob a 2 bookings en BDD → 2 cartes visibles avec leur titre.
    const cards = page.locator("h3");
    await expect(cards).toHaveCount(2, { timeout: 5000 });
  });

  test("US10 — annuler une reservation", async ({ page }) => {
    await login(page, accounts.bob.email, accounts.bob.firstname);
    await page.goto("/mon-espace");
    const firstCard = page.locator("h3").first();
    await firstCard.scrollIntoViewIfNeeded();
    // On annule la premiere reservation visible (peu importe laquelle).
    await page.getByRole("button", { name: "Annuler" }).first().click();
    // Apres annulation, le badge "Annule" doit apparaitre.
    await expect(page.getByText("Annule").first()).toBeVisible();
  });
});
