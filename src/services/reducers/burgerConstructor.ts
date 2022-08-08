import { TIngredient } from './../../types/types';
import {
  ADD_INGREDIENT,
  CLOSE_ORDER_MODAL,
  MOVE_INGREDIENT,
  REMOVE_INGREDIENT,
} from "../actions/bun";

export type TBurgerConstructor = {
  bun: TIngredient | undefined,
  filling: Array<TIngredient>,
  fillingIds: Array<string>,
  bunId: Array<string>,
}

export type AddIngredientAction = { type: typeof ADD_INGREDIENT,item:TIngredient }
export type MoveIngredientAction = { type: typeof MOVE_INGREDIENT,sourceItem:TIngredient,targetItem:TIngredient }
export type RemoveIngredientAction = { type: typeof REMOVE_INGREDIENT,payload:TIngredient }
export type CloseOrderAction = { type: typeof CLOSE_ORDER_MODAL }



export type ConstructorActions =
    | AddIngredientAction
    | MoveIngredientAction
    | CloseOrderAction
    | RemoveIngredientAction



const initialState = {
  bun: undefined,
  filling: [],
  fillingIds: [],
  bunId: [],
};

export const burgerConstructorReducer = (state:TBurgerConstructor = initialState, action:ConstructorActions) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.item.type === "bun") {
        return {
          ...state,
          bun: action.item,
          bunId: [action.item._id, action.item._id],
        };
      } else {
        return {
          ...state,
          filling: [...state.filling, action.item],
          fillingIds: [...state.fillingIds, action.item._id],
        };
      }
    }

    case MOVE_INGREDIENT: {
      const targetIndex = state.filling.findIndex(
        (item) => item.uid === action.targetItem.uid
      );
      const sourceIndex = state.filling.findIndex(
        (item) => item.uid === action.sourceItem.uid
      );
      const newFilling = new Array(...state.filling);
      newFilling.splice(sourceIndex, 1);
      newFilling.splice(targetIndex, 0, action.sourceItem);
      return {
        ...state,
        filling: newFilling,
      };
    }

    case REMOVE_INGREDIENT: {
      const newFilling = new Array(...state.filling);
      const newFillingIds = new Array(...state.fillingIds);
      const sourceIndexFillings = newFilling.findIndex(
        (item) => item.uid === action.payload.uid
      );
      const sourceIndexIds = newFillingIds.findIndex(
        (item) => item === action.payload._id
      );
      newFilling.splice(sourceIndexFillings, 1);
      newFillingIds.splice(sourceIndexIds, 1);

      return {
        ...state,
        filling: newFilling,
        fillingIds: newFillingIds,
      };
    }

    default: {
      return state;
    }
  }
};
