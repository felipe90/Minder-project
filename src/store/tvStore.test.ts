import { describe, it, expect, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { useTvStore } from './tvStore';

const mockTvShow = {
  id: 'tt1234568',
  primaryTitle: 'Test TV Show',
  originalTitle: 'Test TV Show Original',
  primaryImage: { url: 'https://example.com/tv-image.jpg' },
  plot: 'Test TV plot',
  startYear: 2023,
  endYear: 2024,
  runtimeSeconds: 3600,
  genres: ['Drama'],
  rating: {
    aggregateRating: 7.8,
    voteCount: 500,
  },
};

const mockTvShowsResponse = {
  titles: [mockTvShow],
};

const mockInterestsResponse = {
  categories: [
    {
      interests: [
        { id: '1', name: 'Drama' },
        { id: '2', name: 'Comedy' },
      ],
    },
  ],
};

const server = setupServer(
  http.get('https://api.imdbapi.dev/titles', () => {
    return HttpResponse.json(mockTvShowsResponse);
  }),
  http.get('https://api.imdbapi.dev/interests', () => {
    return HttpResponse.json(mockInterestsResponse);
  }),
  http.get('https://api.imdbapi.dev/search/titles', () => {
    return HttpResponse.json(mockTvShowsResponse);
  })
);

describe('tvStore async actions', () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    useTvStore.setState({
      tvShows: [],
      newestTvShows: [],
      genres: [],
      selectedTvShow: null,
      isLoading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
    });
  });
  afterAll(() => server.close());

  it('fetchPopularTvShows loads TV shows successfully', async () => {
    const { fetchPopularTvShows } = useTvStore.getState();
    
    expect(useTvStore.getState().isLoading).toBe(false);
    
    await fetchPopularTvShows();
    
    const state = useTvStore.getState();
    expect(state.tvShows).toHaveLength(1);
    expect(state.tvShows[0].primaryTitle).toBe('Test TV Show');
    expect(state.error).toBeNull();
    expect(state.isLoading).toBe(false);
  });

  it('fetchNewestTvShows loads newest TV shows successfully', async () => {
    const { fetchNewestTvShows } = useTvStore.getState();
    
    await fetchNewestTvShows();
    
    const state = useTvStore.getState();
    expect(state.newestTvShows).toHaveLength(1);
    expect(state.error).toBeNull();
  });

  it('fetchTvGenres loads genres successfully', async () => {
    const { fetchTvGenres } = useTvStore.getState();
    
    await fetchTvGenres();
    
    const state = useTvStore.getState();
    expect(state.genres).toHaveLength(2);
    expect(state.genres[0].name).toBe('Drama');
  });

  it('discoverTvShows loads TV shows with filters', async () => {
    const { discoverTvShows } = useTvStore.getState();
    
    await discoverTvShows({ sort_by: 'SORT_BY_RELEASE_DATE' });
    
    const state = useTvStore.getState();
    expect(state.tvShows).toHaveLength(1);
    expect(state.error).toBeNull();
  });

  it('searchTvShows loads TV shows by query', async () => {
    const { searchTvShows } = useTvStore.getState();
    
    await searchTvShows('Test');
    
    const state = useTvStore.getState();
    expect(state.tvShows).toHaveLength(1);
    expect(state.error).toBeNull();
  });

  it('fetchPopularTvShows sets loading state during fetch', async () => {
    const { fetchPopularTvShows } = useTvStore.getState();
    
    const promise = fetchPopularTvShows();
    
    expect(useTvStore.getState().isLoading).toBe(true);
    
    await promise;
    
    expect(useTvStore.getState().isLoading).toBe(false);
  });

  it('fetchNewestTvShows sets loading state during fetch', async () => {
    const { fetchNewestTvShows } = useTvStore.getState();
    
    const promise = fetchNewestTvShows();
    expect(useTvStore.getState().isLoading).toBe(true);
    
    await promise;
    expect(useTvStore.getState().isLoading).toBe(false);
  });
});
