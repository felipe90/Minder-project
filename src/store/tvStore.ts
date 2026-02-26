import { create } from 'zustand';
import type { TvShow, Genre, DiscoverFilters } from '../services/types';
import { imdbService } from '../services/tmdbService';

interface TvStore {
  tvShows: TvShow[];
  genres: Genre[];
  selectedTvShow: TvShow | null;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;

  // Actions
  fetchPopularTvShows: () => Promise<void>;
  fetchTvGenres: () => Promise<void>;
  discoverTvShows: (filters: DiscoverFilters) => Promise<void>;
  searchTvShows: (query: string) => Promise<void>;
  setSelectedTvShow: (tvShow: TvShow | null) => void;
  setError: (error: string | null) => void;
  clearTvShows: () => void;
}

export const useTvStore = create<TvStore>((set) => ({
  tvShows: [],
  genres: [],
  selectedTvShow: null,
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,

  fetchPopularTvShows: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await imdbService.getPopularTvShows();
      set({
        tvShows: response.results || [],
        error: null,
      });
    } catch (error) {
      set({ error: 'Failed to fetch popular TV shows' });
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTvGenres: async () => {
    try {
      const response = await imdbService.getTvGenres();
      set({ genres: response.genres });
    } catch (error) {
      set({ error: 'Failed to fetch TV genres' });
      console.error(error);
    }
  },

  discoverTvShows: async (filters: DiscoverFilters) => {
    set({ isLoading: true, error: null });
    try {
      const response = await imdbService.discoverTv({
        sort_by: filters.sort_by || 'SORT_BY_POPULARITY',
        ...filters,
      });
      set({
        tvShows: response.results || [],
        error: null,
      });
    } catch (error) {
      set({ error: 'Failed to discover TV shows' });
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  searchTvShows: async (query: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await imdbService.searchTitles(query);
      set({
        tvShows: response.results || [],
        error: null,
      });
    } catch (error) {
      set({ error: 'Failed to search TV shows' });
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedTvShow: (tvShow) => set({ selectedTvShow: tvShow }),

  setError: (error) => set({ error }),

  clearTvShows: () => set({ tvShows: [], selectedTvShow: null }),
}));
