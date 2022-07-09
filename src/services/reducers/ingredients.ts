import { TIngredient } from './../../types/types';
import { FETCH_INGREDIENTS } from "../actions/bun";

export type TIngredientsStore = {
  ingredients: Array<TIngredient>,
}

export type FetchIngredientsAction = { type: typeof FETCH_INGREDIENTS ,payload:string}

const initialState = {
  ingredients: [],
};

export const ingredientReducer = (state = initialState, action:FetchIngredientsAction) => {
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
