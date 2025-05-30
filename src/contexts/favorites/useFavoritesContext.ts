import { createContext, useContext, type Dispatch } from 'react';
import type { FavoritesAction, FavoritesState } from './favoritesReducer';

type FavoritesContextType = {
  state: FavoritesState;
  dispatch: Dispatch<FavoritesAction>;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error(
      'useFavoritesContext must be used within a FavoritesProvider'
    );
  return context;
};
