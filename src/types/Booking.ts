// Reservation enrichie renvoyee par GET /api/bookings/me (JOIN courses).
export type BookingWithCourse = {
  id: number;
  user_id: number;
  course_id: number;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
  course_title: string;
  course_start_at: string;
  course_price: number;
  course_visio_url: string | null;
};
