import { create } from 'zustand';
import type { Movie, Genre, DiscoverFilters } from '../services/types';
import { imdbService } from '../services/tmdbService';

interface MovieStore {
  movies: Movie[];
  newestMovies: Movie[];
  genres: Genre[];
  selectedMovie: Movie | null;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;

  // Actions
  fetchPopularMovies: () => Promise<void>;
  fetchNewestMovies: () => Promise<void>;
  fetchMovieGenres: () => Promise<void>;
  discoverMovies: (filters: DiscoverFilters) => Promise<void>;
  searchMovies: (query: string) => Promise<void>;
  setSelectedMovie: (movie: Movie | null) => void;
  setError: (error: string | null) => void;
  clearMovies: () => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  movies: [],
  newestMovies: [],
  genres: [],
  selectedMovie: null,
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,

  fetchPopularMovies: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await imdbService.getPopularMovies();
      set({
        movies: response.results || [],
        error: null,
      });
    } catch {
      set({ error: 'Failed to fetch popular movies' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchNewestMovies: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await imdbService.discoverMovies({
        sort_by: 'SORT_BY_RELEASE_DATE',
      });
      set({
        newestMovies: response.results || [],
        error: null,
      });
    } catch {
      set({ error: 'Failed to fetch newest movies' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMovieGenres: async () => {
    try {
      const response = await imdbService.getMovieGenres();
      set({ genres: response.genres });
    } catch {
      set({ error: 'Failed to fetch movie genres' });
    }
  },

  discoverMovies: async (filters: DiscoverFilters) => {
    set({ isLoading: true, error: null });
    try {
      const response = await imdbService.discoverMovies({
        sort_by: filters.sort_by || 'SORT_BY_POPULARITY',
        ...filters,
      });
      set({
        movies: response.results || [],
        error: null,
      });
    } catch {
      set({ error: 'Failed to discover movies' });
    } finally {
      set({ isLoading: false });
    }
  },

  searchMovies: async (query: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await imdbService.searchTitles(query);
      set({
        movies: response.results || [],
        error: null,
      });
    } catch {
      set({ error: 'Failed to search movies' });
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedMovie: (movie) => set({ selectedMovie: movie }),

  setError: (error) => set({ error }),

  clearMovies: () => set({ movies: [], selectedMovie: null }),
}));
