import { createContext, useContext, type Dispatch } from 'react';
import type { authAction, authState } from './authReducer';

type AuthContextType = {
  state: authState;
  dispatch: Dispatch<authAction>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuthContext must be used within a AuthProvider');
  return context;
};
