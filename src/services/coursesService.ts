import type { Course } from "../types/Course.js";
import { apiFetch } from "./apiClient.js";

// Service du module cours : abstraction sur l'API REST.
// Les composants React ne devraient jamais appeler fetch directement.

export const fetchCourses = (): Promise<Course[]> => {
  return apiFetch<Course[]>("/courses");
};

export const fetchCourseById = (id: number): Promise<Course> => {
  return apiFetch<Course>(`/courses/${id}`);
};
