import { memo } from 'react';
import type { MovieSummary } from '../api/movies';
import styled from 'styled-components';
import { TitleAndStar } from './TitleAndStar';
import { MovieDetailsRow } from './MovieDetailsRow';

const MovieItem = styled.li`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--color-white-omega);
  transition: transform 0.5s;

  &:hover {
    transform: scale(1.03);

    h3 {
      color: var(--color-yellow);
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-right: 1rem;
  border-radius: 8px;
`;

const MovieDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
`;

export const MovieItemComponent = memo(
  ({
    movie,
    onClick,
  }: {
    movie: MovieSummary;
    onClick: (movieId: string) => void;
  }) => (
    <MovieItem key={movie.movieId}>
      <Poster src={movie.poster} alt={movie.title} />
      <MovieDetails>
        <TitleAndStar movie={movie} onClick={onClick} />
        <MovieDetailsRow name='release year' value={movie.year} />
      </MovieDetails>
    </MovieItem>
  )
);
