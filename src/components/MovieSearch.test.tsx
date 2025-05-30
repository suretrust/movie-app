import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, afterEach, expect, vi } from 'vitest';
import { MovieSearch } from './MovieSearch';
import { TestProviders } from '../test-utils/TestProviders';
import { useSearchMovies } from '../hooks/useSearchMovies';
import type { Mock } from 'vitest';
import type { MovieSummary } from '../api/movies';
import { LOADER_TEXT } from '../constants';

vi.mock('../hooks/useSearchMovies', () => ({
  useSearchMovies: vi.fn(),
}));

const mockUseSearchMovies = useSearchMovies as Mock;

describe('<MovieSearch />', () => {
  const mockHandleInputChange = vi.fn();

  const baseReturn = {
    query: '',
    movies: [],
    loading: false,
    error: null,
    noMoviesFound: false,
    handleInputChange: mockHandleInputChange,
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderMovieSearch = () => {
    render(
      <TestProviders>
        <MovieSearch />
      </TestProviders>
    );
  };

  it('renders header, input, and empty list without error or loading', () => {
    mockUseSearchMovies.mockReturnValue(baseReturn);

    renderMovieSearch();

    expect(
      screen.getByRole('heading', { name: 'movie search' })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('enter movie title...')
    ).toBeInTheDocument();
    expect(screen.queryByText(LOADER_TEXT)).not.toBeInTheDocument();
    expect(screen.queryByRole('list')).toBeInTheDocument();
  });

  it('calls handleInputChange on input change', () => {
    mockUseSearchMovies.mockReturnValue(baseReturn);

    renderMovieSearch();

    const input = screen.getByPlaceholderText('enter movie title...');
    fireEvent.change(input, { target: { value: 'inception' } });

    expect(mockHandleInputChange).toHaveBeenCalled();
  });

  it('shows loading message when loading is true', () => {
    mockUseSearchMovies.mockReturnValue({ ...baseReturn, loading: true });

    renderMovieSearch();

    expect(screen.getByText(LOADER_TEXT)).toBeInTheDocument();
  });

  it('shows error message when there is an error', () => {
    mockUseSearchMovies.mockReturnValue({
      ...baseReturn,
      error: 'Something went wrong',
    });

    renderMovieSearch();

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('shows no movies message when noMoviesFound is true', () => {
    mockUseSearchMovies.mockReturnValue({
      ...baseReturn,
      query: 'foo',
      noMoviesFound: true,
    });

    renderMovieSearch();

    expect(screen.getByText('no movies found for "foo".')).toBeInTheDocument();
  });

  it('renders a list of movies if present', () => {
    const mockMovies: MovieSummary[] = [
      {
        movieId: '1',
        title: 'Inception',
        year: '2010',
        poster: '/inception.jpg',
      },
    ];

    mockUseSearchMovies.mockReturnValue({
      ...baseReturn,
      movies: mockMovies,
    });

    renderMovieSearch();

    expect(
      screen.getByRole('heading', { name: 'Inception' })
    ).toBeInTheDocument();
    expect(screen.getByAltText('Inception')).toBeInTheDocument();
  });
});
