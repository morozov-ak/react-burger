import { CLEAR_FORGOT, SET_EMAIL_FORGOT } from '../actions';
import { forgotPasswordReducer, TForgotStore } from './forgotPassword';

describe('password reducer', () => {
  const initialState:TForgotStore = {
    email: "",
  };

  it('should return the initial state', () => {
    expect(forgotPasswordReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should change password', () => {
    const expected = {
      email: "qwerty",
    }

    const action = {type: SET_EMAIL_FORGOT, payload:'qwerty'}

    expect(forgotPasswordReducer(initialState as any, action as any)).toEqual(expected)
  })

  it('should clear password', () => {
    const state = {
      email: "qwerty",
    }

    const action = {type: CLEAR_FORGOT, payload:'qwerty'}

    expect(forgotPasswordReducer(state as any, action as any)).toEqual(initialState)
  })
})