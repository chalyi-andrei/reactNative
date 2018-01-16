// @flow
import { NavigationActions } from 'react-navigation';
import { takeEvery, put, select } from 'redux-saga/effects';
import { Platform, AsyncStorage } from 'react-native';

import api from '../../api';
import { SET_USER, SIGN_UP_SUCCESS, LOGOUT, loginFail } from '../modules/auth';

const AUTH_TOKEN_KEY = 'f421e36be8451675a508fabf73f23dc1';

const loginSelector = state => state.auth.auth.login;
const emailSelector = state => state.auth.auth.email;
const passwordSelector = state => state.auth.auth.password;

function* register() {
  try {
    const login = yield select(loginSelector);
    const email = yield select(emailSelector);
    const password = yield select(passwordSelector);
    const result = yield api().auth.login({
      user: {login, email, password},
    });

    yield put({ type: SIGN_UP_SUCCESS, result });

    const authToken = result.data.token;

    api().setToken(authToken);
    yield AsyncStorage.setItem(AUTH_TOKEN_KEY, authToken);

    yield put(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Users' })],
    }));
  } catch (err) {
    yield put(loginFail(err));
  }
}


function* logout() {
  yield AsyncStorage.setItem(AUTH_TOKEN_KEY, '');
  yield put(NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Start' })],
  }));
}

export default function*(): Generator<*, *, *> {
  yield takeEvery(SET_USER, register);
  yield takeEvery(LOGOUT, logout);

  const authToken = yield AsyncStorage.getItem(AUTH_TOKEN_KEY);
  if (authToken) {
    api().setToken(authToken);

    yield put(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Profile' })],
      }),
    );
  }
}
