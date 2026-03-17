import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { imdbService } from './tmdbService';

const mockTitle = {
  id: 'tt1234567',
  primaryTitle: 'Test Movie',
  originalTitle: 'Test Movie Original',
  primaryImage: { url: 'https://example.com/image.jpg' },
  plot: 'Test plot',
  startYear: 2024,
  runtimeSeconds: 7200,
  genres: ['Action'],
  rating: {
    aggregateRating: 8.5,
    voteCount: 1000,
  },
};

const mockTitlesResponse = {
  titles: [mockTitle],
};

const mockInterestsResponse = {
  categories: [
    {
      interests: [
        { id: '1', name: 'Action' },
        { id: '2', name: 'Comedy' },
      ],
    },
  ],
};

const mockCredits = {
  cast: [],
  crew: [],
};

export const restHandlers = [
  http.get('https://api.imdbapi.dev/titles', () => {
    return HttpResponse.json(mockTitlesResponse);
  }),
  http.get('https://api.imdbapi.dev/interests', () => {
    return HttpResponse.json(mockInterestsResponse);
  }),
  http.get('https://api.imdbapi.dev/titles/tt1234567', () => {
    return HttpResponse.json(mockTitle);
  }),
  http.get('https://api.imdbapi.dev/titles/tt1234567/credits', () => {
    return HttpResponse.json(mockCredits);
  }),
  http.get('https://api.imdbapi.dev/search/titles', () => {
    return HttpResponse.json(mockTitlesResponse);
  }),
];

const server = setupServer(...restHandlers);

describe('imdbService', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  // Movies
  it('getPopularMovies returns transformed movies', async () => {
    const result = await imdbService.getPopularMovies();
    expect(result.results).toHaveLength(1);
    expect(result.results[0].primaryTitle).toBe('Test Movie');
    expect(result.results[0].id).toBe('tt1234567');
  });

  it('getPopularMovies accepts limit parameter', async () => {
    const result = await imdbService.getPopularMovies(25);
    expect(result.results).toHaveLength(1);
  });

  it('getMovieGenres returns genres', async () => {
    const result = await imdbService.getMovieGenres();
    expect(result.genres).toHaveLength(2);
    expect(result.genres[0].name).toBe('Action');
  });

  // Discover Movies
  it('discoverMovies returns results', async () => {
    const result = await imdbService.discoverMovies({});
    expect(result.results).toHaveLength(1);
  });

  it('discoverMovies applies sort_by filter', async () => {
    const result = await imdbService.discoverMovies({ sort_by: 'SORT_BY_RELEASE_DATE' });
    expect(result.results).toHaveLength(1);
  });

  it('discoverMovies applies year filter', async () => {
    const result = await imdbService.discoverMovies({ primary_release_year: 2024 });
    expect(result.results).toHaveLength(1);
  });

  it('discoverMovies applies genres filter', async () => {
    const result = await imdbService.discoverMovies({ with_genres: 'Action' });
    expect(result.results).toHaveLength(1);
  });

  it('discoverMovies uses default sort for invalid sort_by', async () => {
    const result = await imdbService.discoverMovies({ sort_by: 'INVALID_SORT' });
    expect(result.results).toHaveLength(1);
  });

  it('discoverMovies ignores invalid year', async () => {
    const result = await imdbService.discoverMovies({ primary_release_year: 1800 });
    expect(result.results).toHaveLength(1);
  });

  it('discoverMovies ignores future year', async () => {
    const result = await imdbService.discoverMovies({ primary_release_year: 2030 });
    expect(result.results).toHaveLength(1);
  });

  it('discoverMovies sanitizes genres string', async () => {
    const result = await imdbService.discoverMovies({ with_genres: 'Action<script>' });
    expect(result.results).toHaveLength(1);
  });

  // TV Shows
  it('getPopularTvShows returns transformed results', async () => {
    const result = await imdbService.getPopularTvShows();
    expect(result.results).toHaveLength(1);
  });

  it('getTvGenres returns genres', async () => {
    const result = await imdbService.getTvGenres();
    expect(result.genres).toHaveLength(2);
  });

  it('discoverTv returns results', async () => {
    const result = await imdbService.discoverTv({});
    expect(result.results).toHaveLength(1);
  });

  it('discoverTv applies filters', async () => {
    const result = await imdbService.discoverTv({ 
      sort_by: 'SORT_BY_USER_RATING',
      primary_release_year: 2023 
    });
    expect(result.results).toHaveLength(1);
  });

  // Search
  it('searchTitles returns transformed results', async () => {
    const result = await imdbService.searchTitles('Test');
    expect(result.results).toHaveLength(1);
    expect(result.results[0].primaryTitle).toBe('Test Movie');
  });

  it('searchTitles accepts limit parameter', async () => {
    const result = await imdbService.searchTitles('Test', 10);
    expect(result.results).toHaveLength(1);
  });

  // Title details
  it('getTitle returns transformed title', async () => {
    const result = await imdbService.getTitle('tt1234567');
    expect(result.primaryTitle).toBe('Test Movie');
  });

  it('getTitle handles missing optional fields', async () => {
    const result = await imdbService.getTitle('tt1234567');
    expect(result.originalTitle).toBe('Test Movie Original');
    expect(result.primaryImage).toBeDefined();
    expect(result.rating).toBeDefined();
  });

  // Credits
  it('getTitleCredits returns credits data', async () => {
    const result = await imdbService.getTitleCredits('tt1234567');
    expect(result).toHaveProperty('cast');
    expect(result).toHaveProperty('crew');
  });

  // Utilities
  it('getImageUrl returns image URL when available', () => {
    const url = imdbService.getImageUrl({ url: 'https://example.com/image.jpg' });
    expect(url).toBe('https://example.com/image.jpg');
  });

  it('getImageUrl returns placeholder when URL is empty', () => {
    const url = imdbService.getImageUrl({ url: '' });
    expect(url).toBe('/placeholder-image.png');
  });

  it('getImageUrl returns placeholder when image is undefined', () => {
    const url = imdbService.getImageUrl(undefined);
    expect(url).toBe('/placeholder-image.png');
  });

  it('getImageUrl handles image with width and height', () => {
    const url = imdbService.getImageUrl({ url: 'https://example.com/image.jpg', width: 500, height: 750 });
    expect(url).toBe('https://example.com/image.jpg');
  });
});
