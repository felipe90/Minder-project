import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OptimizedImage } from './OptimizedImage';

describe('OptimizedImage', () => {
  it('renders with src and alt', () => {
    render(<OptimizedImage src="test.jpg" alt="Test alt" />);
    const img = screen.getByAltText('Test alt');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test.jpg');
  });

  it('renders placeholder when loading', async () => {
    render(<OptimizedImage src="test.jpg" alt="Test" />);
    const placeholder = screen.getByAltText('Placeholder');
    expect(placeholder).toBeInTheDocument();
  });

  it('applies className', () => {
    render(<OptimizedImage src="test.jpg" alt="Test" className="custom-class" />);
    const img = screen.getByAltText('Test');
    expect(img).toHaveClass('custom-class');
  });

  it('handles click event', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<OptimizedImage src="test.jpg" alt="Test" onClick={handleClick} />);
    
    const img = screen.getByAltText('Test');
    await user.click(img);
    expect(handleClick).toHaveBeenCalled();
  });

  it('handles style prop', () => {
    const style = { width: '200px', height: '300px' };
    render(<OptimizedImage src="test.jpg" alt="Test" style={style} />);
    const container = screen.getByAltText('Test').parentElement;
    expect(container?.style.width).toBe('200px');
    expect(container?.style.height).toBe('300px');
  });

  it('renders lazy loading', () => {
    render(<OptimizedImage src="test.jpg" alt="Test" />);
    const img = screen.getByAltText('Test');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('handles empty src', () => {
    render(<OptimizedImage src="" alt="Test" />);
    const placeholder = screen.getByAltText('Placeholder');
    expect(placeholder).toBeInTheDocument();
  });
});
