import { type ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { AuthProvider } from '../contexts/auth/AuthContext';
import { FavoritesProvider } from '../contexts/favorites/FavoritesContext';

type TestProvidersProps = {
  children: ReactNode;
  initialEntries?: string[];
};

export const TestProviders = ({
  children,
  initialEntries = ['/'],
}: TestProvidersProps) => {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <AuthProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};
