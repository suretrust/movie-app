import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TestProviders } from '../test-utils/TestProviders';
import type { MovieSummary } from '../api/movies';
import { MovieItemComponent } from './MovieItem';

describe('<MovieItemComponent />', () => {
  const mockMovie: MovieSummary = {
    movieId: '1',
    title: 'Inception',
    year: '2010',
    poster: '/inception.jpg',
  };

  const renderComponent = (onClick = vi.fn()) =>
    render(
      <TestProviders>
        <MovieItemComponent movie={mockMovie} onClick={onClick} />
      </TestProviders>
    );

  it('renders movie poster with correct src and alt', () => {
    renderComponent();

    const poster = screen.getByAltText(mockMovie.title);
    expect(poster).toBeInTheDocument();
    expect(poster).toHaveAttribute('src', mockMovie.poster);
  });

  it('renders movie title and release year', () => {
    renderComponent();

    expect(
      screen.getByRole('heading', { name: mockMovie.title })
    ).toBeInTheDocument();
    expect(screen.getByText(mockMovie.year)).toBeInTheDocument();
  });

  it('calls onClick handler when title is clicked', () => {
    const handleClick = vi.fn();
    renderComponent(handleClick);

    const titleElement = screen.getByRole('heading', { name: mockMovie.title });
    fireEvent.click(titleElement);

    expect(handleClick).toHaveBeenCalledWith(mockMovie.movieId);
  });
});
