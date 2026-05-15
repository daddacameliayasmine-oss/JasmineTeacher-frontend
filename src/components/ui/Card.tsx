import type { CSSProperties, ReactNode } from "react";

// Carte sombre utilisee pour les blocs "Tarifs", "Cours", "Contact" etc.
type CardProps = {
  children: ReactNode;
  title?: string;
};

const cardStyle: CSSProperties = {
  background: "var(--color-surface)",
  padding: "var(--space-lg)",
  borderRadius: "var(--radius-lg)",
  border: "1px solid var(--color-border)",
  boxShadow: "var(--shadow-md)",
};

const titleStyle: CSSProperties = {
  fontFamily: "var(--font-heading)",
  fontSize: "1.75rem",
  marginBottom: "var(--space-md)",
  textAlign: "center",
};

const Card = ({ children, title }: CardProps) => {
  return (
    <div style={cardStyle}>
      {title && <h2 style={titleStyle}>{title}</h2>}
      {children}
    </div>
  );
};

export default Card;
