import { expect, test } from "@playwright/test";

// Smoke tests des pages publiques (visiteur non connecte) :
// on verifie juste que chaque route repond et affiche le contenu attendu.
// Pas de dependance au backend ici, donc les appels API peuvent echouer
// silencieusement — c'est OK, on teste seulement le rendu cote front.

test.describe("Pages publiques (visiteur)", () => {
  test("page d'accueil affiche le hero Jasmine Teacher", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Jasmine Teacher" })).toBeVisible();
    // first() : le lien existe aussi dans la nav, on cible le CTA du hero.
    await expect(page.getByRole("link", { name: /Découvrir les cours/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /S'inscrire/i }).first()).toBeVisible();
  });

  test("page cours liste tarifs et bloc cours", async ({ page }) => {
    await page.goto("/cours");
    await expect(page.getByText("Tarifs")).toBeVisible();
    await expect(page.getByText(/cours collectifs.*20/i)).toBeVisible();
    await expect(page.getByText(/cours individuels.*40/i)).toBeVisible();
  });

  test("page a propos accessible", async ({ page }) => {
    await page.goto("/a-propos");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("page contact affiche les coordonnees et le formulaire", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("heading", { name: /Nous contacter/i })).toBeVisible();
    await expect(page.getByPlaceholder(/votre email/i)).toBeVisible();
  });

  test("page connexion accessible avec les champs attendus", async ({ page }) => {
    await page.goto("/connexion");
    await expect(page.getByRole("heading", { name: /Connectez-vous/i })).toBeVisible();
    await expect(page.getByPlaceholder("E-mail")).toBeVisible();
    await expect(page.getByPlaceholder("Mot de passe")).toBeVisible();
  });

  test("page inscription accessible avec les champs attendus", async ({ page }) => {
    await page.goto("/inscription");
    await expect(page.getByRole("heading", { name: /Inscrivez-vous/i })).toBeVisible();
    // Nom est un sous-string de Prénom — on exige le match exact.
    await expect(page.getByPlaceholder("Nom", { exact: true })).toBeVisible();
    await expect(page.getByPlaceholder("Prénom")).toBeVisible();
  });
});

test.describe("Acces protege", () => {
  test("mon-espace redirige les visiteurs vers la connexion", async ({ page }) => {
    await page.goto("/mon-espace");
    // ProtectedRoute redirige vers /connexion si pas de token.
    await expect(page).toHaveURL(/\/connexion/);
  });

  test("admin redirige les visiteurs vers la connexion", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/connexion/);
  });
});
