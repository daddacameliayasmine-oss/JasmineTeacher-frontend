import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.js";
import type { CourseInput } from "../../services/coursesService.js";
import * as coursesService from "../../services/coursesService.js";
import type { Course } from "../../types/Course.js";
import Button from "../ui/Button.js";
import Card from "../ui/Card.js";
import CourseForm from "./CourseForm.js";

// Convertit un cours BDD en input pre-rempli pour le formulaire de modification.
// L'input datetime-local attend le format "YYYY-MM-DDTHH:mm".
// MySQL renvoie les colonnes DECIMAL en string : on force Number() pour que la
// validation back (typeof === "number") ne rejette pas la requete avec 400.
const toInput = (c: Course): CourseInput => ({
  title: c.title,
  description: c.description,
  type: c.type,
  price: Number(c.price),
  capacity: Number(c.capacity),
  start_at: new Date(c.start_at).toISOString().slice(0, 16),
  duration_minutes: Number(c.duration_minutes),
  visio_url: c.visio_url,
});

// Onglet "Cours" : creation, modification (toggle inline) et suppression.
const AdminCoursesTab = () => {
  const { token } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // ID du cours en cours d'edition (null = pas d'edition active).
  const [editingId, setEditingId] = useState<number | null>(null);

  const refresh = () => {
    setLoading(true);
    coursesService
      .fetchCourses()
      .then(setCourses)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(refresh, []);

  const handleCreate = async (input: CourseInput) => {
    if (!token) return;
    await coursesService.createCourse(token, input);
    refresh();
  };

  const handleUpdate = (id: number) => async (input: CourseInput) => {
    if (!token) return;
    await coursesService.updateCourse(token, id, input);
    setEditingId(null);
    refresh();
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    await coursesService.deleteCourse(token, id);
    refresh();
  };

  return (
    <div
      style={{
        display: "grid",
        gap: "var(--space-lg)",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      }}
    >
      <Card title="Nouveau cours">
        <CourseForm onSubmit={handleCreate} />
      </Card>

      <Card title="Cours existants">
        {loading && <p>Chargement…</p>}
        {error && <p style={{ color: "salmon" }}>{error}</p>}
        {!loading && courses.length === 0 && <p>Aucun cours.</p>}
        <div style={{ display: "grid", gap: "var(--space-sm)" }}>
          {courses.map((c) => (
            <div
              key={c.id}
              style={{
                padding: "var(--space-sm)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
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
                  <strong>{c.title}</strong>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
                    {new Date(c.start_at).toLocaleString("fr-FR")} · {c.price}€
                  </p>
                </div>
                <div style={{ display: "flex", gap: "var(--space-sm)" }}>
                  <Button
                    variant="outline"
                    onClick={() => setEditingId(editingId === c.id ? null : c.id)}
                  >
                    {editingId === c.id ? "Annuler" : "Modifier"}
                  </Button>
                  <Button variant="outline" onClick={() => handleDelete(c.id)}>
                    Supprimer
                  </Button>
                </div>
              </div>
              {editingId === c.id && (
                <div style={{ marginTop: "var(--space-md)" }}>
                  <CourseForm initial={toInput(c)} onSubmit={handleUpdate(c.id)} />
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminCoursesTab;
