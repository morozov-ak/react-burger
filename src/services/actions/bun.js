import { fetchIngredients } from "../../api/fetchIngredients";

export const FETCH_INGREDIENTS = "FETCH_INGREDIENTS";
export const OPEN_NUTRITIONS_MODAL = "OPEN_NUTRITIONS_MODAL";
export const CLOSE_NUTRITIONS_MODAL = "CLOSE_NUTRITIONS_MODAL";
export const OPEN_ORDER_MODAL = "OPEN_ORDER_MODAL";
export const CLOSE_ORDER_MODAL = "CLOSE_ORDER_MODAL";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const SET_ERROR = "SET_ERROR";

export function fetchIngredientsReducer() {
  return async (dispatch) => {
    try {
      const res = await fetchIngredients();
      dispatch({ type: FETCH_INGREDIENTS, payload: res.data });
    } catch (e) {
      dispatch({ type: SET_ERROR, error: "Ошибка выполнения запроса" });
    }
  };
}
