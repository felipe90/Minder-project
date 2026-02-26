import React, { useState, useEffect } from 'react';
import { useTvStore } from '../../store/tvStore';
import type { DiscoverFilters } from '../../services/types';
import { YEARS, SORT_OPTIONS } from '../../services/config';
import { imdbService } from '../../services/tmdbService';
import '../../styles/RateTv.css';

export const RateTv: React.FC = () => {
  const {
    tvShows,
    genres,
    isLoading,
    error,
    fetchTvGenres,
    discoverTvShows,
    setSelectedTvShow,
  } = useTvStore();

  const [filters, setFilters] = useState<DiscoverFilters>({
    sort_by: 'SORT_BY_POPULARITY',
  });

  const [showPreferences, setShowPreferences] = useState(false);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetchTvGenres();
    discoverTvShows(filters);
  }, []);

  const handleFilterChange = (newFilters: DiscoverFilters) => {
    setFilters(newFilters);
    discoverTvShows(newFilters);
  };

  const handleRate = (tvId: string, rating: number) => {
    setRatings({ ...ratings, [tvId]: rating });
    // Save to localStorage
    const allRatings = JSON.parse(localStorage.getItem('tvRatings') || '{}');
    allRatings[tvId] = {
      rating,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('tvRatings', JSON.stringify(allRatings));
    alert(`You rated this TV show ${rating}/10`);
  };

  const handleNextShow = () => {
    if (tvShows.length > 0) {
      const randomIndex = Math.floor(Math.random() * tvShows.length);
      setSelectedTvShow(tvShows[randomIndex]);
    }
  };

  return (
    <div className="rate-tv-container">
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
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      <div className="tv-list">
        {isLoading ? (
          <div className="loading">Loading TV shows...</div>
        ) : tvShows.length > 0 ? (
          tvShows.map((tvShow) => (
            <div key={tvShow.id} className="tv-item">
              <div className="tv-poster">
                <img
                  src={imdbService.getImageUrl(tvShow.primaryImage)}
                  alt={tvShow.primaryTitle}
                />
              </div>
              <div className="tv-details">
                <h3>{tvShow.primaryTitle}</h3>
                <p>{tvShow.startYear}{tvShow.endYear ? ` - ${tvShow.endYear}` : ''}</p>
                <p className="overview">{tvShow.plot || 'No description available'}</p>
                <div className="rating-controls">
                  <div className="rating-display">
                    Rating: <strong>{ratings[tvShow.id] || 'Not rated'}</strong>/10
                  </div>
                  <div className="rating-buttons">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rate) => (
                      <button
                        key={rate}
                        className={`rate-btn ${
                          ratings[tvShow.id] === rate ? 'active' : ''
                        }`}
                        onClick={() => handleRate(tvShow.id, rate)}
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
          <div>No TV shows found</div>
        )}
      </div>

      {tvShows.length > 0 && (
        <button className="next-btn" onClick={handleNextShow}>
          Next Random TV Show
        </button>
      )}
    </div>
  );
};
