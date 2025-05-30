import { describe, it, expect } from 'vitest';
import {
  authReducer,
  initialAuthState,
  LOGIN,
  LOG_OUT,
  type authState,
  type authAction,
} from './authReducer';

describe('authReducer', () => {
  const testEmail = 'user@example.com';

  it('should return the initial state by default', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' } as unknown as authAction;
    const state = authReducer(initialAuthState, unknownAction);
    expect(state).toEqual(initialAuthState);
  });

  it('should handle LOGIN action', () => {
    const action: authAction = { type: LOGIN, payload: testEmail };
    const expectedState: authState = {
      auth: {
        email: testEmail,
      },
    };

    const state = authReducer(initialAuthState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle LOG_OUT action and reset to initial state', () => {
    const loggedInState: authState = {
      auth: {
        email: testEmail,
      },
    };

    const action: authAction = { type: LOG_OUT };
    const state = authReducer(loggedInState, action);
    expect(state).toEqual(initialAuthState);
  });

  it('should preserve immutability when logging in', () => {
    const currentState: authState = {
      auth: {
        email: 'old@example.com',
      },
    };

    const action: authAction = { type: LOGIN, payload: testEmail };
    const state = authReducer(currentState, action);

    expect(state).not.toBe(currentState);
    expect(state.auth.email).toBe(testEmail);
    expect(currentState.auth.email).toBe('old@example.com');
  });
});
