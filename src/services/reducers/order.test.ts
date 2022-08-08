import { CLOSE_ORDER_MODAL, OPEN_ORDER_MODAL, RESET_ORDER, SET_EMAIL_LOGIN, SET_ERROR, SUCCESS_ORDER } from '../actions';
import { orderReducer, TOrderStore } from './order';

describe('order reducer', () => {
  const initialState:TOrderStore = {
    errorOrder: '',
    orderId: null,
    orderedBurgerName: null,
    isOpenedOrederModal: false,
  };

  it('should return the initial state', () => {
    expect(orderReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should open order modal', () => {
    const expected = {
      ...initialState,
      isOpenedOrederModal: true,
    }

    const action = {type: OPEN_ORDER_MODAL, payload:true}

    expect(orderReducer(initialState as any, action as any)).toEqual(expected)
  })

  it('should close order modal', () => {
    const state = {
      ...initialState,
      orderId: 1234,
      orderedBurgerName: 'test name',
      isOpenedOrederModal: true,
    }

    const action = {type: CLOSE_ORDER_MODAL}

    expect(orderReducer(state as any, action as any)).toEqual(initialState)
  })

  it('should set order info', () => {
    const expected = {
      ...initialState,
      orderId: 22368,
      orderedBurgerName: 'Space бургер',
    }

    const payload = {
      name: 'Space бургер',
      order: {
        number: 22368,
      }
    }

    const action = {type: SUCCESS_ORDER,payload}

    expect(orderReducer(initialState as any, action as any)).toEqual(expected)
  })

  it('should set error', () => {
    const expected = {
      ...initialState,
      errorOrder: 'test error',
    }

    const action = {type: SET_ERROR,error:'test error'}

    expect(orderReducer(initialState as any, action as any)).toEqual(expected)
  })

  it('should reset error', () => {
    const state = {
      ...initialState,
      orderId: 1234,
      orderedBurgerName: 'test name',
      isOpenedOrederModal: true,
    }

    const action = {type: RESET_ORDER}

    expect(orderReducer(state as any, action as any)).toEqual(initialState)
  })
})