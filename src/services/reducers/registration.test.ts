import { CLEAR_REGISTRATION, SET_EMAIL_REGISTRATION, SET_NAME_REGISTRATION, SET_PASSWORD_REGISTRATION, TOGGLE_PASSWORD_REGISTRATION } from '../actions';
import { registrationReducer, TRegistrationStore } from './registration';

describe('registration reducer', () => {
  const initialState:TRegistrationStore = {
    name: "",
    email: "",
    password: "",
    isHidePassword: true,
  };

  it('should return the initial state', () => {
    expect(registrationReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should change name', () => {
    const expected = {
      ...initialState,
      name: 'test name',
    }

    const action = {type: SET_NAME_REGISTRATION, payload:'test name'}

    expect(registrationReducer(initialState as any, action as any)).toEqual(expected)
  })

  it('should change email', () => {
    const expected = {
      ...initialState,
      email: 'test email',
    }

    const action = {type: SET_EMAIL_REGISTRATION, payload:'test email'}

    expect(registrationReducer(initialState as any, action as any)).toEqual(expected)
  })

  it('should change password', () => {
    const expected = {
      ...initialState,
      password: 'test password',
    }

    const action = {type: SET_PASSWORD_REGISTRATION, payload:'test password'}

    expect(registrationReducer(initialState as any, action as any)).toEqual(expected)
  })

  it('should toggle privacy', () => {
    const expected = {
      ...initialState,
      isHidePassword: false,
    }

    const action = {type: TOGGLE_PASSWORD_REGISTRATION}

    expect(registrationReducer(initialState as any, action as any)).toEqual(expected)
  })

  it('should clear form', () => {
    const state = {
      name: "name",
      email: "email",
      password: "password",
      isHidePassword: false,
    }

    const action = {type: CLEAR_REGISTRATION}

    expect(registrationReducer(state as any, action as any)).toEqual(initialState)
  })
})