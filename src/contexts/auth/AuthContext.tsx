import { useReducer, type ReactNode } from 'react';
import { authReducer, initialAuthState } from './authReducer';
import { AuthContext } from './useAuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
