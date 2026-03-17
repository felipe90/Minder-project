import axios from 'axios';
import { IMDB_CONFIG, TITLE_TYPES } from './config';
import type {
  Movie,
  DiscoverFilters,
  ImdbApiTitle,
  ImdbApiResponse,
  ImdbApiInterestsResponse,
  Image,
} from './types';

const api = axios.create({
  baseURL: IMDB_CONFIG.BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
});

interface QueryParams {
  types: string;
  sortBy: string;
  sortOrder: string;
  limit: number;
  startYear?: number;
  endYear?: number;
  genres?: string | number;
  query?: string;
}

const ALLOWED_SORT_OPTIONS = [
  'SORT_BY_POPULARITY',
  'SORT_BY_RELEASE_DATE',
  'SORT_BY_USER_RATING',
  'SORT_BY_USER_RATING_COUNT',
  'SORT_BY_YEAR',
];

const validateFilters = (filters: DiscoverFilters): DiscoverFilters => {
  const validated: DiscoverFilters = {};

  if (filters.sort_by && ALLOWED_SORT_OPTIONS.includes(filters.sort_by)) {
    validated.sort_by = filters.sort_by;
  } else {
    validated.sort_by = 'SORT_BY_POPULARITY';
  }

  if (filters.primary_release_year) {
    const year = Number(filters.primary_release_year);
    if (!isNaN(year) && year >= 1900 && year <= new Date().getFullYear() + 1) {
      validated.primary_release_year = year;
    }
  }

  if (filters.with_genres) {
    const genres = typeof filters.with_genres === 'string' 
      ? filters.with_genres.replace(/[^0-9,]/g, '')
      : filters.with_genres;
    if (genres) {
      validated.with_genres = genres;
    }
  }

  return validated;
};

const transformTitle = (data: ImdbApiTitle): Movie => ({
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
    const validated = validateFilters(filters);
    const params: QueryParams = {
      types: TITLE_TYPES.MOVIE,
      sortBy: validated.sort_by || 'SORT_BY_POPULARITY',
      sortOrder: 'DESC',
      limit: 50,
    };

    if (validated.primary_release_year) {
      params.startYear = validated.primary_release_year;
      params.endYear = validated.primary_release_year;
    }

    if (validated.with_genres) {
      params.genres = validated.with_genres;
    }

    const { data } = await api.get<ImdbApiResponse>('/titles', { params });
    return {
      ...data,
      results: data.titles?.map(transformTitle) || [],
    };
  },

  getMovieGenres: async () => {
    const { data } = await api.get<ImdbApiInterestsResponse>('/interests');
    return {
      genres: data.categories?.flatMap((cat) => cat.interests) || [],
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
    const validated = validateFilters(filters);
    const params: QueryParams = {
      types: TITLE_TYPES.TV_SERIES,
      sortBy: validated.sort_by || 'SORT_BY_POPULARITY',
      sortOrder: 'DESC',
      limit: 50,
    };

    if (validated.primary_release_year) {
      params.startYear = validated.primary_release_year;
      params.endYear = validated.primary_release_year;
    }

    if (validated.with_genres) {
      params.genres = validated.with_genres;
    }

    const { data } = await api.get<ImdbApiResponse>('/titles', { params });
    return {
      ...data,
      results: data.titles?.map(transformTitle) || [],
    };
  },

  getTvGenres: async () => {
    const { data } = await api.get<ImdbApiInterestsResponse>('/interests');
    return {
      genres: data.categories?.flatMap((cat) => cat.interests) || [],
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
  getImageUrl: (image: Image | undefined) => {
    if (!image?.url) return '/placeholder-image.png';
    return image.url;
  },
};
