import { useReducer, type ReactNode } from 'react';
import { favoritesReducer, initialFavoritesState } from './favoritesReducer';
import { FavoritesContext } from './useFavoritesContext';

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialFavoritesState);

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};
