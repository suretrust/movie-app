import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { api } from '../api/movies';

type MovieDetailsType = Awaited<ReturnType<typeof api.getMovieDetails>>;

export const useMovieDetails = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!movieId) return;
    setLoading(true);
    setError(null);

    api
      .getMovieDetails(movieId)
      .then((movieDetails) => {
        setMovie(movieDetails);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch movie details:', err);
        if (err.status === 404) {
          setLoading(false);
          setError('Movie not found. Please check the ID and try again.');
          return;
        }

        setError('Failed to load movie details. Please try again later.');
        setLoading(false);
      });
  }, [movieId]);

  return {
    movie,
    error,
    loading,
  };
};
