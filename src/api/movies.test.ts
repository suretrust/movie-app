import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { api, type MovieDetails } from './movies';

const mockMovieData: MovieDetails[] = [
  {
    movieId: '1',
    title: 'Test Movie One',
    year: '2001',
    poster: 'poster1.jpg',
    plot: 'Plot for movie one.',
    director: 'Jane Doe',
    cast: 'Actor A, Actor B',
    genre: 'Action, Adventure',
  },
  {
    movieId: '2',
    title: 'Another Test Movie',
    year: '2005',
    poster: 'poster2.jpg',
    plot: 'Plot for movie two.',
    director: 'John Smith',
    cast: 'Actor C, Actor D',
    genre: 'Drama, Thriller',
  },
];

describe('api module', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    api.mockMovies.length = 0;
    api.mockMovies.push(...mockMovieData);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('searchMovies', () => {
    it('returns movies matching the query', async () => {
      const promise = api.searchMovies('test movie');
      vi.runAllTimers();
      const result = await promise;

      expect(result.length).toBe(2);
      expect(result[0].title).toMatch(/Test Movie One/i);
      expect(result[1].title).toMatch(/Another Test Movie/i);
    });

    it('returns at most 20 results', async () => {
      const promise = api.searchMovies('movie');
      vi.runAllTimers();
      const result = await promise;

      expect(result.length).toBeLessThanOrEqual(20);
    });

    it('returns an empty array if no match is found', async () => {
      const promise = api.searchMovies('Nonexistent Title');
      vi.runAllTimers();
      const result = await promise;

      expect(result).toEqual([]);
    });
  });

  describe('getMovieDetails', () => {
    it('returns movie details for a valid movieId', async () => {
      const promise = api.getMovieDetails('1');
      vi.runAllTimers();
      const details = await promise;

      expect(details).toMatchObject(mockMovieData[0]);
    });

    it('throws NotFoundError if movieId is invalid', async () => {
      const promise = api.getMovieDetails('not-found-id');
      vi.runAllTimers();

      await expect(promise).rejects.toMatchObject({
        name: 'NotFoundError',
        message: 'Movie not found.',
        status: 404,
      });
    });
  });
});
