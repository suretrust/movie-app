import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, type Mock } from 'vitest';
import { useMovieDetails } from './useMovieDetails';
import { useParams } from 'react-router';
import { api, type ErrorWithStatus } from '../api/movies';

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>(
    'react-router'
  );
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

vi.mock('../api/movies', () => ({
  api: {
    getMovieDetails: vi.fn(),
  },
}));

const mockUseParams = useParams as Mock;
const mockGetMovieDetails = api.getMovieDetails as Mock;

describe('useMovieDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches movie details successfully', async () => {
    const mockMovie = {
      movieId: '1',
      title: 'Test Movie',
      releaseYear: 2021,
      rating: 4.8,
    };

    mockUseParams.mockReturnValue({ movieId: '1' });
    mockGetMovieDetails.mockResolvedValue(mockMovie);

    const { result } = renderHook(() => useMovieDetails());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movie).toEqual(mockMovie);
    expect(result.current.error).toBe(null);
  });

  it('handles 404 error gracefully', async () => {
    mockUseParams.mockReturnValue({ movieId: '999' });
    const error: ErrorWithStatus = new Error('Not found');
    // Add status to the error object to simulate a 404
    error.status = 404;

    mockGetMovieDetails.mockRejectedValue(error);

    const { result } = renderHook(() => useMovieDetails());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(
      'Movie not found. Please check the ID and try again.'
    );
    expect(result.current.movie).toBe(null);
  });

  it('handles general fetch failure', async () => {
    mockUseParams.mockReturnValue({ movieId: '1' });

    const error = new Error('Internal server error');
    mockGetMovieDetails.mockRejectedValue(error);

    const { result } = renderHook(() => useMovieDetails());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(
      'Failed to load movie details. Please try again later.'
    );
    expect(result.current.movie).toBe(null);
  });

  it('does not fetch if movieId is missing', () => {
    mockUseParams.mockReturnValue({ movieId: undefined });
    const { result } = renderHook(() => useMovieDetails());

    expect(result.current.loading).toBe(false);
    expect(result.current.movie).toBe(null);
    expect(result.current.error).toBe(null);
    expect(mockGetMovieDetails).not.toHaveBeenCalled();
  });
});
