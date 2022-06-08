import {
  OPEN_NUTRITIONS_MODAL,
  CLOSE_NUTRITIONS_MODAL,
  CLOSE_ORDER_MODAL,
} from "../actions/bun";

const initialState = {
  showedIngredientId: "",
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
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

    case CLOSE_ORDER_MODAL: {
      return {
        showedIngredientId: "",
      };
    }

    default: {
      return state;
    }
  }
};
