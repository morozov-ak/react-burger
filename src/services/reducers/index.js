import { combineReducers } from "redux";
import { orderReducer } from "./order";
import { ingredientReducer } from "./ingredients";
import { burgerConstructorReducer } from "./burgerConstructor";
import { ingredientDetailsReducer } from "./ingredientDetails";
import { loginReducer } from "./login";
import { registrationReducer } from "./registration";
import { resetPasswordReducer } from "./resetPassword";
import { profileReducer } from "./profile";

export const rootReducer = combineReducers({
  order: orderReducer,
  ingredients: ingredientReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  loginForm: loginReducer,
  registrationForm: registrationReducer,
  resetPasswordForm: resetPasswordReducer,
  profileForm: profileReducer,
});
