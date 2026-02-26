import axios from 'axios';
import { IMDB_CONFIG, TITLE_TYPES } from './config';
import type {
  Movie,
  DiscoverFilters,
} from './types';

const api = axios.create({
  baseURL: IMDB_CONFIG.BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use((config) => {
  console.log('🔵 API Request:', {
    url: (config.baseURL || '') + (config.url || ''),
    params: config.params,
  });
  return config;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('🟢 API Response:', response.data);
    return response;
  },
  (error) => {
    console.error('🔴 API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

// Transform IMDb response to our Movie type
const transformTitle = (data: any): Movie => ({
  id: data.id,
  primaryTitle: data.primaryTitle,
  originalTitle: data.originalTitle,
  primaryImage: data.primaryImage || { url: '' },
  plot: data.plot,
  startYear: data.startYear,
  endYear: data.endYear,
  runtimeSeconds: data.runtimeSeconds,
  genres: data.genres || [],
  rating: data.rating,
});

export const imdbService = {
  // Movies
  getPopularMovies: async (limit = 50) => {
    const { data } = await api.get('/titles', {
      params: {
        types: TITLE_TYPES.MOVIE,
        sortBy: 'SORT_BY_POPULARITY',
        sortOrder: 'DESC',
        limit,
      },
    });
    return {
      ...data,
      results: data.titles?.map(transformTitle) || [],
    };
  },

  discoverMovies: async (filters: DiscoverFilters) => {
    const params: any = {
      types: TITLE_TYPES.MOVIE,
      sortBy: filters.sort_by || 'SORT_BY_POPULARITY',
      sortOrder: 'DESC',
      limit: 50,
    };

    if (filters.primary_release_year) {
      params.startYear = filters.primary_release_year;
      params.endYear = filters.primary_release_year;
    }

    if (filters.with_genres) {
      params.genres = filters.with_genres;
    }

    const { data } = await api.get('/titles', { params });
    return {
      ...data,
      results: data.titles?.map(transformTitle) || [],
    };
  },

  getMovieGenres: async () => {
    const { data } = await api.get('/interests');
    return {
      genres: data.categories?.flatMap((cat: any) => cat.interests) || [],
    };
  },

  // TV Shows
  getPopularTvShows: async (limit = 50) => {
    const { data } = await api.get('/titles', {
      params: {
        types: TITLE_TYPES.TV_SERIES,
        sortBy: 'SORT_BY_POPULARITY',
        sortOrder: 'DESC',
        limit,
      },
    });
    return {
      ...data,
      results: data.titles?.map(transformTitle) || [],
    };
  },

  discoverTv: async (filters: DiscoverFilters) => {
    const params: any = {
      types: TITLE_TYPES.TV_SERIES,
      sortBy: filters.sort_by || 'SORT_BY_POPULARITY',
      sortOrder: 'DESC',
      limit: 50,
    };

    if (filters.primary_release_year) {
      params.startYear = filters.primary_release_year;
      params.endYear = filters.primary_release_year;
    }

    if (filters.with_genres) {
      params.genres = filters.with_genres;
    }

    const { data } = await api.get('/titles', { params });
    return {
      ...data,
      results: data.titles?.map(transformTitle) || [],
    };
  },

  getTvGenres: async () => {
    const { data } = await api.get('/interests');
    return {
      genres: data.categories?.flatMap((cat: any) => cat.interests) || [],
    };
  },

  // Search
  searchTitles: async (query: string, limit = 50) => {
    const { data } = await api.get('/search/titles', {
      params: { query, limit },
    });
    return {
      ...data,
      results: data.titles?.map(transformTitle) || [],
    };
  },

  // Title details
  getTitle: async (titleId: string) => {
    const { data } = await api.get(`/titles/${titleId}`);
    return transformTitle(data);
  },

  // Credits
  getTitleCredits: async (titleId: string) => {
    const { data } = await api.get(`/titles/${titleId}/credits`);
    return data;
  },

  // Utilities
  getImageUrl: (image: any) => {
    if (!image?.url) return '/placeholder-image.png';
    return image.url;
  },
};
