import { Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer.js";
import Header from "./components/layout/Header.js";
import Home from "./pages/Home.js";

// Composant racine : layout commun (header + footer) + table des routes.
const App = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Les autres routes (cours, à propos, contact, connexion, inscription)
              seront ajoutées dans des PR dédiées. */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
