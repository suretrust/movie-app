import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, afterEach, expect } from 'vitest';
import { TitleAndStar } from './TitleAndStar';
import { TestProviders } from '../test-utils/TestProviders';
import { useAuth } from '../hooks/useAuth';
import { useFavoritesOperation } from '../hooks/useFavoritesOperation';
import type { Mock } from 'vitest';

vi.mock('../hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../hooks/useFavoritesOperation', () => ({
  useFavoritesOperation: vi.fn(),
}));

const mockUseAuth = useAuth as Mock;
const mockUseFavoritesOperation = useFavoritesOperation as Mock;

describe('<TitleAndStar />', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const movie = {
    movieId: '1',
    title: 'The Matrix',
    year: '1999',
    director: 'Wachowskis',
    cast: 'Keanu Reeves',
    genre: 'Sci-Fi',
    poster: '/matrix.jpg',
    plot: 'A computer hacker learns the nature of reality.',
  };

  const renderTitleAndStar = (props = {}) => {
    render(
      <TestProviders>
        <TitleAndStar movie={movie} {...props} />
      </TestProviders>
    );
  };

  it('renders movie title', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      requireAuth: vi.fn(),
    });

    mockUseFavoritesOperation.mockReturnValue({
      isMovieInFavorites: () => false,
      onFavoriteClick: vi.fn(),
    });

    renderTitleAndStar();

    expect(
      screen.getByRole('heading', { name: movie.title })
    ).toBeInTheDocument();
  });

  it('calls onClick with movieId when title is clicked', () => {
    const onClick = vi.fn();

    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      requireAuth: vi.fn(),
    });

    mockUseFavoritesOperation.mockReturnValue({
      isMovieInFavorites: () => false,
      onFavoriteClick: vi.fn(),
    });

    renderTitleAndStar({ onClick });

    fireEvent.click(screen.getByRole('heading', { name: movie.title }));
    expect(onClick).toHaveBeenCalledWith(movie.movieId);
  });

  it('calls requireAuth if user is not authenticated when star is clicked', () => {
    const requireAuth = vi.fn();

    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      requireAuth,
    });

    mockUseFavoritesOperation.mockReturnValue({
      isMovieInFavorites: () => false,
      onFavoriteClick: vi.fn(),
    });

    renderTitleAndStar();

    fireEvent.click(screen.getByRole('button'));
    expect(requireAuth).toHaveBeenCalled();
  });

  it('calls onFavoriteClick if user is authenticated when star is clicked', () => {
    const onFavoriteClick = vi.fn();

    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      requireAuth: vi.fn(),
    });

    mockUseFavoritesOperation.mockReturnValue({
      isMovieInFavorites: () => false,
      onFavoriteClick,
    });

    renderTitleAndStar();

    fireEvent.click(screen.getByRole('button'));
    expect(onFavoriteClick).toHaveBeenCalledWith(movie);
  });

  it('shows active star if movie is in favorites', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      requireAuth: vi.fn(),
    });

    mockUseFavoritesOperation.mockReturnValue({
      isMovieInFavorites: () => true,
      onFavoriteClick: vi.fn(),
    });

    renderTitleAndStar();

    const star = screen.getByRole('button');
    expect(star).toHaveAttribute('data-active', 'true');
  });
});
