import React, { useEffect } from 'react';
import { useMovieStore } from '../../store/movieStore';
import { useTvStore } from '../../store/tvStore';
import { MovieCard } from './MovieCard';
import { TvCard } from './TvCard';
import '../../styles/Dashboard.css';

export const Dashboard: React.FC = () => {
  const {
    movies,
    isLoading: moviesLoading,
    error: moviesError,
    fetchPopularMovies,
  } = useMovieStore();

  const {
    tvShows,
    isLoading: tvLoading,
    error: tvError,
    fetchPopularTvShows,
  } = useTvStore();

  useEffect(() => {
    fetchPopularMovies();
    fetchPopularTvShows();
  }, [fetchPopularMovies, fetchPopularTvShows]);

  return (
    <div className="dashboard">
      {(moviesError || tvError) && (
        <div className="dashboard-error">
          {moviesError || tvError}
        </div>
      )}

      <section className="dashboard-section">
        <h2>Popular Movies</h2>
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
        <h2>Popular TV Shows</h2>
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
