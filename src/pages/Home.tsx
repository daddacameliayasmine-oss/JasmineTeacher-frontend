import { Link } from "react-router-dom";

// Page d'accueil — hero avec slogan et CTA principaux.
const Home = () => {
  return (
    <section
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "2rem",
        gap: "1.5rem",
      }}
    >
      <h1 style={{ fontSize: "3rem" }}>Jasmine Teacher</h1>
      <p style={{ maxWidth: "600px", color: "var(--color-text-muted)" }}>
        Pas de cours accessibles près de chez vous ? Découvrez nos cours de danse orientale en
        ligne, accessibles et adaptés à votre niveau.
      </p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link
          to="/cours"
          style={{
            padding: "0.75rem 1.5rem",
            background: "var(--color-accent)",
            color: "var(--color-text)",
            borderRadius: "var(--radius-md)",
          }}
        >
          Découvrir les cours
        </Link>
        <Link
          to="/inscription"
          style={{
            padding: "0.75rem 1.5rem",
            border: "1px solid var(--color-gold)",
            borderRadius: "var(--radius-md)",
          }}
        >
          S'inscrire
        </Link>
      </div>
    </section>
  );
};

export default Home;
