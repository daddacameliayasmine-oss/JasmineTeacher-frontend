import type { Course } from "../types/Course.js";
import { apiFetch } from "./apiClient.js";

// Service du module cours : abstraction sur l'API REST.
// Les composants React ne devraient jamais appeler fetch directement.

// Donnees d'entree pour la creation ou modification (sans id ni created_by).
export type CourseInput = Omit<Course, "id" | "created_by">;

export const fetchCourses = (): Promise<Course[]> => {
  return apiFetch<Course[]>("/courses");
};

export const fetchCourseById = (id: number): Promise<Course> => {
  return apiFetch<Course>(`/courses/${id}`);
};

export const createCourse = (token: string, input: CourseInput): Promise<Course> => {
  return apiFetch<Course>("/courses", { method: "POST", body: input, token });
};

export const updateCourse = (token: string, id: number, input: CourseInput): Promise<Course> => {
  return apiFetch<Course>(`/courses/${id}`, { method: "PUT", body: input, token });
};

export const deleteCourse = (token: string, id: number): Promise<void> => {
  return apiFetch<void>(`/courses/${id}`, { method: "DELETE", token });
};
