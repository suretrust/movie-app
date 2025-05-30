import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { MOVIE_SEARCH_PARAM } from '../constants';
import { useDebouncedQueryParam } from './useDebouncedQueryParam';
import { useNavigate } from 'react-router';
import { api, type MovieSummary } from '../api/movies';

export const useSearchMovies = () => {
  const defaultQuery =
    new URLSearchParams(window.location.search).get(MOVIE_SEARCH_PARAM) || '';

  const [query, setQuery] = useState<string>(defaultQuery);
  const [debouncedQuery, isTyping] = useDebouncedQueryParam(
    MOVIE_SEARCH_PARAM,
    query,
    300
  );
  const navigate = useNavigate();

  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const moviesCache = useRef<Map<string, MovieSummary[]>>(new Map());

  const resetState = ({ withMovies }: { withMovies: boolean }) => {
    if (withMovies) {
      setMovies([]);
    }
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();

    if (!trimmedQuery) {
      resetState({ withMovies: true });
      return;
    }

    if (moviesCache.current.has(trimmedQuery)) {
      setMovies(moviesCache.current.get(trimmedQuery) || []);
      resetState({ withMovies: false });
      return;
    }

    setLoading(true);
    api
      .searchMovies(debouncedQuery)
      .then((results) => {
        setMovies(results);
        moviesCache.current.set(trimmedQuery, results);
        resetState({ withMovies: false });
      })
      .catch((err) => {
        console.error('Error fetching movies:', err);
        setMovies([]);
        setLoading(false);
        setError('Failed to fetch movies. Please try again later.');
      });
  }, [debouncedQuery]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleMovieClick = (movieId: string) => navigate(`/movies/${movieId}`);

  return {
    query,
    movies,
    error,
    handleInputChange,
    handleMovieClick,
    loading,
    noMoviesFound:
      movies.length === 0 &&
      debouncedQuery.trim() !== '' &&
      !loading &&
      query.trim() !== '' &&
      !error &&
      !isTyping,
  };
};
