import { SET_CODE_RESET, SET_IS_RESETED, SET_PASSWORD_RESET, TOGGLE_PASSWORD_RESET } from '../actions';
import { resetPasswordReducer, TResetStore } from './resetPassword';

describe('reset password reducer', () => {
  const initialState:TResetStore = {
    code: "",
    password: "",
    isReseted: false,
    isHidePassword: true,
  };

  it('should return the initial state', () => {
    expect(resetPasswordReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should set reset code', () => {
    const expected = {
      ...initialState,
      code: 'test code',
    }

    const action = {type: SET_CODE_RESET, payload:'test code'}

    expect(resetPasswordReducer(initialState as any, action as any)).toEqual(expected)
  })

  it('should set is resetted', () => {
    const expected = {
      ...initialState,
      isReseted: true,
    }

    const action = {type: SET_IS_RESETED}

    expect(resetPasswordReducer(initialState as any, action as any)).toEqual(expected)
  })

  it('should set password', () => {
    const expected = {
      ...initialState,
      password: 'test password',
    }

    const action = {type: SET_PASSWORD_RESET, payload: 'test password'}

    expect(resetPasswordReducer(initialState as any, action as any)).toEqual(expected)
  })

  it('should toggle privacy', () => {
    const expected = {
      ...initialState,
      isHidePassword: false,
    }

    const action = {type: TOGGLE_PASSWORD_RESET}

    expect(resetPasswordReducer(initialState as any, action as any)).toEqual(expected)
  })
})