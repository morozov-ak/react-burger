import { FETCH_INGREDIENTS } from "../actions/bun";

const initialState = {
  ingredients: [],
};

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
