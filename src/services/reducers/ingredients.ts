import { TIngredient } from './../../types/types';
import { FETCH_INGREDIENTS } from "../actions/bun";

export type TIngredientsStore = {
  ingredients: Array<TIngredient>,
  ingredientsById: {[key: string]: TIngredient},
}

export type FetchIngredientsAction = { type: typeof FETCH_INGREDIENTS ,payload:Array<TIngredient>}

const initialState = {
  ingredients: [],
  ingredientsById: {},
};

export const ingredientReducer = (state = initialState, action:FetchIngredientsAction) => {
  switch (action.type) {
    case FETCH_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.payload,
        ingredientsById: action.payload.reduce(
          (prev, ingredient) => {return {...prev, [ingredient._id]:ingredient}}
          , {} as TIngredient
          )
      };
    }

    default: {
      return state;
    }
  }
};
