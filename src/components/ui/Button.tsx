import type { CSSProperties, ReactNode } from "react";

// Composant Button reutilisable avec 2 variantes : primary (accent) et outline.
type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "outline";
  onClick?: () => void;
  type?: "button" | "submit";
};

const baseStyle: CSSProperties = {
  padding: "0.75rem 1.5rem",
  border: "none",
  borderRadius: "var(--radius-md)",
  fontFamily: "var(--font-body)",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "background 0.2s ease",
};

const variantStyle: Record<NonNullable<ButtonProps["variant"]>, CSSProperties> = {
  primary: {
    background: "var(--color-accent)",
    color: "var(--color-text)",
  },
  outline: {
    background: "transparent",
    color: "var(--color-text)",
    border: "1px solid var(--color-gold)",
  },
};

const Button = ({ children, variant = "primary", onClick, type = "button" }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} style={{ ...baseStyle, ...variantStyle[variant] }}>
      {children}
    </button>
  );
};

export default Button;
