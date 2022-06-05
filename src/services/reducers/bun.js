import {
  FETCH_INGREDIENTS,
  OPEN_NUTRITIONS_MODAL,
  CLOSE_NUTRITIONS_MODAL,
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL,
  ADD_INGREDIENT,
  SET_ERROR,
  MOVE_INGREDIENT,
} from "../actions/bun";

const initialState = {
  ingredients: [],
  createdBun: {
    bun: undefined,
    filling: [],
  },
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
    case ADD_INGREDIENT: {
      if (action.item.type === "bun") {
        return {
          ...state,
          createdBun: { ...state.createdBun, bun: action.item },
        };
      } else {
        return {
          ...state,
          createdBun: {
            ...state.createdBun,
            filling: [...state.createdBun.filling, action.item],
          },
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
