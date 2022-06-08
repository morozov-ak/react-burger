import {
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL,
  SET_ERROR,
  SUCCESS_ORDER,
  RESET_ORDER,
} from "../actions/bun";

const initialState = {
  error: false,
  orderId: null,
  orderedBurgerName: null,

  isOpenedOrederModal: false,
};

export const orderReducer = (state = initialState, action) => {
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
