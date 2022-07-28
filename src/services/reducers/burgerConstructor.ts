import { TIngredient } from './../../types/types';
import {
  ADD_INGREDIENT,
  CLOSE_ORDER_MODAL,
  MOVE_INGREDIENT,
  REMOVE_INGREDIENT,
} from "../actions/bun";

type TCreatedBun = {
  bun: string | undefined,
  filling: Array<TIngredient>,
}

export type TBurgerConstructor = {
  createdBun: TCreatedBun,
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
  createdBun: {
    bun: undefined,
    filling: [] as Array<TIngredient>,
  } as any,
  fillingIds: [] as Array<string>,
  bunId: [] as Array<string>,
};

export const burgerConstructorReducer = (state:TBurgerConstructor = initialState, action:ConstructorActions) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.item.type === "bun") {
        return {
          ...state,
          createdBun: { ...state.createdBun, bun: action.item },
          bunId: [action.item._id, action.item._id],
        };
      } else {
        return {
          ...state,
          createdBun: {
            ...state.createdBun,
            filling: [...state.createdBun.filling, action.item],
          },
          fillingIds: [...state.fillingIds, action.item._id],
        };
      }
    }

    case MOVE_INGREDIENT: {
      const targetIndex = state.createdBun.filling.findIndex(
        (item) => item.uid === action.targetItem.uid
      );
      const sourceIndex = state.createdBun.filling.findIndex(
        (item) => item.uid === action.sourceItem.uid
      );
      const newFilling = new Array(...state.createdBun.filling);
      newFilling.splice(sourceIndex, 1);
      newFilling.splice(targetIndex, 0, action.sourceItem);
      return {
        ...state,
        createdBun: {
          ...state.createdBun,
          filling: newFilling,
        },
      };
    }

    case REMOVE_INGREDIENT: {
      const newFilling = new Array(...state.createdBun.filling);
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
        createdBun: {
          ...state.createdBun,
          filling: newFilling,
        },
        fillingIds: newFillingIds,
      };
    }

    case CLOSE_ORDER_MODAL: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
