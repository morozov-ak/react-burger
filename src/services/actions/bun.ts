import { fetchIngredients } from "../../api/fetchIngredients";
import { postOrder } from "../../api/postOrder";
import { TIngredient } from "../../types/types";
import { AppDispatch } from "../..";

export const FETCH_INGREDIENTS = "FETCH_INGREDIENTS";
export const OPEN_NUTRITIONS_MODAL = "OPEN_NUTRITIONS_MODAL";
export const CLOSE_NUTRITIONS_MODAL = "CLOSE_NUTRITIONS_MODAL";
export const OPEN_ORDER_MODAL = "OPEN_ORDER_MODAL";
export const CLOSE_ORDER_MODAL = "CLOSE_ORDER_MODAL";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const SET_ERROR = "SET_ERROR";
export const RESET_ORDER = "RESET_ORDER";
export const SUCCESS_ORDER = "SUCCESS_ORDER";
export const SUCCESS_RESET = "SUCCESS_RESET";

export function fetchIngredientsReducer() {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await fetchIngredients();
      dispatch({ type: FETCH_INGREDIENTS, payload: res.data });
    } catch (e) {
      dispatch({ type: SET_ERROR, error: "Ошибка выполнения запроса" });
    }
  };
}

export function makeOrder(ingredientsArray:Array<TIngredient>) {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await postOrder(ingredientsArray);
      if (res.success) {
        dispatch({ type: SUCCESS_ORDER, payload: res });
      } else {
        dispatch({ type: SET_ERROR, error: "Ошибка выполнения запроса" });
      }
    } catch (e) {
      dispatch({ type: SET_ERROR, error: "Ошибка выполнения запроса" });
    }
  };
}
