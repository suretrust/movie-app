import { PageHeader } from './PageHeader';
import styled from 'styled-components';
import { LoadingMessage } from './LoadingMessage';
import { TitleAndStar } from './TitleAndStar';
import { ErrorMessage } from './styled/ErrorMessage';
import { MovieDetailsRow } from './MovieDetailsRow';
import { useMovieDetails } from '../hooks/useMovieDetails';

const Container = styled.div`
  max-width: var(--width-sm);
  margin: 0 auto;
  padding: 1rem;
`;

const Poster = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  margin-right: 1rem;
  border-radius: 8px;
`;

const MovieBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const MovieDetails = () => {
  const { movie, error, loading } = useMovieDetails();

  return (
    <>
      <PageHeader title='movie details' />
      <Container>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {loading && !error && <LoadingMessage />}
        {movie?.movieId && (
          <MovieBody>
            <div>
              <TitleAndStar movie={movie} />
              <MovieDetailsRow name='release year' value={movie.year} />
              <MovieDetailsRow name='director' value={movie.director} />
              <MovieDetailsRow name='cast' value={movie.cast} />
              <MovieDetailsRow name='genres' value={movie.genre} />
            </div>
            <Poster src={movie.poster} alt={movie.title} />
            <p>{movie.plot}</p>
          </MovieBody>
        )}
      </Container>
    </>
  );
};
