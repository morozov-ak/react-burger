import { SET_CODE_RESET, SET_IS_RESETED, TOGGLE_PASSWORD_RESET } from '../actions';
import { WS_CONNECTION_CLOSED, WS_GET_MESSAGE } from '../actions/ws';
import { wsMock } from './mocks';
import { resetPasswordReducer, TResetStore } from './resetPassword';
import { TWsOrdersState, wsOrdersReducer } from './ws';

describe('websocket reducer', () => {
  const initialState: TWsOrdersState = {
    orders: [],
    ordersById: {},
    total: undefined,
    totalToday: undefined,
  };

  it('should return the initial state', () => {
    expect(wsOrdersReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should set orders', () => {
    const expected: TWsOrdersState = {
      orders: [{
        _id: '62b0a994fa747e001bd53781',
        ingredients: [
          '60d3b41abdacab0026a733c7',
          '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2022-06-20T17:08:36.008Z',
        updatedAt: '2022-06-20T17:08:36.412Z',
        number: 18208
      }],
      ordersById: {
        '62b0a994fa747e001bd53781':{
        _id: '62b0a994fa747e001bd53781',
        ingredients: [
          '60d3b41abdacab0026a733c7',
          '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2022-06-20T17:08:36.008Z',
        updatedAt: '2022-06-20T17:08:36.412Z',
        number: 18208
      }},
      total: 22284,
      totalToday: 103,
    };

    const action = {type: WS_GET_MESSAGE, payload:wsMock}

    expect(wsOrdersReducer(initialState as any, action as any)).toEqual(expected)
  })

  it('should set reset code', () => {
    const state: TWsOrdersState = {
      orders: [{
        _id: '62b0a994fa747e001bd53781',
        ingredients: [
          '60d3b41abdacab0026a733c7',
          '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2022-06-20T17:08:36.008Z',
        updatedAt: '2022-06-20T17:08:36.412Z',
        number: 18208
      }],
      ordersById: {
        '62b0a994fa747e001bd53781':{
        _id: '62b0a994fa747e001bd53781',
        ingredients: [
          '60d3b41abdacab0026a733c7',
          '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2022-06-20T17:08:36.008Z',
        updatedAt: '2022-06-20T17:08:36.412Z',
        number: 18208
      }},
      total: 22284,
      totalToday: 103,
    };

    const action = {type: WS_CONNECTION_CLOSED, payload:wsMock}

    expect(wsOrdersReducer(state as any, action as any)).toEqual(initialState)
  })
})