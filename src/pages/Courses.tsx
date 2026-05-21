import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button.js";
import Card from "../components/ui/Card.js";
import VideoPlayer from "../components/ui/VideoPlayer.js";
import { useAuth } from "../context/AuthContext.js";
import { createBooking } from "../services/bookingsService.js";
import { fetchCourses } from "../services/coursesService.js";
import { fetchPublicVideos } from "../services/videosService.js";
import type { Course } from "../types/Course.js";
import type { Video } from "../types/Video.js";

// Page "Decouvrir les cours" : tarifs + videos demo + sessions a venir + bouton reserver.
const Courses = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Feedback par cours apres tentative de reservation.
  const [feedback, setFeedback] = useState<Record<number, string>>({});

  useEffect(() => {
    // Charge en parallele les cours et les videos publiques.
    Promise.all([fetchCourses(), fetchPublicVideos()])
      .then(([c, v]) => {
        setCourses(c);
        setVideos(v);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleBook = async (courseId: number) => {
    if (!user || !token) {
      navigate("/connexion");
      return;
    }
    try {
      await createBooking(token, courseId);
      setFeedback((prev) => ({ ...prev, [courseId]: "Réservation créée — voir Mon espace" }));
    } catch (err) {
      setFeedback((prev) => ({
        ...prev,
        [courseId]: err instanceof Error ? err.message : "Erreur",
      }));
    }
  };

  return (
    <section
      style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 1100, margin: "0 auto" }}
    >
      <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "var(--space-xl)" }}>
        Découvrir les cours
      </h1>

      <div
        style={{
          display: "grid",
          gap: "var(--space-lg)",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        <Card title="Tarifs">
          <ul style={{ listStyle: "none", lineHeight: 2 }}>
            <li>Cours collectifs : 20€ / heure</li>
            <li>Cours individuels : 40€ / heure</li>
            <li>Cours enfants : 10€ / h (collectif), 20€ / h (individuel)</li>
          </ul>
        </Card>

        <Card title="Cours">
          <p>
            Des cours de danse orientale en ligne, accessibles à tous les niveaux. Les réservations
            doivent être effectuées au minimum une semaine à l'avance.
          </p>
          <p style={{ marginTop: "var(--space-md)" }}>
            Les cours collectifs sont limités à <strong>10 personnes</strong>. Les cours enfants
            sont accessibles à partir de <strong>6 ans</strong>.
          </p>
        </Card>
      </div>

      {videos.length > 0 && (
        <>
          <h2 style={{ textAlign: "center", marginTop: "var(--space-xl)", fontSize: "2rem" }}>
            Vidéos de démonstration
          </h2>
          <div
            style={{
              display: "grid",
              gap: "var(--space-md)",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              marginTop: "var(--space-lg)",
            }}
          >
            {videos.map((v) => (
              <div key={v.id}>
                <VideoPlayer url={v.url} title={v.title} />
                <p style={{ marginTop: "var(--space-sm)", textAlign: "center" }}>{v.title}</p>
              </div>
            ))}
          </div>
        </>
      )}

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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "var(--space-sm)",
              }}
            >
              <div>
                <h3>{course.title}</h3>
                <p style={{ color: "var(--color-text-muted)" }}>
                  {new Date(course.start_at).toLocaleString("fr-FR")} · {course.duration_minutes}{" "}
                  min · {course.price}€
                </p>
                {feedback[course.id] && (
                  <p style={{ color: "var(--color-gold)", marginTop: "var(--space-sm)" }}>
                    {feedback[course.id]}
                  </p>
                )}
              </div>
              <Button onClick={() => handleBook(course.id)}>Réserver</Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Courses;
