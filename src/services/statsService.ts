import { apiFetch } from "./apiClient.js";

// KPIs renvoyes par GET /api/stats.
export type AdminStats = {
  total_students: number;
  total_courses: number;
  upcoming_courses: number;
  active_bookings: number;
  revenue_paid: number;
};

export const fetchAdminStats = (token: string): Promise<AdminStats> => {
  return apiFetch<AdminStats>("/stats", { token });
};
