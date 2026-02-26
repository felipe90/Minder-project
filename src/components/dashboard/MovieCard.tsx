import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../../services/types';
import { useMovieStore } from '../../store/movieStore';
import { imdbService } from '../../services/tmdbService';
import '../../styles/ItemCard.css';

interface MovieCardProps {
  movie: Movie;
  onSelect?: (movie: Movie) => void;
  actionButtonLabel?: string;
  onActionClick?: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onSelect,
  actionButtonLabel = 'Rate',
  onActionClick,
}) => {
  const navigate = useNavigate();
  const setSelectedMovie = useMovieStore((state) => state.setSelectedMovie);

  const handleClick = () => {
    if (onSelect) {
      onSelect(movie);
    }
  };

  const handleActionClick = () => {
    setSelectedMovie(movie);
    if (onActionClick) {
      onActionClick(movie);
    } else {
      navigate('/rate-movie', { state: { movie } });
    }
  };

  const imageUrl = imdbService.getImageUrl(movie.primaryImage);
  const rating = movie.rating?.aggregateRating || 0;

  return (
    <div className="item-card movie-card">
      <div className="item-card-image">
        <img
          loading="lazy"
          src={imageUrl}
          alt={movie.primaryTitle}
          onClick={handleClick}
          style={{ cursor: onSelect ? 'pointer' : 'default' }}
        />
        <div className="item-card-overlay">
          <div className="item-card-rating">
            <span className="rating-value">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <div className="item-card-content">
        <h3 className="item-card-title">{movie.primaryTitle}</h3>
        <p className="item-card-year">{movie.startYear}</p>
        <p className="item-card-overview">{movie.plot?.substring(0, 100) || 'No description'}...</p>
        <button className="item-card-action-btn" onClick={handleActionClick}>
          {actionButtonLabel}
        </button>
      </div>
    </div>
  );
};
