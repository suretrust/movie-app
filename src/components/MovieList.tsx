import styled from 'styled-components';
import { useSearchMovies } from '../hooks/useSearchMovies';
import { useMemo } from 'react';
import type { MovieSummary } from '../api/movies';
import { MovieItemComponent } from './MovieItem';

const MovieListContainer = styled.ul`
  list-style: none;
  padding: 0 2rem 2rem 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const MovieList = ({ movies }: { movies: MovieSummary[] }) => {
  const { handleMovieClick } = useSearchMovies();

  const renderedMovieList = useMemo(() => {
    return movies.map((movie) => (
      <MovieItemComponent
        key={movie.movieId}
        movie={movie}
        onClick={handleMovieClick}
      />
    ));
  }, [handleMovieClick, movies]);

  return <MovieListContainer>{renderedMovieList}</MovieListContainer>;
};
