import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Menu } from './Menu';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Menu', () => {
  it('renders navigation menu', () => {
    renderWithRouter(<Menu />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders Home link', () => {
    renderWithRouter(<Menu />);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  it('renders Rate Movies link', () => {
    renderWithRouter(<Menu />);
    expect(screen.getByRole('link', { name: 'Rate Movies' })).toBeInTheDocument();
  });

  it('renders Rate TV Shows link', () => {
    renderWithRouter(<Menu />);
    expect(screen.getByRole('link', { name: 'Rate TV Shows' })).toBeInTheDocument();
  });

  it('Home link points to dashboard', () => {
    renderWithRouter(<Menu />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/dashboard');
  });

  it('Rate Movies link points to rate-movie', () => {
    renderWithRouter(<Menu />);
    expect(screen.getByRole('link', { name: 'Rate Movies' })).toHaveAttribute('href', '/rate-movie');
  });

  it('Rate TV Shows link points to rate-tv', () => {
    renderWithRouter(<Menu />);
    expect(screen.getByRole('link', { name: 'Rate TV Shows' })).toHaveAttribute('href', '/rate-tv');
  });

  it('renders three menu items', () => {
    renderWithRouter(<Menu />);
    const menuItems = screen.getAllByRole('link');
    expect(menuItems).toHaveLength(3);
  });
});
