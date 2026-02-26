export interface Image {
  url: string;
  width?: number;
  height?: number;
}

export interface Movie {
  id: string;          // Format: "tt1234567"
  primaryTitle: string;
  originalTitle?: string;
  primaryImage: Image;
  plot?: string;
  startYear: number;
  endYear?: number;
  runtimeSeconds?: number;
  genres: string[];    // ["Action", "Adventure"]
  rating?: {
    aggregateRating: number;
    voteCount: number;
  };
}

export interface TvShow {
  id: string;          // Format: "tt1234567"
  primaryTitle: string;
  originalTitle?: string;
  primaryImage: Image;
  plot?: string;
  startYear: number;
  endYear?: number;
  runtimeSeconds?: number;
  genres: string[];    // ["Drama", "Comedy"]
  rating?: {
    aggregateRating: number;
    voteCount: number;
  };
}

export interface Genre {
  id: string;
  name: string;
  description?: string;
  isSubgenre?: boolean;
}

export interface DiscoverFilters {
  page?: number;
  sort_by?: string;
  primary_release_year?: number;
  with_genres?: number | string;
}

export interface RatingData {
  itemId: number;
  itemType: 'movie' | 'tv';
  rating: number;
  timestamp: string;
}

export interface ApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface GenreResponse {
  genres: Genre[];
}
