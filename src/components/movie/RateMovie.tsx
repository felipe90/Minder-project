import React, { useState, useMemo } from 'react';
import { useDiscoverMovies, useMovieGenres } from '../../hooks';
import type { DiscoverFilters } from '../../services/types';
import { YEARS, SORT_OPTIONS } from '../../services/config';
import { imdbService } from '../../services/tmdbService';
import '../../styles/RateMovie.css';

export const RateMovie: React.FC = () => {
  const [filters, setFilters] = useState<DiscoverFilters>({
    sort_by: 'SORT_BY_POPULARITY',
  });

  const [showPreferences, setShowPreferences] = useState(false);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  // TanStack Query hooks
  const { data: moviesData, isLoading, error } = useDiscoverMovies(filters);
  const { data: genresData, isLoading: genresLoading } = useMovieGenres();

  const movies = moviesData?.results || [];
  const genres = genresData?.genres || [];

  // Memoize to avoid unnecessary recalculations
  const displayMovies = useMemo(() => movies, [movies]);

  const handleFilterChange = (newFilters: DiscoverFilters) => {
    setFilters(newFilters);
  };

  const handleRate = (movieId: string, rating: number) => {
    setRatings({ ...ratings, [movieId]: rating });
    // Save to localStorage
    const allRatings = JSON.parse(localStorage.getItem('movieRatings') || '{}');
    allRatings[movieId] = {
      rating,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('movieRatings', JSON.stringify(allRatings));
    alert(`You rated this movie ${rating}/10`);
  };

  const handleNextMovie = () => {
    if (displayMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * displayMovies.length);
      // Could use a context/store to set selected movie if needed
      console.log('Random movie:', displayMovies[randomIndex]);
    }
  };

  return (
    <div className="rate-movie-container">
      <button
        className="preferences-toggle"
        onClick={() => setShowPreferences(!showPreferences)}
      >
        {showPreferences ? 'Hide Preferences' : 'Show Preferences'}
      </button>

      {showPreferences && (
        <div className="preferences-panel">
          <div className="preference-group">
            <label>Sort By:</label>
            <select
              value={filters.sort_by || 'SORT_BY_POPULARITY'}
              onChange={(e) =>
                handleFilterChange({ ...filters, sort_by: e.target.value })
              }
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <div className="preference-group">
            <label>Year (Exact):</label>
            <select
              value={filters.primary_release_year || ''}
              onChange={(e) =>
                handleFilterChange({
                  ...filters,
                  primary_release_year: e.target.value
                    ? parseInt(e.target.value)
                    : undefined,
                })
              }
            >
              <option value="">All Years</option>
              {YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="preference-group">
            <label>Genre:</label>
            <select
              value={filters.with_genres || ''}
              onChange={(e) =>
                handleFilterChange({
                  ...filters,
                  with_genres: e.target.value ? e.target.value : undefined,
                })
              }
              disabled={genresLoading}
            >
              <option value="">All Genres</option>
              {genres.map((genre: any) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error instanceof Error ? error.message : 'Failed to load movies'}
        </div>
      )}

      <div className="movies-list">
        {isLoading ? (
          <div className="loading">Loading movies...</div>
        ) : displayMovies.length > 0 ? (
          displayMovies.map((movie: any) => (
            <div key={movie.id} className="movie-item">
              <div className="movie-poster">
                <img
                  loading="lazy"
                  src={imdbService.getImageUrl(movie.primaryImage)}
                  alt={movie.primaryTitle}
                />
              </div>
              <div className="movie-details">
                <h3>{movie.primaryTitle}</h3>
                <p>{movie.startYear}</p>
                <p className="overview">{movie.plot || 'No description available'}</p>
                <div className="rating-controls">
                  <div className="rating-display">
                    Rating: <strong>{ratings[movie.id] || 'Not rated'}</strong>/10
                  </div>
                  <div className="rating-buttons">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rate) => (
                      <button
                        key={rate}
                        className={`rate-btn ${
                          ratings[movie.id] === rate ? 'active' : ''
                        }`}
                        onClick={() => handleRate(movie.id, rate)}
                      >
                        {rate}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No movies found</div>
        )}
      </div>

      {displayMovies.length > 0 && (
        <button className="next-btn" onClick={handleNextMovie}>
          Next Random Movie
        </button>
      )}
    </div>
  );
};
