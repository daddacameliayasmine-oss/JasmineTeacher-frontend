import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.js";
import Footer from "./components/layout/Footer.js";
import Header from "./components/layout/Header.js";
import About from "./pages/About.js";
import AdminDashboard from "./pages/AdminDashboard.js";
import Contact from "./pages/Contact.js";
import Courses from "./pages/Courses.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Profile from "./pages/Profile.js";
import Register from "./pages/Register.js";
import StudentSpace from "./pages/StudentSpace.js";

// Composant racine : layout commun (header + footer) + table des routes.
const App = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cours" element={<Courses />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          <Route
            path="/mon-espace"
            element={
              <ProtectedRoute>
                <StudentSpace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profil"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
