import { useNavigate, useLocation } from 'react-router';
import { useFavoritesOperation } from './useFavoritesOperation';
import { useAuthContext } from '../contexts/auth/useAuthContext';
import { LOG_OUT } from '../contexts/auth/authReducer';


export const useAuth = () => {
  const { state, dispatch } = useAuthContext();

  const userEmail = state.auth.email;
  const navigate = useNavigate();
  const location = useLocation();
  const { clearFavorites } = useFavoritesOperation();

  const isAuthenticated = Boolean(userEmail);

  const logout = () => {
    dispatch({ type: LOG_OUT });
    clearFavorites();
    navigate('/');
  };

  const login = (email: string) => {
    dispatch({ type: 'LOGIN', payload: email });
  };

  const redirectToLink = encodeURIComponent(
    location.pathname + location.search
  );

  const loginAndRedirectLink = `/login?redirectTo=${redirectToLink}`;

  const requireAuth = () => {
    if (!isAuthenticated) {
      navigate(loginAndRedirectLink, { replace: true });
    }
    return false;
  };

  return { isAuthenticated, logout, requireAuth, loginAndRedirectLink, login };
};
