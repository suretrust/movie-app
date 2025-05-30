import { TestProviders } from '../test-utils/TestProviders';
import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Favorites } from './Favorites';
import { useFavoritesOperation } from '../hooks/useFavoritesOperation';
import type { Mock } from 'vitest';

const mockFavoriteMovies = [
  { movieId: '1', title: 'Inception' },
  { movieId: '2', title: 'Interstellar' },
];

vi.mock('../hooks/useFavoritesOperation', () => ({
  useFavoritesOperation: vi.fn(),
}));

const mockUseFavoritesOperation = useFavoritesOperation as Mock;

describe('<Favorites />', () => {
  beforeEach(() => {
    mockUseFavoritesOperation.mockReturnValue({ favorites: [] });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderFavoritesComponent = () => {
    render(
      <TestProviders>
        <Favorites />
      </TestProviders>
    );
  };

  it('shows message when there are no favorites', () => {
    renderFavoritesComponent();

    expect(
      screen.getByText('You have no favorite movies yet.')
    ).toBeInTheDocument();
  });

  it('renders favorite movies when there are favorites', () => {
    mockUseFavoritesOperation.mockReturnValue({
      favorites: mockFavoriteMovies,
      isMovieInFavorites: vi.fn(),
      handleAddToFavorites: vi.fn(),
      handleRemoveFromFavorites: vi.fn(),
    });

    renderFavoritesComponent();

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('Interstellar')).toBeInTheDocument();
  });

  it('renders the page header with title "favorites"', () => {
    renderFavoritesComponent();

    expect(
      screen.getByRole('heading', { name: 'favorites' })
    ).toBeInTheDocument();
  });
});
