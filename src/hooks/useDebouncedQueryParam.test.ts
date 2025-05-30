import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { useDebouncedQueryParam } from './useDebouncedQueryParam';
import { useNavigate, useSearchParams } from 'react-router';

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>(
    'react-router'
  );
  return {
    ...actual,
    useSearchParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

const mockUseSearchParams = useSearchParams as Mock;
const mockUseNavigate = useNavigate as Mock;

describe('useDebouncedQueryParam', () => {
  const mockSetSearchParams = vi.fn();
  const mockNavigate = vi.fn();
  const mockSearchParams = new URLSearchParams('foo=old');

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    mockUseSearchParams.mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
    mockUseNavigate.mockReturnValue(mockNavigate);
  });

  it('debounces query param updates', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedQueryParam('foo', value, 500),
      { initialProps: { value: 'initial' } }
    );

    expect(result.current[0]).toBe('initial');
    expect(result.current[1]).toBe(true);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current[0]).toBe('initial');
    expect(result.current[1]).toBe(false);

    expect(mockNavigate).toHaveBeenCalledWith('?foo=initial', {
      replace: true,
    });
    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams('foo=initial')
    );

    rerender({ value: '' });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(mockNavigate).toHaveBeenCalledWith('?', { replace: true });
    expect(mockSetSearchParams).toHaveBeenCalledWith(new URLSearchParams());
  });

  it('clears timeout on unmount', () => {
    const { unmount } = renderHook(() =>
      useDebouncedQueryParam('foo', 'bar', 500)
    );

    unmount();
    expect(() => vi.runAllTimers()).not.toThrow();
  });
});
