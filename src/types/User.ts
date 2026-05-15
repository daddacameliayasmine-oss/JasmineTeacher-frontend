// Utilisateur tel que renvoye par le back (sans champs sensibles).
export type User = {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  role: "student" | "admin";
};

// Reponse standard des endpoints register / login.
export type AuthResponse = {
  token: string;
  user: User;
};
