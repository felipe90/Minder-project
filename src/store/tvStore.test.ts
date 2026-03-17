import { describe, it, expect, beforeEach } from 'vitest';
import { useTvStore } from './tvStore';
import type { TvShow } from '../services/types';

const mockTvShow: TvShow = {
  id: 'tt1234568',
  primaryTitle: 'Test TV Show',
  primaryImage: { url: 'https://example.com/tv-image.jpg' },
  startYear: 2023,
  genres: ['Drama'],
};

describe('tvStore', () => {
  beforeEach(() => {
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

  it('has initial state', () => {
    const state = useTvStore.getState();
    expect(state.tvShows).toEqual([]);
    expect(state.newestTvShows).toEqual([]);
    expect(state.genres).toEqual([]);
    expect(state.selectedTvShow).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('setSelectedTvShow updates selected TV show', () => {
    const { setSelectedTvShow } = useTvStore.getState();
    setSelectedTvShow(mockTvShow);
    
    const state = useTvStore.getState();
    expect(state.selectedTvShow).toEqual(mockTvShow);
  });

  it('setSelectedTvShow can set null', () => {
    useTvStore.setState({ selectedTvShow: mockTvShow });
    const { setSelectedTvShow } = useTvStore.getState();
    setSelectedTvShow(null);
    
    const state = useTvStore.getState();
    expect(state.selectedTvShow).toBeNull();
  });

  it('setError updates error message', () => {
    const { setError } = useTvStore.getState();
    setError('Test error');
    
    const state = useTvStore.getState();
    expect(state.error).toBe('Test error');
  });

  it('setError can clear error', () => {
    useTvStore.setState({ error: 'Previous error' });
    const { setError } = useTvStore.getState();
    setError(null);
    
    const state = useTvStore.getState();
    expect(state.error).toBeNull();
  });

  it('clearTvShows resets tvShows and selectedTvShow', () => {
    useTvStore.setState({ tvShows: [mockTvShow], selectedTvShow: mockTvShow });
    const { clearTvShows } = useTvStore.getState();
    clearTvShows();
    
    const state = useTvStore.getState();
    expect(state.tvShows).toEqual([]);
    expect(state.selectedTvShow).toBeNull();
  });

  it('can update tvShows directly', () => {
    useTvStore.setState({ tvShows: [mockTvShow] });
    const state = useTvStore.getState();
    expect(state.tvShows).toHaveLength(1);
    expect(state.tvShows[0].primaryTitle).toBe('Test TV Show');
  });

  it('can update newestTvShows', () => {
    useTvStore.setState({ newestTvShows: [mockTvShow] });
    const state = useTvStore.getState();
    expect(state.newestTvShows).toHaveLength(1);
  });

  it('can update genres', () => {
    const genres = [{ id: '1', name: 'Drama' }];
    useTvStore.setState({ genres });
    const state = useTvStore.getState();
    expect(state.genres).toEqual(genres);
  });

  it('can update loading state', () => {
    useTvStore.setState({ isLoading: true });
    const state = useTvStore.getState();
    expect(state.isLoading).toBe(true);
  });

  it('can update pagination', () => {
    useTvStore.setState({ currentPage: 3, totalPages: 8 });
    const state = useTvStore.getState();
    expect(state.currentPage).toBe(3);
    expect(state.totalPages).toBe(8);
  });

  it('handles multiple state updates', () => {
    useTvStore.setState({ 
      tvShows: [mockTvShow],
      isLoading: true,
      error: null,
      currentPage: 2,
    });
    
    const state = useTvStore.getState();
    expect(state.tvShows).toHaveLength(1);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.currentPage).toBe(2);
  });

  it('handles empty state for tvShows', () => {
    const state = useTvStore.getState();
    expect(state.tvShows).toEqual([]);
  });

  it('handles empty state for newestTvShows', () => {
    const state = useTvStore.getState();
    expect(state.newestTvShows).toEqual([]);
  });

  it('handles empty genres array', () => {
    const state = useTvStore.getState();
    expect(state.genres).toEqual([]);
  });

  it('can reset to initial state', () => {
    useTvStore.setState({
      tvShows: [mockTvShow],
      newestTvShows: [mockTvShow],
      genres: [{ id: '1', name: 'Drama' }],
      selectedTvShow: mockTvShow,
      isLoading: true,
      error: 'Some error',
      currentPage: 5,
      totalPages: 10,
    });
    
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
    
    const state = useTvStore.getState();
    expect(state.tvShows).toEqual([]);
    expect(state.newestTvShows).toEqual([]);
    expect(state.genres).toEqual([]);
    expect(state.selectedTvShow).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.currentPage).toBe(1);
    expect(state.totalPages).toBe(1);
  });
});
