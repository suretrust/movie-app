import styled from 'styled-components';
import { useFavoritesOperation } from '../hooks/useFavoritesOperation';
import { MovieList } from './MovieList';
import { PageHeader } from './PageHeader';
import { InfoMessage } from './styled/InfoMessage';

const Container = styled.div`
  max-width: var(--width-md);
  margin: 0 auto;
`;

export const Favorites = () => {
  const { favorites } = useFavoritesOperation();

  return (
    <>
      <PageHeader title='favorites' />
      <Container>
        {favorites?.length === 0 ? (
          <InfoMessage>You have no favorite movies yet.</InfoMessage>
        ) : (
          <MovieList movies={favorites} />
        )}
      </Container>
    </>
  );
};
