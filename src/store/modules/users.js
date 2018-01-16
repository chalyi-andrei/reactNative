// @flow
import api from '../../api';
import { API_REQUEST } from '../apiAction';

const LOAD_USERS = 'example/LOAD_USERS';
const LOAD_USERS_SUCCESS = 'example/LOAD_USERS_SUCCESS';
const LOAD_USERS_FAILURE = 'example/LOAD_USERS_FAILURE';

const initialState: ExapmleState = {
  users: {
    data: [],
    loaded: false,
    error: null,
  },
  action: {
    done: false,
    error: null,
  },
};

export type UsersState = {
  data: Array<*>,
  loaded: boolean,
  error: ?string,
}

export type SomeActionState = {
  done: boolean,
  error: ?string,
}

type ExampleState = {
  users: UsersState,
  action: SomeActionState,
};

export default function usersReducer(state: ExampleState = initialState, action: Object): ExampleState {
  switch (action.type) {
    case LOAD_USERS:
      return {
        ...state,
        users: {
          ...initialState.some,
        },
      };

    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: {
          ...initialState.some,
          data: action.result.data,
          loaded: true,
        },
      };

    case LOAD_USERS_FAILURE:
      return {
        ...state,
        users: {
          ...initialState.some,
          data: action.error.message,
        },
      };

    default:
      return state;
  }
}

export function getUsers(page: number): ApiRequest<Array<SomeType>> {
  console.log('action page:', page)
  return {
    type: API_REQUEST,
    types: [LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_FAILURE],
    call: () => api().users.list(page),
  };
}
