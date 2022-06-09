import { combineReducers } from "redux";
import { orderReducer } from "./order";
import { ingredientReducer } from "./ingredients";
import { burgerConstructorReducer } from "./burgerConstructor";
import { ingredientDetailsReducer } from "./ingredientDetails";

export const rootReducer = combineReducers({
  order: orderReducer,
  ingredients: ingredientReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
});
