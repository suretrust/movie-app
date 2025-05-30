import styled from 'styled-components';
import { PageHeader } from './PageHeader';
import { Input } from './styled/Input';
import { Form } from './styled/Form';
import { useSearchMovies } from '../hooks/useSearchMovies';
import { LoadingMessage } from './LoadingMessage';
import { MovieList } from './MovieList';
import { InfoMessage } from './styled/InfoMessage';
import { ErrorMessage } from './styled/ErrorMessage';

const Container = styled.div`
  max-width: var(--width-md);
  margin: 0 auto;
  position: relative;
`;

export const MovieSearch = () => {
  const { query, movies, loading, error, handleInputChange, noMoviesFound } =
    useSearchMovies();

  return (
    <>
      <PageHeader title='movie search'>
        <Form>
          <Input
            type='text'
            placeholder='enter movie title...'
            required
            autoFocus
            value={query}
            onChange={handleInputChange}
          />
        </Form>
      </PageHeader>
      <Container>
        {loading && <LoadingMessage />}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {noMoviesFound && (
          <InfoMessage>{`no movies found for "${query}".`}</InfoMessage>
        )}

        <MovieList movies={movies} />
      </Container>
    </>
  );
};
