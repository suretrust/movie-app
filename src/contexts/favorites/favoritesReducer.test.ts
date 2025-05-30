import { describe, it, expect } from 'vitest';
import {
  favoritesReducer,
  initialFavoritesState,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  CLEAR_FAVORITES,
  type FavoritesState,
  type FavoritesAction,
} from './favoritesReducer';

import type { MovieSummary } from '../../api/movies';

const mockMovie = (id: string): MovieSummary => ({
  movieId: id,
  title: `Test Movie ${id}`,
  year: '2022',
  poster: `https://example.com/poster/${id}.jpg`,
});

describe('favoritesReducer', () => {
  it('should return the initial state by default', () => {
    const unknownAction = { type: 'UNKNOWN' } as unknown as FavoritesAction;
    const state = favoritesReducer(initialFavoritesState, unknownAction);
    expect(state).toEqual(initialFavoritesState);
  });

  it('should handle ADD_TO_FAVORITES for a new movie', () => {
    const movie = mockMovie('1');
    const action: FavoritesAction = {
      type: ADD_TO_FAVORITES,
      payload: movie,
    };

    const state = favoritesReducer(initialFavoritesState, action);
    expect(state.favorites).toContainEqual(movie);
    expect(state.favorites.length).toBe(1);
  });

  it('should not add duplicate movies to favorites', () => {
    const movie = mockMovie('1');
    const initialState: FavoritesState = {
      favorites: [movie],
    };

    const action: FavoritesAction = {
      type: ADD_TO_FAVORITES,
      payload: movie,
    };

    const state = favoritesReducer(initialState, action);
    expect(state.favorites).toEqual([movie]);
    expect(state.favorites.length).toBe(1);
  });

  it('should handle REMOVE_FROM_FAVORITES', () => {
    const movie1 = mockMovie('1');
    const movie2 = mockMovie('2');

    const initialState: FavoritesState = {
      favorites: [movie1, movie2],
    };

    const action: FavoritesAction = {
      type: REMOVE_FROM_FAVORITES,
      payload: '1',
    };

    const state = favoritesReducer(initialState, action);
    expect(state.favorites).toEqual([movie2]);
  });

  it('should handle CLEAR_FAVORITES', () => {
    const movie1 = mockMovie('1');
    const movie2 = mockMovie('2');

    const initialState: FavoritesState = {
      favorites: [movie1, movie2],
    };

    const action: FavoritesAction = { type: CLEAR_FAVORITES };
    const state = favoritesReducer(initialState, action);
    expect(state.favorites).toEqual([]);
  });

  it('should not mutate the previous state', () => {
    const movie1 = mockMovie('1');
    const initialState: FavoritesState = {
      favorites: [movie1],
    };

    const action: FavoritesAction = {
      type: REMOVE_FROM_FAVORITES,
      payload: '1',
    };

    const nextState = favoritesReducer(initialState, action);
    expect(nextState).not.toBe(initialState);
    expect(initialState.favorites).toContain(movie1);
  });
});
