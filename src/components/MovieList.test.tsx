import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, afterEach, expect } from 'vitest';
import { MovieList } from './MovieList';
import { TestProviders } from '../test-utils/TestProviders';
import { useSearchMovies } from '../hooks/useSearchMovies';
import type { Mock } from 'vitest';
import type { MovieSummary } from '../api/movies';

vi.mock('../hooks/useSearchMovies', () => ({
  useSearchMovies: vi.fn(),
}));

const mockUseSearchMovies = useSearchMovies as Mock;

describe('<MovieList />', () => {
  const mockHandleMovieClick = vi.fn();

  const mockMovies: MovieSummary[] = [
    {
      movieId: '1',
      title: 'Inception',
      year: '2010',
      poster: '/inception.jpg',
    },
    {
      movieId: '2',
      title: 'Interstellar',
      year: '2014',
      poster: '/interstellar.jpg',
    },
  ];

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderMovieList = () => {
    mockUseSearchMovies.mockReturnValue({
      handleMovieClick: mockHandleMovieClick,
    });

    render(
      <TestProviders>
        <MovieList movies={mockMovies} />
      </TestProviders>
    );
  };

  it('renders a list of movie items with title and poster', () => {
    renderMovieList();

    for (const movie of mockMovies) {
      expect(
        screen.getByRole('heading', { name: movie.title })
      ).toBeInTheDocument();
      expect(screen.getByAltText(movie.title)).toHaveAttribute(
        'src',
        movie.poster
      );
      expect(screen.getByText(movie.year)).toBeInTheDocument();
    }
  });

  it('calls handleMovieClick when a movie title is clicked', () => {
    renderMovieList();

    const titleElement = screen.getByRole('heading', { name: 'Inception' });
    fireEvent.click(titleElement);

    expect(mockHandleMovieClick).toHaveBeenCalledWith('1');
  });
});
