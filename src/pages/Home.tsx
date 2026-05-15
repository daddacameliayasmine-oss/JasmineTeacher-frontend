import { Link } from "react-router-dom";
import Button from "../components/ui/Button.js";

// Page d'accueil — hero plein ecran avec background danseuse (wireframe Frame 1).
const Home = () => {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "calc(100vh - 70px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-xl) var(--space-lg)",
        // Overlay sombre + image en cover pour assurer la lisibilite du texte.
        backgroundImage:
          "linear-gradient(rgba(26, 14, 14, 0.65), rgba(26, 14, 14, 0.85)), url('/assets/background2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div style={{ maxWidth: 800, textAlign: "center", display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
        <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 500, letterSpacing: "0.05em" }}>
          Jasmine Teacher
        </h1>
        <p style={{ fontSize: "1.25rem", color: "var(--color-text-muted)", lineHeight: 1.7 }}>
          Pas de cours accessibles près de chez vous ?<br />
          Découvrez nos cours de danse orientale en ligne, accessibles et adaptés à votre niveau.
        </p>
        <div style={{ display: "flex", gap: "var(--space-md)", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/cours">
            <Button>Découvrir les cours</Button>
          </Link>
          <Link to="/inscription">
            <Button variant="outline">S'inscrire</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
