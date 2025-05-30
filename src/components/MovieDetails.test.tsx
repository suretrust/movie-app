import { render, screen } from '@testing-library/react';
import { describe, it, vi, afterEach, expect } from 'vitest';
import { MovieDetails } from './MovieDetails';
import { TestProviders } from '../test-utils/TestProviders';
import { useMovieDetails } from '../hooks/useMovieDetails';
import type { Mock } from 'vitest';
import { LOADER_TEXT } from '../constants';

vi.mock('../hooks/useMovieDetails', () => ({
  useMovieDetails: vi.fn(),
}));

const mockUseMovieDetails = useMovieDetails as Mock;

describe('<MovieDetails />', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderMovieDetails = () => {
    render(
      <TestProviders>
        <MovieDetails />
      </TestProviders>
    );
  };

  it('renders the page header with title "movie details"', () => {
    mockUseMovieDetails.mockReturnValue({
      loading: false,
      error: null,
      movie: null,
    });

    renderMovieDetails();

    expect(
      screen.getByRole('heading', { name: 'movie details' })
    ).toBeInTheDocument();
  });

  it('shows loading message when loading is true', () => {
    mockUseMovieDetails.mockReturnValue({
      loading: true,
      error: null,
      movie: null,
    });

    renderMovieDetails();

    expect(screen.getByText(LOADER_TEXT)).toBeInTheDocument();
  });

  it('shows error message when there is an error', () => {
    mockUseMovieDetails.mockReturnValue({
      loading: false,
      error: 'Failed to load',
      movie: null,
    });

    renderMovieDetails();

    expect(screen.getByText('Failed to load')).toBeInTheDocument();
  });

  it('renders movie details when movie is present', () => {
    const mockMovie = {
      movieId: '1',
      title: 'Inception',
      year: '2010',
      director: 'Christopher Nolan',
      cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt',
      genre: 'Sci-Fi',
      poster: '/inception.jpg',
      plot: 'A thief who steals corporate secrets through dream-sharing technology...',
    };

    mockUseMovieDetails.mockReturnValue({
      loading: false,
      error: null,
      movie: mockMovie,
    });

    renderMovieDetails();

    expect(
      screen.getByRole('heading', { name: mockMovie.title })
    ).toBeInTheDocument();
    expect(screen.getByText(mockMovie.year)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.director)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.cast)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.genre)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.plot)).toBeInTheDocument();
    expect(screen.getByAltText(mockMovie.title)).toHaveAttribute(
      'src',
      mockMovie.poster
    );
    expect(
      screen.getByRole('img', { name: mockMovie.title })
    ).toBeInTheDocument();
  });
});
