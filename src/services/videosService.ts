import type { Video, VideoInput } from "../types/Video.js";
import { apiFetch } from "./apiClient.js";

// Service videos : vitrine publique + gestion admin.

// GET /api/videos — vitrine visiteur (is_public = TRUE).
export const fetchPublicVideos = (): Promise<Video[]> => {
  return apiFetch<Video[]>("/videos");
};

// GET /api/videos/all — toutes les videos (eleves + admin).
export const fetchAllVideos = (token: string): Promise<Video[]> => {
  return apiFetch<Video[]>("/videos/all", { token });
};

export const createVideo = (token: string, input: VideoInput): Promise<Video> => {
  return apiFetch<Video>("/videos", { method: "POST", body: input, token });
};

export const deleteVideo = (token: string, id: number): Promise<void> => {
  return apiFetch<void>(`/videos/${id}`, { method: "DELETE", token });
};
