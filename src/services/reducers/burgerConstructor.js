import {
  ADD_INGREDIENT,
  CLOSE_ORDER_MODAL,
  MOVE_INGREDIENT,
  REMOVE_INGREDIENT,
} from "../actions/bun";

const initialState = {
  createdBun: {
    bun: undefined,
    filling: [],
  },
  fillingIds: [],
  bunId: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
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
      return {
        createdBun: {
          bun: undefined,
          filling: [],
        },
        fillingIds: [],
        bunId: [],
      };
    }

    default: {
      return state;
    }
  }
};
