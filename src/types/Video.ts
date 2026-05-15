// Video telle que renvoyee par l'API.
export type Video = {
  id: number;
  title: string;
  url: string;
  is_public: boolean;
  created_at: string;
};

// Entree pour creer une video cote admin.
export type VideoInput = {
  title: string;
  url: string;
  is_public: boolean;
};
