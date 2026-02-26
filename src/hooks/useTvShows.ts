import { useQuery } from '@tanstack/react-query';
import { imdbService } from '../services/tmdbService';
import type { DiscoverFilters } from '../services/types';

// Fetch popular TV shows
export const usePopularTvShows = (limit = 50) => {
  return useQuery({
    queryKey: ['tvshows', 'popular', limit],
    queryFn: () => imdbService.getPopularTvShows(limit),
    staleTime: 1000 * 60 * 5,
  });
};

// Fetch newest TV shows
export const useNewestTvShows = (limit = 50) => {
  return useQuery({
    queryKey: ['tvshows', 'newest', limit],
    queryFn: async () => {
      const response = await imdbService.discoverTv({
        sort_by: 'SORT_BY_RELEASE_DATE',
      });
      return response;
    },
    staleTime: 1000 * 60 * 5,
  });
};

// Discover TV shows with filters
export const useDiscoverTvShows = (filters: DiscoverFilters) => {
  const filterKey = JSON.stringify(filters);
  return useQuery({
    queryKey: ['tvshows', 'discover', filterKey],
    queryFn: () =>
      imdbService.discoverTv({
        sort_by: filters.sort_by || 'SORT_BY_POPULARITY',
        ...filters,
      }),
    staleTime: 1000 * 60 * 5,
  });
};

// Search TV shows
export const useSearchTvShows = (query: string | null) => {
  return useQuery({
    queryKey: ['tvshows', 'search', query],
    queryFn: () => imdbService.searchTitles(query || ''),
    enabled: !!query,
    staleTime: 1000 * 60 * 10,
  });
};

// Get TV show genres
export const useTvGenres = () => {
  return useQuery({
    queryKey: ['tvshows', 'genres'],
    queryFn: () => imdbService.getTvGenres(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
