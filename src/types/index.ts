export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  avatar?: string;
}

export interface Genre {
  id: string;
  name: string;
}

export interface Film {
  id: string;
  title: string;
  description: string;
  release_date: string;
  poster_url: string;
  trailer_url?: string;
  genre_id: string;
  genre?: Genre;
  rating?: number;
  director?: string;
  cast?: string[];
  duration?: number;
  language?: string;
  format?: string[];
}

export interface Review {
  id: string;
  film_id: string;
  user_id: string;
  user?: User;
  content: string;
  rating: number;
  created_at: string;
  reactions?: Reaction[];
}

export interface Reaction {
  id: string;
  review_id: string;
  user_id: string;
  type: 'like' | 'dislike';
}

export interface FilmList {
  id: string;
  user_id: string;
  name: string;
  is_public: boolean;
  films?: Film[];
}

export interface AuthResponse {
  token: string;
  user: User;
}
