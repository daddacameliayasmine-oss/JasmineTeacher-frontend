import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Button from "./Button.js";

describe("Button", () => {
  it("affiche le texte passe en children", () => {
    render(<Button>Reserver</Button>);
    expect(screen.getByRole("button", { name: "Reserver" })).toBeInTheDocument();
  });

  it("declenche onClick au clic", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Payer</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Payer" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("rend type=button par defaut (et pas submit, important hors formulaire)", () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("accepte type=submit pour les formulaires", () => {
    render(<Button type="submit">Envoyer</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });
});
