type email = string;
export type authState = {
  auth: {
    email: email;
  };
};

export const LOGIN = 'LOGIN';
export const LOG_OUT = 'LOG_OUT';

export type authAction =
  | { type: typeof LOGIN; payload: email }
  | { type: typeof LOG_OUT };

export const initialAuthState: authState = {
  auth: {
    email: '',
  },
};

export const authReducer = (
  state: authState,
  action: authAction
): authState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        auth: {
          ...state.auth,
          email: action.payload,
        },
      };
    case LOG_OUT:
      return {
        ...state,
        ...initialAuthState,
      };
    default:
      return state;
  }
};
