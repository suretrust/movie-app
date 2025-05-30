import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from './useAuth';
import { LOG_OUT } from '../contexts/auth/authReducer';
import { useAuthContext } from '../contexts/auth/useAuthContext';
import { useFavoritesOperation } from './useFavoritesOperation';

vi.mock('../contexts/auth/useAuthContext', () => ({
  useAuthContext: vi.fn(),
}));

vi.mock('./useFavoritesOperation', () => ({
  useFavoritesOperation: vi.fn(),
}));

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>(
    'react-router'
  );
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
  };
});

const mockUseAuthContext = useAuthContext as Mock;
const mockUseFavoritesOperation = useFavoritesOperation as Mock;
const mockUseNavigate = useNavigate as Mock;
const mockUseLocation = useLocation as Mock;

describe('useAuth', () => {
  const mockDispatch = vi.fn();
  const mockClearFavorites = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseAuthContext.mockReturnValue({
      state: { auth: { email: 'test@example.com' } },
      dispatch: mockDispatch,
    });
    mockUseFavoritesOperation.mockReturnValue({
      clearFavorites: mockClearFavorites,
    });
    mockUseNavigate.mockReturnValue(mockNavigate);
    mockUseLocation.mockReturnValue({
      pathname: '/favorites',
      search: '?from=menu',
    });
  });

  it('returns isAuthenticated true when user email exists', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(true);
  });

  it('logs out and clears favorites and navigates home', () => {
    const { result } = renderHook(() => useAuth());
    result.current.logout();

    expect(mockDispatch).toHaveBeenCalledWith({ type: LOG_OUT });
    expect(mockClearFavorites).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('logs in with email', () => {
    const { result } = renderHook(() => useAuth());
    result.current.login('user@example.com');

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'LOGIN',
      payload: 'user@example.com',
    });
  });

  it('constructs the correct loginAndRedirectLink', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.loginAndRedirectLink).toBe(
      '/login?redirectTo=%2Ffavorites%3Ffrom%3Dmenu'
    );
  });

  it('requireAuth navigates if not authenticated', () => {
    (useAuthContext as Mock).mockReturnValue({
      state: { auth: { email: '' } },
      dispatch: mockDispatch,
    });

    const { result } = renderHook(() => useAuth());
    result.current.requireAuth();

    expect(mockNavigate).toHaveBeenCalledWith(
      '/login?redirectTo=%2Ffavorites%3Ffrom%3Dmenu',
      { replace: true }
    );
  });

  it('requireAuth does nothing if already authenticated', () => {
    const { result } = renderHook(() => useAuth());
    result.current.requireAuth();

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
