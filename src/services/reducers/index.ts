import { combineReducers } from "redux";
import { orderReducer, TOrderStore } from "./order";
import { ingredientReducer, TIngredientsStore } from "./ingredients";
import { burgerConstructorReducer, TBurgerConstructor } from "./burgerConstructor";
import { ingredientDetailsReducer, TIngredientDetailsStore } from "./ingredientDetails";
import { loginReducer, TLoginStore } from "./login";
import { registrationReducer, TRegistrationStore } from "./registration";
import { resetPasswordReducer, TResetStore } from "./resetPassword";
import { profileReducer, TProfileStore } from "./profile";
import { authReducer, TAuthStore } from "./auth";

export type TStore = {
  auth: TAuthStore,
  ingredientDetails: TIngredientDetailsStore,
  burgerConstructor: TBurgerConstructor,
  order: TOrderStore,
  ingredients: TIngredientsStore,
  loginForm: TLoginStore,
  registrationForm: TRegistrationStore,
  resetPasswordForm: TResetStore,
  profileForm: TProfileStore,
}

export const rootReducer = combineReducers({
  auth: authReducer,
  ingredientDetails: ingredientDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  ingredients: ingredientReducer,
  loginForm: loginReducer,
  registrationForm: registrationReducer,
  resetPasswordForm: resetPasswordReducer,
  profileForm: profileReducer,
});
