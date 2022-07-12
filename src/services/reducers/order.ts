import {
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL,
  SET_ERROR,
  SUCCESS_ORDER,
  RESET_ORDER,
} from "../actions/bun";

export type TOrderStore = {
  error: boolean,
  orderId: string | null,
  orderedBurgerName: string | null,
  isOpenedOrederModal: boolean,
}

export type OpenOrderModalAction = { type: typeof OPEN_ORDER_MODAL}
export type CloseOrderModalAction = { type: typeof CLOSE_ORDER_MODAL}
export type SetErrorAction = { type: typeof SET_ERROR,error:string }
export type SuccessOrderAction = { type: typeof SUCCESS_ORDER, payload: {order:{number:number}, name:string } }
export type ResetOrderAction = { type: typeof RESET_ORDER }



export type Actions =
    | OpenOrderModalAction
    | CloseOrderModalAction
    | SetErrorAction
    | SuccessOrderAction
    | ResetOrderAction

const initialState = {
  error: false,
  orderId: null,
  orderedBurgerName: null,
  isOpenedOrederModal: false,
};

export const orderReducer = (state:TOrderStore = initialState, action:Actions) => {
  switch (action.type) {
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        isOpenedOrederModal: true,
      };
    }

    case CLOSE_ORDER_MODAL: {
      return {
        ...state,
        error: false,
        orderId: null,
        orderedBurgerName: null,

        isOpenedOrederModal: false,
      };
    }

    case SUCCESS_ORDER: {
      return {
        ...state,
        orderId: action.payload.order.number,
        orderedBurgerName: action.payload.name,
      };
    }

    case SET_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }

    case RESET_ORDER: {
      return {
        error: false,
        orderId: null,
        orderedBurgerName: null,

        isOpenedOrederModal: false,
      };
    }

    default: {
      return state;
    }
  }
};
