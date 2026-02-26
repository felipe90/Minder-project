import React, { useEffect } from 'react';
import { useMovieStore } from '../../store/movieStore';
import { useTvStore } from '../../store/tvStore';
import { MovieCard } from './MovieCard';
import { TvCard } from './TvCard';
import '../../styles/Dashboard.css';

export const Dashboard: React.FC = () => {
  const {
    movies,
    newestMovies,
    isLoading: moviesLoading,
    error: moviesError,
    fetchPopularMovies,
    fetchNewestMovies,
  } = useMovieStore();

  const {
    tvShows,
    newestTvShows,
    isLoading: tvLoading,
    error: tvError,
    fetchPopularTvShows,
    fetchNewestTvShows,
  } = useTvStore();

  useEffect(() => {
    fetchPopularMovies();
    fetchNewestMovies();
    fetchPopularTvShows();
    fetchNewestTvShows();
  }, [fetchPopularMovies, fetchNewestMovies, fetchPopularTvShows, fetchNewestTvShows]);

  return (
    <div className="dashboard">
      {(moviesError || tvError) && (
        <div className="dashboard-error">
          {moviesError || tvError}
        </div>
      )}

      <section className="dashboard-section">
        <h2>🆕 Newest Movies</h2>
        {moviesLoading ? (
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
        {moviesLoading ? (
          <div className="loading">Loading movies...</div>
        ) : (
          <div className="items-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-section">
        <h2>🆕 Newest TV Shows</h2>
        {tvLoading ? (
          <div className="loading">Loading TV shows...</div>
        ) : (
          <div className="items-grid">
            {newestTvShows.map((tvShow) => (
              <TvCard key={tvShow.id} tvShow={tvShow} />
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-section">
        <h2>⭐ Popular TV Shows</h2>
        {tvLoading ? (
          <div className="loading">Loading TV shows...</div>
        ) : (
          <div className="items-grid">
            {tvShows.map((tvShow) => (
              <TvCard key={tvShow.id} tvShow={tvShow} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
