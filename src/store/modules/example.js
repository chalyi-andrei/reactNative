// @flow
import api from '../../api';
import { API_REQUEST } from '../apiAction';
import type { ApiRequest } from '../apiAction';
import type { SomeType } from '../../api/modules/example-crud';

const LOAD_SOME = 'example/LOAD_SOME';
const LOAD_SOME_SUCCESS = 'example/LOAD_SOME_SUCCESS';
const LOAD_SOME_FAILURE = 'example/LOAD_SOME_FAILURE';

const SAVE_SOME = 'example/SAVE_SOME';
const SAVE_SOME_SUCCESS = 'example/SAVE_SOME_SUCCESS';
const SAVE_SOME_FAILURE = 'example/SAVE_SOME_FAILURE';

const UPDATE_SOME = 'example/UPDATE_SOME';
const UPDATE_SOME_SUCCESS = 'example/UPDATE_SOME_SUCCESS';
const UPDATE_SOME_FAILURE = 'example/UPDATE_SOME_FAILURE';

const DELETE_SOME = 'example/DELETE_SOME';
const DELETE_SOME_SUCCESS = 'example/DELETE_SOME_SUCCESS';
const DELETE_SOME_FAILURE = 'example/DELETE_SOME_FAILURE';

type LoadSome = {
  type: 'example/LOAD_SOME',
};
type LoadSomeSuccess = {
  type: 'example/LOAD_SOME_SUCCESS',
  result: {
    data: Array<SomeType>,
  },
};
type LoadSomeFailure = {
  type: 'example/LOAD_SOME_FAILURE',
  error: {
    message: string,
  },
};

type SaveSome = {
  type: 'example/SAVE_SOME',
};
type SaveSomeSuccess = {
  type: 'example/SAVE_SOME_SUCCESS',
  result: {
    data: SomeType,
  },
};
type SaveSomeFailure = {
  type: 'example/SAVE_SOME_FAILURE',
  error: {
    message: string,
  },
};

type UpdateSome = {
  type: 'example/UPDATE_SOME',
};
type UpdateSomeSuccess = {
  type: 'example/UPDATE_SOME_SUCCESS',
  result: {
    data: SomeType,
  },
};
type UpdateSomeFailure = {
  type: 'example/UPDATE_SOME_FAILURE',
  error: {
    message: string,
  },
};

type DeleteSome = {
  type: 'example/DELETE_SOME',
};
type DeleteSomeSuccess = {
  type: 'example/DELETE_SOME_SUCCESS',
  result: {
    data: SomeType,
  },
};
type DeleteSomeFailure = {
  type: 'example/DELETE_SOME_FAILURE',
  error: {
    message: string,
  },
};

type ActionType =
  | LoadSome
  | LoadSomeSuccess
  | LoadSomeFailure
  | SaveSome
  | SaveSomeSuccess
  | SaveSomeFailure
  | UpdateSome
  | UpdateSomeSuccess
  | UpdateSomeFailure
  | DeleteSome
  | DeleteSomeSuccess
  | DeleteSomeFailure
;

export type SomeState = {
  data: Array<SomeType>,
  loaded: boolean,
  error: ?string,
}

export type SomeActionState = {
  done: boolean,
  error: ?string,
}

type ExapmleState = {
  some: SomeState,
  action: SomeActionState,
};

const initialState: ExapmleState = {
  some: {
    data: [],
    loaded: false,
    error: null,
  },
  action: {
    done: false,
    error: null,
  },
};

export default function exampleReducer(state: ExapmleState = initialState, action: ActionType): ExapmleState {
  switch (action.type) {
    case LOAD_SOME:
      return {
        ...state,
        some: {
          ...initialState.some,
        },
      };

    case LOAD_SOME_SUCCESS:
      return {
        ...state,
        some: {
          ...initialState.some,
          data: action.result.data,
          loaded: true,
        },
      };

    case LOAD_SOME_FAILURE:
      return {
        ...state,
        some: {
          ...initialState.some,
          data: action.error.message,
        },
      };

    case SAVE_SOME:
    case UPDATE_SOME:
    case DELETE_SOME:
      return {
        ...state,
        action: {
          ...initialState.action,
        }
      };

    case SAVE_SOME_SUCCESS:
      return {
        some: {
          ...state.some,
          data: [...state.some.data, action.result.data],
        },
        action: {
          ...initialState.action,
          done: true,
        },
      };

    case UPDATE_SOME_SUCCESS: {
      const data = state.data.map(item => {
        if (item.id === action.result.data.id) {
          return action.result.data;
        }

        return item;
      });

      return {
        some: {
          ...state.some,
          data,
        },
        action: {
          ...initialState.action,
          done: true,
        },
      };
    }

    case DELETE_SOME_SUCCESS: {
      const data = state.some.data.filter(item => item.id !== action.result.data.id);

      return {
        some: {
          ...state.some,
          data,
        },
        action: {
          ...initialState.action,
          done: true,
        },
      };
    }

    case SAVE_SOME_FAILURE:
    case UPDATE_SOME_FAILURE:
    case DELETE_SOME_FAILURE:
      return {
        ...state,
        action: {
          ...initialState.action,
          error: action.error.message,
        },
      };

    default:
      return state;
  }
}

export function loadSome(page: number): ApiRequest<Array<SomeType>> {
  console.log('action page:', page)
  return {
    type: API_REQUEST,
    types: [LOAD_SOME, LOAD_SOME_SUCCESS, LOAD_SOME_FAILURE],
    call: () => api().some.list(page),
  };
}

export function saveSome(data: $Shape<SomeType>): ApiRequest<SomeType> {
  return {
    type: API_REQUEST,
    types: [SAVE_SOME, SAVE_SOME_SUCCESS, SAVE_SOME_FAILURE],
    call: () => api().some.create(data),
  };
}

export function updateSome(data: SomeType): ApiRequest<SomeType> {
  return {
    type: API_REQUEST,
    types: [UPDATE_SOME, UPDATE_SOME_SUCCESS, UPDATE_SOME_FAILURE],
    call: () => api().some.update(data),
  };
}

export function removeSome(id: number): ApiRequest<SomeType> {
  return {
    type: API_REQUEST,
    types: [DELETE_SOME, DELETE_SOME_SUCCESS, DELETE_SOME_FAILURE],
    call: () => api().some.delete(id),
  };
}
