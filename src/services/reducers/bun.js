import {
  FETCH_INGREDIENTS,
  OPEN_NUTRITIONS_MODAL,
  CLOSE_NUTRITIONS_MODAL,
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL,
  ADD_INGREDIENT,
  SET_ERROR,
  MOVE_INGREDIENT,
  SUCCESS_ORDER,
  REMOVE_INGREDIENT,
} from "../actions/bun";

const initialState = {
  ingredients: [],
  createdBun: {
    bun: undefined,
    filling: [],
  },
  error: false,
  orderId: null,
  fillingIds: [],
  orderedBurgerName: null,

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
        createdBun: {
          bun: undefined,
          filling: [],
        },
        error: false,
        orderId: null,
        fillingIds: [],
        orderedBurgerName: null,

        isOpenedOrederModal: false,
        showedIngredientId: "",
      };
    }

    case SUCCESS_ORDER: {
      return {
        ...state,
        createdBun: {
          bun: undefined,
          filling: [],
        },
        orderId: action.payload.order.number,
        orderedBurgerName: action.payload.name,
      };
    }

    case ADD_INGREDIENT: {
      if (action.item.type === "bun") {
        if (state.createdBun?.bun?._id) {
          const sourceIndexIds = state.fillingIds.indexOf(
            state.createdBun.bun._id
          );
          const newFillingIds = state.fillingIds;
          newFillingIds.splice(sourceIndexIds, 1);

          return {
            ...state,
            createdBun: { ...state.createdBun, bun: action.item },
            fillingIds: [...newFillingIds, action.item._id],
          };
        }

        return {
          ...state,
          createdBun: { ...state.createdBun, bun: action.item },
          fillingIds: [...state.fillingIds, action.item._id],
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
      const newFilling = state.createdBun.filling;
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
      const sourceIndexFillings = state.createdBun.filling.findIndex(
        (item) => item.uid === action.payload.uid
      );
      const sourceIndexIds = state.fillingIds.findIndex(
        (item) => item.uid === action.payload.uid
      );
      const newFilling = state.createdBun.filling;
      const newFillingIds = state.fillingIds;
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
