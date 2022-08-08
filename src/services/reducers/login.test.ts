import {  CLEAR_LOGIN,  SET_EMAIL_LOGIN, SET_PASSWORD_LOGIN, TOGGLE_PASSWORD_LOGIN } from '../actions';
import { loginReducer, TLoginStore } from './login';

describe('login reducer', () => {
  const initialState:TLoginStore = {
    email: "",
    password: "",
    isHidePassword: true,
  };

  it('should return the initial state', () => {
    expect(loginReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should set email', () => {
    const expected = {
      ...initialState,
      email: 'test_email',
    }

    const action = {type: SET_EMAIL_LOGIN, payload:'test_email'}

    expect(loginReducer(initialState as any, action as any)).toEqual(expected)
  })

  it('should set password', () => {
    const expected = {
      ...initialState,
      password: 'test_password',
    }

    const action = {type: SET_PASSWORD_LOGIN, payload:'test_password'}

    expect(loginReducer(initialState as any, action as any)).toEqual(expected)
  })

  it('should clear form', () => {
    const state = {
      ...initialState,
      email: 'test_email',
      password: 'test_password',
    }

    const action = {type: CLEAR_LOGIN}

    expect(loginReducer(state as any, action as any)).toEqual(initialState)
  })

  it('should toggle privacy', () => {
    const expected = {
      ...initialState,
      isHidePassword: false,
    }

    const action = {type: TOGGLE_PASSWORD_LOGIN}

    expect(loginReducer(initialState as any, action as any)).toEqual(expected)
  })
})