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
      console.log('📥 Fetching popular movies...');
      const response = await imdbService.getPopularMovies();
      console.log('✅ Popular movies fetched:', response);
      set({
        movies: response.results || [],
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch popular movies';
      console.error('❌ Error fetching popular movies:', errorMessage, error);
      set({ error: 'Failed to fetch popular movies' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchNewestMovies: async () => {
    set({ isLoading: true, error: null });
    try {
      console.log('📥 Fetching newest movies...');
      const response = await imdbService.discoverMovies({
        sort_by: 'SORT_BY_RELEASE_DATE',
      });
      console.log('✅ Newest movies fetched:', response);
      set({
        newestMovies: response.results || [],
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch newest movies';
      console.error('❌ Error fetching newest movies:', errorMessage, error);
      set({ error: 'Failed to fetch newest movies' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMovieGenres: async () => {
    try {
      const response = await imdbService.getMovieGenres();
      set({ genres: response.genres });
    } catch (error) {
      set({ error: 'Failed to fetch movie genres' });
      console.error(error);
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
    } catch (error) {
      set({ error: 'Failed to discover movies' });
      console.error(error);
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
    } catch (error) {
      set({ error: 'Failed to search movies' });
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedMovie: (movie) => set({ selectedMovie: movie }),

  setError: (error) => set({ error }),

  clearMovies: () => set({ movies: [], selectedMovie: null }),
}));
