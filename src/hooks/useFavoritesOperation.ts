import type { MovieSummary } from '../api/movies';
import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from '../contexts/favorites/favoritesReducer';
import { useFavoritesContext } from '../contexts/favorites/useFavoritesContext';

export const useFavoritesOperation = () => {
  const { state, dispatch } = useFavoritesContext();

  const onFavoriteClick = (movie: MovieSummary) => {
    if (!movie.movieId) return;
    const isFavorite = isMovieInFavorites(movie.movieId);

    if (isFavorite) {
      dispatch({
        type: REMOVE_FROM_FAVORITES,
        payload: movie.movieId,
      });
    } else {
      dispatch({
        type: ADD_TO_FAVORITES,
        payload: movie,
      });
    }
  };

  const isMovieInFavorites = (movieId: string) => {
    return state.favorites.some((m) => m.movieId === movieId);
  };

  const clearFavorites = () => {
    dispatch({ type: 'CLEAR_FAVORITES' });
  };

  return {
    favorites: state.favorites,
    clearFavorites,
    onFavoriteClick,
    isMovieInFavorites,
  };
};
