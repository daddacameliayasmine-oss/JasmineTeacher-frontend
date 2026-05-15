import { useEffect, useState } from "react";
import Card from "../components/ui/Card.js";
import { fetchCourses } from "../services/coursesService.js";
import type { Course } from "../types/Course.js";

// Page "Decouvrir les cours" : tarifs (statiques) + cours dispo (API) + videos demo.
const Courses = () => {
  // State des cours charges depuis l'API.
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses()
      .then(setCourses)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "var(--space-xl)" }}>
        Découvrir les cours
      </h1>

      <div style={{ display: "grid", gap: "var(--space-lg)", gridTemplateColumns: "1fr 1fr" }}>
        <Card title="Tarifs">
          <ul style={{ listStyle: "none", lineHeight: 2 }}>
            <li>Cours collectifs : 20€ / heure</li>
            <li>Cours individuels : 40€ / heure</li>
            <li>Cours enfants : 10€ / h (collectif), 20€ / h (individuel)</li>
          </ul>
        </Card>

        <Card title="Cours">
          <p>
            Des cours de danse orientale en ligne, accessibles à tous les niveaux. Les
            réservations doivent être effectuées au minimum une semaine à l'avance.
          </p>
          <p style={{ marginTop: "var(--space-md)" }}>
            Les cours collectifs sont limités à <strong>10 personnes</strong>. Les cours enfants
            sont accessibles à partir de <strong>6 ans</strong>.
          </p>
        </Card>
      </div>

      <h2 style={{ textAlign: "center", marginTop: "var(--space-xl)", fontSize: "2rem" }}>
        Prochaines sessions
      </h2>
      {loading && <p style={{ textAlign: "center" }}>Chargement…</p>}
      {error && <p style={{ textAlign: "center", color: "salmon" }}>Erreur : {error}</p>}
      {!loading && !error && courses.length === 0 && (
        <p style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
          Aucune session prévue pour le moment.
        </p>
      )}
      <div style={{ display: "grid", gap: "var(--space-md)", marginTop: "var(--space-lg)" }}>
        {courses.map((course) => (
          <Card key={course.id}>
            <h3>{course.title}</h3>
            <p style={{ color: "var(--color-text-muted)" }}>
              {new Date(course.start_at).toLocaleString("fr-FR")} · {course.duration_minutes} min ·{" "}
              {course.price}€
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Courses;
