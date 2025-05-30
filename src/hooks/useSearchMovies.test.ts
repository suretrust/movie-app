import { renderHook, act, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { useSearchMovies } from './useSearchMovies';
import { useDebouncedQueryParam } from './useDebouncedQueryParam';
import { useNavigate } from 'react-router';
import { api } from '../api/movies';
import type { ChangeEvent } from 'react';

vi.mock('./useDebouncedQueryParam', () => ({
  useDebouncedQueryParam: vi.fn(),
}));

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>(
    'react-router'
  );
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock('../api/movies', () => ({
  api: {
    searchMovies: vi.fn(),
  },
}));

const mockUseDebouncedQueryParam = useDebouncedQueryParam as Mock;
const mockUseNavigate = useNavigate as Mock;
const mockSearchMovies = api.searchMovies as Mock;

describe('useSearchMovies', () => {
  const mockNavigate = vi.fn();
  const mockResults = [
    {
      movieId: '123',
      title: 'Test Movie',
      year: '2023',
      poster: 'https://example.com/poster.jpg',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseNavigate.mockReturnValue(mockNavigate);
  });

  it('handles empty query by resetting movies and state', () => {
    mockUseDebouncedQueryParam.mockReturnValue(['', false]);

    const { result } = renderHook(() => useSearchMovies());

    expect(result.current.movies).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('fetches and caches movies from API', async () => {
    mockUseDebouncedQueryParam.mockReturnValue(['comedy', false]);
    mockSearchMovies.mockResolvedValueOnce(mockResults);

    const { result } = renderHook(() => useSearchMovies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockSearchMovies).toHaveBeenCalledWith('comedy');
    expect(result.current.movies).toEqual(mockResults);
  });

  it('handles API error', async () => {
    mockUseDebouncedQueryParam.mockReturnValue(['drama', false]);
    mockSearchMovies.mockRejectedValueOnce(new Error('API error'));

    const { result } = renderHook(() => useSearchMovies());

    await waitFor(() =>
      expect(result.current.error).toBe(
        'Failed to fetch movies. Please try again later.'
      )
    );

    expect(result.current.movies).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it('navigates to movie detail on movie click', () => {
    mockUseDebouncedQueryParam.mockReturnValue(['test', false]);
    mockSearchMovies.mockResolvedValueOnce([]);

    const { result } = renderHook(() => useSearchMovies());

    act(() => {
      result.current.handleMovieClick('42');
    });

    expect(mockNavigate).toHaveBeenCalledWith('/movies/42');
  });

  it('updates query state on input change', () => {
    mockUseDebouncedQueryParam.mockReturnValue(['initial', false]);
    mockSearchMovies.mockResolvedValueOnce([]);

    const { result } = renderHook(() => useSearchMovies());

    act(() => {
      result.current.handleInputChange({
        target: { value: 'new query' },
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.query).toBe('new query');
  });
});
