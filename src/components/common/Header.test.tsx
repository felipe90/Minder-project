import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Header', () => {
  it('renders logo icon', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('👁️')).toBeInTheDocument();
  });

  it('renders title', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('Minder')).toBeInTheDocument();
  });

  it('renders user avatar', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('👤')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
  });

  it('renders header element', () => {
    renderWithRouter(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('contains logo link to dashboard', () => {
    renderWithRouter(<Header />);
    const logoLink = screen.getByRole('link', { name: /👁️/i });
    expect(logoLink).toHaveAttribute('href', '/dashboard');
  });
});
