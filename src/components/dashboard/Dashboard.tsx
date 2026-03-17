import React from 'react';
import {
  usePopularMovies,
  useNewestMovies,
  usePopularTvShows,
  useNewestTvShows,
} from '../../hooks';
import { MovieCard } from './MovieCard';
import { TvCard } from './TvCard';
import type { Movie, TvShow } from '../../services/types';
import '../../styles/Dashboard.css';

export const Dashboard: React.FC = () => {
  const { data: popularMoviesData, isLoading: popularMoviesLoading, error: popularMoviesError } = usePopularMovies();
  const { data: newestMoviesData, isLoading: newestMoviesLoading, error: newestMoviesError } = useNewestMovies();
  const { data: popularTvData, isLoading: popularTvLoading, error: popularTvError } = usePopularTvShows();
  const { data: newestTvData, isLoading: newestTvLoading, error: newestTvError } = useNewestTvShows();

  const popularMovies: Movie[] = popularMoviesData?.results || [];
  const newestMovies: Movie[] = newestMoviesData?.results || [];
  const popularTv: TvShow[] = popularTvData?.results || [];
  const newestTv: TvShow[] = newestTvData?.results || [];

  const hasError = popularMoviesError || newestMoviesError || popularTvError || newestTvError;

  return (
    <div className="dashboard">
      {hasError && (
        <div className="dashboard-error">
          {hasError instanceof Error ? hasError.message : 'Failed to load content'}
        </div>
      )}

      <section className="dashboard-section">
        <h2>🆕 Newest Movies</h2>
        {newestMoviesLoading ? (
          <div className="loading">Loading movies...</div>
        ) : (
          <div className="items-grid">
            {newestMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-section">
        <h2>⭐ Popular Movies</h2>
        {popularMoviesLoading ? (
          <div className="loading">Loading movies...</div>
        ) : (
          <div className="items-grid">
            {popularMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-section">
        <h2>🆕 Newest TV Shows</h2>
        {newestTvLoading ? (
          <div className="loading">Loading TV shows...</div>
        ) : (
          <div className="items-grid">
            {newestTv.map((tvShow) => (
              <TvCard key={tvShow.id} tvShow={tvShow} />
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-section">
        <h2>⭐ Popular TV Shows</h2>
        {popularTvLoading ? (
          <div className="loading">Loading TV shows...</div>
        ) : (
          <div className="items-grid">
            {popularTv.map((tvShow) => (
              <TvCard key={tvShow.id} tvShow={tvShow} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
