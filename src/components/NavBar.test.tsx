import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, afterEach, beforeEach, expect } from 'vitest';
import { NavBar } from './NavBar';
import { TestProviders } from '../test-utils/TestProviders';
import { useAuth } from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import type { Mock } from 'vitest';
import { NAV_ITEMS } from '../constants';

vi.mock('../hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
  };
});

const mockUseAuth = useAuth as Mock;
const mockUseNavigate = useNavigate as Mock;
const mockUseLocation = useLocation as Mock;

describe('<NavBar />', () => {
  const mockNavigate = vi.fn();
  const mockLogout = vi.fn();

  beforeEach(() => {
    mockUseNavigate.mockReturnValue(mockNavigate);
    mockUseLocation.mockReturnValue({ pathname: '/' });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderNavBar = () => {
    render(
      <TestProviders>
        <NavBar />
      </TestProviders>
    );
  };

  it('renders navigation items from NAV_ITEMS', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false });

    renderNavBar();

    NAV_ITEMS.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('highlights the active item based on location.pathname', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false });
    mockUseLocation.mockReturnValue({ pathname: '/favorites' });

    renderNavBar();

    const activeItem = screen.getByText('favorites');
    expect(activeItem).toHaveStyle('text-decoration: underline;');
  });

  it('calls navigate when a nav item is clicked', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false });

    renderNavBar();

    const moviesLink = screen.getByText('movie search');
    fireEvent.click(moviesLink);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('shows login when not authenticated and navigates on click', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false });

    renderNavBar();

    const loginLink = screen.getByText('login');
    expect(loginLink).toBeInTheDocument();
    fireEvent.click(loginLink);

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('shows logout when authenticated and calls logout on click', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true, logout: mockLogout });

    renderNavBar();

    const logoutLink = screen.getByText('logout');
    expect(logoutLink).toBeInTheDocument();
    fireEvent.click(logoutLink);

    expect(mockLogout).toHaveBeenCalled();
  });
});
