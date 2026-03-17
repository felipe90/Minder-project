import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { TvCard } from './TvCard';
import type { TvShow } from '../../services/types';

const mockTvShow: TvShow = {
  id: 'tt1234568',
  primaryTitle: 'Test TV Show',
  originalTitle: 'Test TV Show Original',
  primaryImage: { url: 'https://example.com/tv-image.jpg' },
  plot: 'This is a test TV show plot description.',
  startYear: 2023,
  endYear: 2024,
  runtimeSeconds: 3600,
  genres: ['Drama', 'Comedy'],
  rating: {
    aggregateRating: 7.8,
    voteCount: 500,
  },
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('TvCard', () => {
  it('renders TV show title', () => {
    renderWithRouter(<TvCard tvShow={mockTvShow} />);
    expect(screen.getByText('Test TV Show')).toBeInTheDocument();
  });

  it('renders TV show start year', () => {
    renderWithRouter(<TvCard tvShow={mockTvShow} />);
    expect(screen.getByText('2023')).toBeInTheDocument();
  });

  it('renders TV show rating', () => {
    renderWithRouter(<TvCard tvShow={mockTvShow} />);
    expect(screen.getByText('7.8')).toBeInTheDocument();
  });

  it('renders TV show plot excerpt', () => {
    renderWithRouter(<TvCard tvShow={mockTvShow} />);
    expect(screen.getByText(/This is a test TV show/)).toBeInTheDocument();
  });

  it('renders action button with default label', () => {
    renderWithRouter(<TvCard tvShow={mockTvShow} />);
    expect(screen.getByRole('button', { name: 'Rate' })).toBeInTheDocument();
  });

  it('renders action button with custom label', () => {
    renderWithRouter(<TvCard tvShow={mockTvShow} actionButtonLabel="View" />);
    expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument();
  });

  it('renders without end year for ongoing shows', () => {
    const ongoingShow: TvShow = {
      ...mockTvShow,
      endYear: undefined,
    };
    renderWithRouter(<TvCard tvShow={ongoingShow} />);
    expect(screen.getByText('2023')).toBeInTheDocument();
  });

  it('renders without rating when rating is undefined', () => {
    const showWithoutRating: TvShow = {
      ...mockTvShow,
      rating: undefined,
    };
    renderWithRouter(<TvCard tvShow={showWithoutRating} />);
    expect(screen.getByText('0.0')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    renderWithRouter(<TvCard tvShow={mockTvShow} onSelect={handleSelect} />);
    
    const image = screen.getByAltText('Test TV Show');
    await user.click(image);
    expect(handleSelect).toHaveBeenCalledWith(mockTvShow);
  });

  it('calls onActionClick when action button clicked', async () => {
    const user = userEvent.setup();
    const handleActionClick = vi.fn();
    renderWithRouter(<TvCard tvShow={mockTvShow} onActionClick={handleActionClick} />);
    
    const button = screen.getByRole('button', { name: 'Rate' });
    await user.click(button);
    expect(handleActionClick).toHaveBeenCalledWith(mockTvShow);
  });

  it('renders with custom class', () => {
    renderWithRouter(<TvCard tvShow={mockTvShow} />);
    const card = screen.getByText('Test TV Show').closest('.tv-card');
    expect(card).toBeInTheDocument();
  });
});
