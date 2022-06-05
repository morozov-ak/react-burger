import {
  FETCH_INGREDIENTS,
  OPEN_NUTRITIONS_MODAL,
  CLOSE_NUTRITIONS_MODAL,
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL,
  SET_ERROR,
} from "../actions/bun";

const initialState = {
  ingredients: [],
  createdBun: [],
  error: false,

  isOpenedOrederModal: false,
  showedIngredientId: "",
};

export const bunReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.payload,
      };
    }
    case OPEN_NUTRITIONS_MODAL: {
      return {
        ...state,
        showedIngredientId: action.showedIngredientId,
      };
    }
    case CLOSE_NUTRITIONS_MODAL: {
      return {
        ...state,
        showedIngredientId: "",
      };
    }
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        isOpenedOrederModal: true,
      };
    }
    case CLOSE_ORDER_MODAL: {
      return {
        ...state,
        isOpenedOrederModal: false,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};
