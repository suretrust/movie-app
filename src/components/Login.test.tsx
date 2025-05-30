import { render, screen, fireEvent } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Login } from './Login';
import { useAuth } from '../hooks/useAuth';
import { TestProviders } from '../test-utils/TestProviders';
import type { Mock } from 'vitest';
import { useNavigate, useSearchParams } from 'react-router';

vi.mock('../hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

const mockUseAuth = useAuth as Mock;
const mockUseNavigate = useNavigate as Mock;
const mockUseSearchParams = useSearchParams as Mock;

describe('<Login />', () => {
  const mockLogin = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    mockUseAuth.mockReturnValue({ login: mockLogin });
    mockUseNavigate.mockReturnValue(mockNavigate);
    mockUseSearchParams.mockReturnValue([new URLSearchParams(), vi.fn()]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderLoginComponent = () => {
    render(
      <TestProviders>
        <Login />
      </TestProviders>
    );
  };

  it('renders the login form with email input and submit button', () => {
    renderLoginComponent();

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'login' })).toBeInTheDocument();
  });

  it('calls login and navigates on valid email submission', () => {
    renderLoginComponent();

    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.click(submitButton);

    expect(mockLogin).toHaveBeenCalledWith('user@example.com');
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });

  it('does not call login if email is empty', () => {
    renderLoginComponent();

    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(submitButton);

    expect(mockLogin).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('uses redirectTo param if present', () => {
    const params = new URLSearchParams();
    params.set('redirectTo', '/favorites');
    mockUseSearchParams.mockReturnValue([params, vi.fn()]);

    renderLoginComponent();

    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.click(submitButton);

    expect(mockNavigate).toHaveBeenCalledWith('/favorites', { replace: true });
  });
});
