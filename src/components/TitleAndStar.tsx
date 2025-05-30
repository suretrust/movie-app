import styled from 'styled-components';
import { Star } from './images/Star';
import type { MovieSummary } from '../api/movies';
import { useFavoritesOperation } from '../hooks/useFavoritesOperation';
import { useAuth } from '../hooks/useAuth';

const TitleAndStarBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleAndStar = ({
  movie,
  onClick,
}: {
  movie: MovieSummary;
  onClick?: (movieId: string) => void;
}) => {
  const { requireAuth, isAuthenticated } = useAuth();
  const { onFavoriteClick, isMovieInFavorites } = useFavoritesOperation();

  const handleFavoriteClick = (movie: MovieSummary) => {
    if (!isAuthenticated) {
      return requireAuth();
    }
    onFavoriteClick(movie);
  };

  return (
    <TitleAndStarBox>
      <h3 onClick={() => onClick?.(movie.movieId)}>{movie.title}</h3>
      <Star
        isActive={isMovieInFavorites(movie.movieId)}
        onClick={() => handleFavoriteClick(movie)}
      />
    </TitleAndStarBox>
  );
};
