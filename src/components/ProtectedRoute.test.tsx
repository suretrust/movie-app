import { render, screen } from '@testing-library/react';
import { describe, it, vi, afterEach, expect } from 'vitest';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '../hooks/useAuth';
import { TestProviders } from '../test-utils/TestProviders';
import type { Mock } from 'vitest';

vi.mock('../hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    Navigate: ({ to }: { to: string }) => <div>Redirected to {to}</div>,
  };
});

const mockUseAuth = useAuth as Mock;

describe('<ProtectedRoute />', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderProtectedRoute = () => {
    render(
      <TestProviders>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </TestProviders>
    );
  };

  it('renders children when user is authenticated', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      loginAndRedirectLink: '/login',
    });

    renderProtectedRoute();

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to login when user is not authenticated', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      loginAndRedirectLink: '/login',
    });

    renderProtectedRoute();

    expect(screen.getByText('Redirected to /login')).toBeInTheDocument();
  });
});
