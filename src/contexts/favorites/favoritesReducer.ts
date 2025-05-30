import type { MovieSummary } from '../../api/movies';

export type FavoritesState = {
  favorites: MovieSummary[];
};

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const CLEAR_FAVORITES = 'CLEAR_FAVORITES';

export type FavoritesAction =
  | { type: typeof ADD_TO_FAVORITES; payload: MovieSummary }
  | { type: typeof CLEAR_FAVORITES }
  | { type: typeof REMOVE_FROM_FAVORITES; payload: MovieSummary['movieId'] };

export const initialFavoritesState: FavoritesState = {
  favorites: [],
};

export const favoritesReducer = (
  state: FavoritesState,
  action: FavoritesAction
): FavoritesState => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      if (
        state.favorites.find(
          (movies) => movies.movieId === action.payload.movieId
        )
      ) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(
          (movies) => movies.movieId !== action.payload
        ),
      };
    case CLEAR_FAVORITES:
      return {
        ...state,
        favorites: [],
      };
    default:
      return state;
  }
};
