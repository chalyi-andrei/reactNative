// @flow
import api from '../../api';
import { API_REQUEST } from '../apiAction';

export const SET_USER = 'auth/SET_USER';

export const LOGOUT = 'auth/LOGOUT';

export const SIGN_UP_SUCCESS = 'auth/SIGN_UP_SUCCESS';
const SIGN_UP_FAILURE = 'auth/SIGN_UP_FAILURE';

const initialState = {
  auth: {
    email: null,
    password: null,
    error: null,
  },
  action: {
    done: false,
    error: null,
  },
};


export default function authReducer(state = initialState, action: Object) {
  switch (action.type) {
    case SET_USER:
      return {
        ...initialState,
        auth: {
          ...initialState.auth,
          email: action.user.email,
          password: action.user.password,
        }

    };

    case SIGN_UP_FAILURE:
      return {
        ...state,
        auth: {
          ...initialState,
          error: action.error.message,
        },
      };

    default:
      return state;
  }
}

export function login({email, password}) {
  return {
    type: SET_USER,
    user: {email, password},
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
