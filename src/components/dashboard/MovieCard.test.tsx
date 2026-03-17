import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { MovieCard } from './MovieCard';
import type { Movie } from '../../services/types';

const mockMovie: Movie = {
  id: 'tt1234567',
  primaryTitle: 'Test Movie',
  originalTitle: 'Test Movie Original',
  primaryImage: { url: 'https://example.com/image.jpg' },
  plot: 'This is a test movie plot description.',
  startYear: 2024,
  endYear: undefined,
  runtimeSeconds: 7200,
  genres: ['Action', 'Adventure'],
  rating: {
    aggregateRating: 8.5,
    voteCount: 1000,
  },
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('MovieCard', () => {
  it('renders movie title', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });

  it('renders movie year', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('renders movie rating', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('8.5')).toBeInTheDocument();
  });

  it('renders movie plot excerpt', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    expect(screen.getByText(/This is a test movie/)).toBeInTheDocument();
  });

  it('renders action button with default label', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    expect(screen.getByRole('button', { name: 'Rate' })).toBeInTheDocument();
  });

  it('renders action button with custom label', () => {
    renderWithRouter(<MovieCard movie={mockMovie} actionButtonLabel="View" />);
    expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument();
  });

  it('renders without rating when rating is undefined', () => {
    const movieWithoutRating: Movie = {
      ...mockMovie,
      rating: undefined,
    };
    renderWithRouter(<MovieCard movie={movieWithoutRating} />);
    expect(screen.getByText('0.0')).toBeInTheDocument();
  });

  it('renders placeholder when image is not available', () => {
    const movieWithoutImage: Movie = {
      ...mockMovie,
      primaryImage: { url: '' },
    };
    renderWithRouter(<MovieCard movie={movieWithoutImage} />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('calls onSelect when clicked', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    renderWithRouter(<MovieCard movie={mockMovie} onSelect={handleSelect} />);
    
    const image = screen.getByAltText('Test Movie');
    await user.click(image);
    expect(handleSelect).toHaveBeenCalledWith(mockMovie);
  });

  it('calls onActionClick when action button clicked', async () => {
    const user = userEvent.setup();
    const handleActionClick = vi.fn();
    renderWithRouter(<MovieCard movie={mockMovie} onActionClick={handleActionClick} />);
    
    const button = screen.getByRole('button', { name: 'Rate' });
    await user.click(button);
    expect(handleActionClick).toHaveBeenCalledWith(mockMovie);
  });

  it('renders movie with end year', () => {
    const movieWithEndYear: Movie = {
      ...mockMovie,
      endYear: 2025,
    };
    renderWithRouter(<MovieCard movie={movieWithEndYear} />);
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('renders with custom class', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);
    const card = screen.getByText('Test Movie').closest('.movie-card');
    expect(card).toBeInTheDocument();
  });
});
