import { type FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.js";
import * as videosService from "../../services/videosService.js";
import type { Video } from "../../types/Video.js";
import Button from "../ui/Button.js";
import Card from "../ui/Card.js";

// Style partage pour les inputs du formulaire.
const inputStyle = {
  padding: "0.5rem 0.75rem",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--color-border)",
  background: "rgba(255, 255, 255, 0.05)",
  color: "var(--color-text)",
  fontFamily: "inherit",
};

// Onglet "Videos" : ajout d'URL + listing + suppression.
const AdminVideosTab = () => {
  const { token } = useAuth();
  const [videos, setVideos] = useState<Video[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = () => {
    if (!token) return;
    videosService.fetchAllVideos(token).then(setVideos).catch((e) => setError(e.message));
  };

  useEffect(refresh, [token]);

  const handleAdd = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;
    setError(null);
    try {
      await videosService.createVideo(token, { title, url, is_public: isPublic });
      setTitle("");
      setUrl("");
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    await videosService.deleteVideo(token, id);
    refresh();
  };

  return (
    <div style={{ display: "grid", gap: "var(--space-lg)", gridTemplateColumns: "1fr 1fr" }}>
      <Card title="Ajouter une vidéo">
        <form onSubmit={handleAdd} style={{ display: "grid", gap: "var(--space-md)" }}>
          <input style={inputStyle} placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input style={inputStyle} placeholder="URL (YouTube, MP4…)" value={url} onChange={(e) => setUrl(e.target.value)} required />
          <label style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
            <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
            Visible par les visiteurs (démo publique)
          </label>
          {error && <p style={{ color: "salmon" }}>{error}</p>}
          <Button type="submit">Ajouter</Button>
        </form>
      </Card>

      <Card title="Vidéos existantes">
        {videos.length === 0 && <p>Aucune vidéo.</p>}
        <div style={{ display: "grid", gap: "var(--space-sm)" }}>
          {videos.map((v) => (
            <div
              key={v.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "var(--space-sm)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <div>
                <strong>{v.title}</strong>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
                  {v.is_public ? "Public" : "Élèves uniquement"}
                </p>
              </div>
              <Button variant="outline" onClick={() => handleDelete(v.id)}>
                Supprimer
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminVideosTab;
