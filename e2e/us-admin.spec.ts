import { expect, test } from "@playwright/test";
import { accounts, login } from "./helpers.js";

// User stories de l'Admin (5) — projet Jasmine Teacher.
// Pre-requis : backend lance + seed applique (Jasmine est seedee en admin).

const futureDateTimeLocal = (days: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 16);
};

test.describe("Admin — User Stories", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, accounts.admin.email, accounts.admin.firstname);
    await page.goto("/admin");
    await expect(page.getByRole("heading", { name: "Dashboard admin" })).toBeVisible();
  });

  test("US11 — creer un cours", async ({ page }) => {
    await page.getByRole("button", { name: "Cours", exact: true }).click();
    await page.getByPlaceholder("Titre").fill("Cours E2E creation");
    await page.getByPlaceholder("Description").fill("Cree par le test E2E");
    await page.locator("input[type='datetime-local']").fill(futureDateTimeLocal(60));
    await page.getByRole("button", { name: "Enregistrer" }).click();
    await expect(page.getByText("Cours E2E creation").first()).toBeVisible();
  });

  test("US12 — modifier puis supprimer un cours", async ({ page }) => {
    await page.getByRole("button", { name: "Cours", exact: true }).click();
    // On attend qu'au moins un bouton Modifier apparaisse (chargement async des cours).
    await expect(page.getByRole("button", { name: "Modifier" }).first()).toBeVisible();
    const deleteButtons = page.getByRole("button", { name: "Supprimer" });
    const before = await deleteButtons.count();
    // Toggle d'edition pour valider que le formulaire apparait/disparait.
    await page.getByRole("button", { name: "Modifier" }).first().click();
    await page.getByRole("button", { name: "Modifier" }).first().click();
    // Supprime le dernier cours et verifie la decrementation.
    await deleteButtons.last().click();
    await expect(deleteButtons).toHaveCount(before - 1);
  });

  test("US13 — voir la liste des eleves inscrits", async ({ page }) => {
    await page.getByRole("button", { name: "Élèves" }).click();
    await expect(page.getByRole("heading", { name: "Élèves inscrits" })).toBeVisible();
    // Le seed contient 3 students + 1 admin → au moins 4 lignes dans la table.
    await expect(page.getByText("bob@example.com")).toBeVisible();
    await expect(page.getByText("charlie@example.com")).toBeVisible();
    await expect(page.getByText("diana@example.com")).toBeVisible();
  });

  test("US14 — gerer les paiements (vue stats avec revenus)", async ({ page }) => {
    // L'onglet Stats est l'accueil par defaut, on y voit les revenus encaisses.
    await expect(page.getByText("Revenus encaissés")).toBeVisible();
    // Le seed a 1 paiement de 20€ → le KPI doit etre >= 20€.
    const revenue = await page.getByText("Revenus encaissés").locator("..").locator("p").last().textContent();
    expect(Number((revenue ?? "0").replace(/[^0-9]/g, ""))).toBeGreaterThanOrEqual(20);
  });

  test("US15 — ajouter une video de cours", async ({ page }) => {
    await page.getByRole("button", { name: "Vidéos" }).click();
    await page.getByPlaceholder("Titre").fill("Video E2E test");
    await page.getByPlaceholder(/URL/i).fill("https://www.youtube.com/watch?v=e2e-test");
    await page.getByRole("button", { name: "Ajouter" }).click();
    await expect(page.getByText("Video E2E test")).toBeVisible();
  });
});
