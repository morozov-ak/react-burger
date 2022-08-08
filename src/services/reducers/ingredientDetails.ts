import {
  OPEN_NUTRITIONS_MODAL,
  CLOSE_NUTRITIONS_MODAL,
} from "../actions/bun";

export type TIngredientDetailsStore = {
  showedIngredientId: string,
}
export type OpenNutritionsModalAction = { type: typeof OPEN_NUTRITIONS_MODAL, showedIngredientId:string}
export type CloseNutritionsModalAction = { type: typeof CLOSE_NUTRITIONS_MODAL }

export type DetailsActions =
    | OpenNutritionsModalAction
    | CloseNutritionsModalAction


const initialState:TIngredientDetailsStore = {
  showedIngredientId: "",
};

export const ingredientDetailsReducer = (state:TIngredientDetailsStore = initialState, action:DetailsActions) => {
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

    default: {
      return state;
    }
  }
};
