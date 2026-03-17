import { describe, it, expect, beforeEach, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { useMovieStore } from './movieStore';

const mockMovie = {
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

const mockMoviesResponse = {
  titles: [mockMovie],
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

const server = setupServer(
  http.get('https://api.imdbapi.dev/titles', () => {
    return HttpResponse.json(mockMoviesResponse);
  }),
  http.get('https://api.imdbapi.dev/interests', () => {
    return HttpResponse.json(mockInterestsResponse);
  }),
  http.get('https://api.imdbapi.dev/search/titles', () => {
    return HttpResponse.json(mockMoviesResponse);
  })
);

describe('movieStore async actions', () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    useMovieStore.setState({
      movies: [],
      newestMovies: [],
      genres: [],
      selectedMovie: null,
      isLoading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
    });
  });
  afterAll(() => server.close());

  it('fetchPopularMovies loads movies successfully', async () => {
    const { fetchPopularMovies } = useMovieStore.getState();
    
    expect(useMovieStore.getState().isLoading).toBe(false);
    
    await fetchPopularMovies();
    
    const state = useMovieStore.getState();
    expect(state.movies).toHaveLength(1);
    expect(state.movies[0].primaryTitle).toBe('Test Movie');
    expect(state.error).toBeNull();
    expect(state.isLoading).toBe(false);
  });

  it('fetchNewestMovies loads newest movies successfully', async () => {
    const { fetchNewestMovies } = useMovieStore.getState();
    
    await fetchNewestMovies();
    
    const state = useMovieStore.getState();
    expect(state.newestMovies).toHaveLength(1);
    expect(state.error).toBeNull();
  });

  it('fetchMovieGenres loads genres successfully', async () => {
    const { fetchMovieGenres } = useMovieStore.getState();
    
    await fetchMovieGenres();
    
    const state = useMovieStore.getState();
    expect(state.genres).toHaveLength(2);
    expect(state.genres[0].name).toBe('Action');
  });

  it('discoverMovies loads movies with filters', async () => {
    const { discoverMovies } = useMovieStore.getState();
    
    await discoverMovies({ sort_by: 'SORT_BY_RELEASE_DATE' });
    
    const state = useMovieStore.getState();
    expect(state.movies).toHaveLength(1);
    expect(state.error).toBeNull();
  });

  it('searchMovies loads movies by query', async () => {
    const { searchMovies } = useMovieStore.getState();
    
    await searchMovies('Test');
    
    const state = useMovieStore.getState();
    expect(state.movies).toHaveLength(1);
    expect(state.error).toBeNull();
  });

  it('fetchPopularMovies sets loading state during fetch', async () => {
    const { fetchPopularMovies } = useMovieStore.getState();
    
    const promise = fetchPopularMovies();
    
    // Loading should be true during fetch
    expect(useMovieStore.getState().isLoading).toBe(true);
    
    await promise;
    
    // Loading should be false after fetch
    expect(useMovieStore.getState().isLoading).toBe(false);
  });

  it('fetchNewestMovies sets loading state during fetch', async () => {
    const { fetchNewestMovies } = useMovieStore.getState();
    
    const promise = fetchNewestMovies();
    expect(useMovieStore.getState().isLoading).toBe(true);
    
    await promise;
    expect(useMovieStore.getState().isLoading).toBe(false);
  });
});
