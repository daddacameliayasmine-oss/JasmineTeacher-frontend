import { type FormEvent, useState } from "react";
import type { CourseInput } from "../../services/coursesService.js";
import type { CourseType } from "../../types/Course.js";
import Button from "../ui/Button.js";

// Style partage pour tous les inputs du formulaire.
const inputStyle = {
  padding: "0.5rem 0.75rem",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--color-border)",
  background: "rgba(255, 255, 255, 0.05)",
  color: "var(--color-text)",
  fontFamily: "inherit",
};

type Props = {
  // Si fourni, le formulaire est en mode "edition" (pre-rempli).
  initial?: CourseInput;
  onSubmit: (input: CourseInput) => Promise<void>;
};

const emptyInput: CourseInput = {
  title: "",
  description: "",
  type: "collectif",
  price: 20,
  capacity: 10,
  start_at: "",
  duration_minutes: 60,
  visio_url: "",
};

// Formulaire de creation / modification d'un cours, reutilise dans le dashboard admin.
const CourseForm = ({ initial, onSubmit }: Props) => {
  const [form, setForm] = useState<CourseInput>(initial ?? emptyInput);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Helper qui retourne un updater immuable pour un champ donne.
  const update =
    <K extends keyof CourseInput>(field: K) =>
    (value: CourseInput[K]) =>
      setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit(form);
      setForm(emptyInput);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "var(--space-md)" }}>
      <input
        style={inputStyle}
        placeholder="Titre"
        value={form.title}
        onChange={(e) => update("title")(e.target.value)}
        required
      />
      <textarea
        style={inputStyle}
        placeholder="Description"
        rows={3}
        value={form.description ?? ""}
        onChange={(e) => update("description")(e.target.value)}
      />
      <select
        style={inputStyle}
        value={form.type}
        onChange={(e) => update("type")(e.target.value as CourseType)}
      >
        <option value="collectif">Collectif (20€/h)</option>
        <option value="individuel">Individuel (40€/h)</option>
        <option value="enfant_collectif">Enfant collectif (10€/h)</option>
        <option value="enfant_individuel">Enfant individuel (20€/h)</option>
      </select>
      <input
        style={inputStyle}
        type="number"
        placeholder="Prix"
        value={form.price}
        onChange={(e) => update("price")(Number(e.target.value))}
        required
        min={0}
      />
      <input
        style={inputStyle}
        type="number"
        placeholder="Capacité"
        value={form.capacity}
        onChange={(e) => update("capacity")(Number(e.target.value))}
        required
        min={1}
      />
      <input
        style={inputStyle}
        type="datetime-local"
        value={form.start_at}
        onChange={(e) => update("start_at")(e.target.value)}
        required
      />
      <input
        style={inputStyle}
        type="number"
        placeholder="Durée (min)"
        value={form.duration_minutes}
        onChange={(e) => update("duration_minutes")(Number(e.target.value))}
        required
        min={15}
      />
      <input
        style={inputStyle}
        placeholder="URL visio (optionnel)"
        value={form.visio_url ?? ""}
        onChange={(e) => update("visio_url")(e.target.value)}
      />
      {error && <p style={{ color: "salmon" }}>{error}</p>}
      <Button type="submit">{submitting ? "Envoi…" : "Enregistrer"}</Button>
    </form>
  );
};

export default CourseForm;
