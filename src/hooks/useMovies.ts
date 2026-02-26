import { useQuery } from '@tanstack/react-query';
import { imdbService } from '../services/tmdbService';
import type { DiscoverFilters } from '../services/types';

// Fetch popular movies
export const usePopularMovies = (limit = 50) => {
  return useQuery({
    queryKey: ['movies', 'popular', limit],
    queryFn: () => imdbService.getPopularMovies(limit),
    staleTime: 1000 * 60 * 5,
  });
};

// Fetch newest movies
export const useNewestMovies = (limit = 50) => {
  return useQuery({
    queryKey: ['movies', 'newest', limit],
    queryFn: async () => {
      const response = await imdbService.discoverMovies({
        sort_by: 'SORT_BY_RELEASE_DATE',
      });
      return response;
    },
    staleTime: 1000 * 60 * 5,
  });
};

// Discover movies with filters
export const useDiscoverMovies = (filters: DiscoverFilters) => {
  const filterKey = JSON.stringify(filters);
  return useQuery({
    queryKey: ['movies', 'discover', filterKey],
    queryFn: () =>
      imdbService.discoverMovies({
        sort_by: filters.sort_by || 'SORT_BY_POPULARITY',
        ...filters,
      }),
    staleTime: 1000 * 60 * 5,
  });
};

// Search movies
export const useSearchMovies = (query: string | null) => {
  return useQuery({
    queryKey: ['movies', 'search', query],
    queryFn: () => imdbService.searchTitles(query || ''),
    enabled: !!query,
    staleTime: 1000 * 60 * 10,
  });
};

// Get movie genres
export const useMovieGenres = () => {
  return useQuery({
    queryKey: ['movies', 'genres'],
    queryFn: () => imdbService.getMovieGenres(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
