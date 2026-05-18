// Type partage cote front (correspond au schema BDD cote back).
export type CourseType = "collectif" | "individuel" | "enfant_collectif" | "enfant_individuel";

export type Course = {
  id: number;
  title: string;
  description: string | null;
  type: CourseType;
  price: number;
  capacity: number;
  start_at: string;
  duration_minutes: number;
  visio_url: string | null;
  created_by: number;
};
