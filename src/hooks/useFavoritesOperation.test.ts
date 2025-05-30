import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { useFavoritesOperation } from './useFavoritesOperation';
import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  CLEAR_FAVORITES,
} from '../contexts/favorites/favoritesReducer';
import { useFavoritesContext } from '../contexts/favorites/useFavoritesContext';
import type { MovieSummary } from '../api/movies';

vi.mock('../contexts/favorites/useFavoritesContext', () => ({
  useFavoritesContext: vi.fn(),
}));

const mockUseFavoritesContext = useFavoritesContext as Mock;

describe('useFavoritesOperation', () => {
  const mockDispatch = vi.fn();
  const sampleMovie: MovieSummary = {
    movieId: '1',
    title: 'Test Movie',
    year: '2021',
    poster: '/test-movie.jpg',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseFavoritesContext.mockReturnValue({
      state: { favorites: [] },
      dispatch: mockDispatch,
    });
  });

  it('adds movie to favorites if not already present', () => {
    const { result } = renderHook(() => useFavoritesOperation());

    result.current.onFavoriteClick(sampleMovie);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: ADD_TO_FAVORITES,
      payload: sampleMovie,
    });
  });

  it('removes movie from favorites if already present', () => {
    mockUseFavoritesContext.mockReturnValue({
      state: { favorites: [sampleMovie] },
      dispatch: mockDispatch,
    });

    const { result } = renderHook(() => useFavoritesOperation());

    result.current.onFavoriteClick(sampleMovie);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: REMOVE_FROM_FAVORITES,
      payload: sampleMovie.movieId,
    });
  });

  it('does nothing if movieId is missing', () => {
    const { result } = renderHook(() => useFavoritesOperation());

    result.current.onFavoriteClick({ ...sampleMovie, movieId: '' });

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('returns true from isMovieInFavorites if movie is in favorites', () => {
    mockUseFavoritesContext.mockReturnValue({
      state: { favorites: [sampleMovie] },
      dispatch: mockDispatch,
    });

    const { result } = renderHook(() => useFavoritesOperation());

    expect(result.current.isMovieInFavorites(sampleMovie.movieId)).toBe(true);
  });

  it('returns false from isMovieInFavorites if movie is not in favorites', () => {
    const { result } = renderHook(() => useFavoritesOperation());

    expect(result.current.isMovieInFavorites(sampleMovie.movieId)).toBe(false);
  });

  it('dispatches clearFavorites correctly', () => {
    const { result } = renderHook(() => useFavoritesOperation());

    result.current.clearFavorites();

    expect(mockDispatch).toHaveBeenCalledWith({
      type: CLEAR_FAVORITES,
    });
  });

  it('returns current favorites from state', () => {
    mockUseFavoritesContext.mockReturnValue({
      state: { favorites: [sampleMovie] },
      dispatch: mockDispatch,
    });

    const { result } = renderHook(() => useFavoritesOperation());

    expect(result.current.favorites).toEqual([sampleMovie]);
  });
});
