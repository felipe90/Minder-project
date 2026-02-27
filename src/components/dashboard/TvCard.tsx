import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { TvShow } from '../../services/types';
import { useTvStore } from '../../store/tvStore';
import { imdbService } from '../../services/tmdbService';
import { OptimizedImage } from '../common/OptimizedImage';
import '../../styles/ItemCard.css';

interface TvCardProps {
  tvShow: TvShow;
  onSelect?: (tvShow: TvShow) => void;
  actionButtonLabel?: string;
  onActionClick?: (tvShow: TvShow) => void;
}

export const TvCard: React.FC<TvCardProps> = ({
  tvShow,
  onSelect,
  actionButtonLabel = 'Rate',
  onActionClick,
}) => {
  const navigate = useNavigate();
  const setSelectedTvShow = useTvStore((state) => state.setSelectedTvShow);

  const handleClick = () => {
    if (onSelect) {
      onSelect(tvShow);
    }
  };

  const handleActionClick = () => {
    setSelectedTvShow(tvShow);
    if (onActionClick) {
      onActionClick(tvShow);
    } else {
      navigate('/rate-tv', { state: { tvShow } });
    }
  };

  const imageUrl = imdbService.getImageUrl(tvShow.primaryImage);
  const rating = tvShow.rating?.aggregateRating || 0;

  return (
    <div className="item-card tv-card">
      <div className="item-card-image">
        <OptimizedImage
          src={imageUrl}
          alt={tvShow.primaryTitle}
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
        <h3 className="item-card-title">{tvShow.primaryTitle}</h3>
        <p className="item-card-year">{tvShow.startYear}</p>
        <p className="item-card-overview">{tvShow.plot?.substring(0, 100) || 'No description'}...</p>
        <button className="item-card-action-btn" onClick={handleActionClick}>
          {actionButtonLabel}
        </button>
      </div>
    </div>
  );
};
