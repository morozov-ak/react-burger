import { CLEAR_PROFILE, RESET_PROFILE, SET_EMAIL_PROFILE, SET_NAME_PROFILE, SET_PASSWORD_PROFILE, SET_PROFILE } from '../actions';
import { profileReducer, TProfileStore } from './profile';

describe('profile reducer', () => {
  const initialState:TProfileStore = {
    isChanged: false,
    nameOld: "",
    emailOld: "",
    name: "",
    email: "",
    password: "",
    isHidePassword: true,
  };

  it('should return the initial state', () => {
    expect(profileReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should change name', () => {
    const expected = {
      ...initialState,
      name: 'test name',
      isChanged: true,
    }

    const action = {type: SET_NAME_PROFILE, payload:'test name'}

    expect(profileReducer(initialState as any, action as any)).toEqual(expected)
  })

  it('should change email', () => {
    const expected = {
      ...initialState,
      email: 'test email',
      isChanged: true,
    }

    const action = {type: SET_EMAIL_PROFILE, payload:'test email'}

    expect(profileReducer(initialState as any, action as any)).toEqual(expected)
  })

  it('should change password', () => {
    const expected = {
      ...initialState,
      password: 'test password',
      isChanged: true,
    }

    const action = {type: SET_PASSWORD_PROFILE, payload:'test password'}

    expect(profileReducer(initialState as any, action as any)).toEqual(expected)
  })

  it('should set name and email', () => {
    const expected = {
      ...initialState,
      name: 'test name',
      email: 'test email',
      nameOld: 'test name',
      emailOld: 'test email',
    }

    const action = {type: SET_PROFILE, payload:{name:'test name',email:'test email'}}

    expect(profileReducer(initialState as any, action as any)).toEqual(expected)
  })

  it('should discard changes', () => {
    const state = {
      ...initialState,
      name: 'test name changed',
      email: 'test email changed',
      nameOld: 'test name',
      emailOld: 'test email',
    }

    const expected = {
      ...initialState,
      name: 'test name',
      email: 'test email',
      nameOld: 'test name',
      emailOld: 'test email',
    }

    const action = {type: RESET_PROFILE}

    expect(profileReducer(state as any, action as any)).toEqual(expected)
  })

  it('should clear profile', () => {
    const state = {
      ...initialState,
      name: 'test name changed',
      email: 'test email changed',
      nameOld: 'test name',
      emailOld: 'test email',
    }

    const action = {type: CLEAR_PROFILE}

    expect(profileReducer(state as any, action as any)).toEqual(initialState)
  })
})