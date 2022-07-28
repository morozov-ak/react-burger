import { combineReducers } from "redux";
import { OrderActions, orderReducer, TOrderStore } from "./order";
import { FetchIngredientsAction, ingredientReducer, TIngredientsStore } from "./ingredients";
import { burgerConstructorReducer, ConstructorActions, TBurgerConstructor } from "./burgerConstructor";
import { DetailsActions, ingredientDetailsReducer, TIngredientDetailsStore } from "./ingredientDetails";
import { LoginActions, loginReducer, TLoginStore } from "./login";
import { RegistrationActions, registrationReducer, TRegistrationStore } from "./registration";
import { ResetActions, resetPasswordReducer, TResetStore } from "./resetPassword";
import { ProfileActions, profileReducer, TProfileStore } from "./profile";
import { AuthActions, authReducer, TAuthStore } from "./auth";
import { TWsOrdersState, WsActions, wsOrdersReducer } from "./ws";
import { ForgotActions, forgotPasswordReducer } from "./forgotPassword";


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
  wsOrders: TWsOrdersState,
}

export type TApplicationActions = 
    |AuthActions
    |ConstructorActions
    |ForgotActions
    |DetailsActions
    |FetchIngredientsAction
    |LoginActions
    |OrderActions
    |ProfileActions
    |RegistrationActions
    |ResetActions
    |WsActions

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
  wsOrders:wsOrdersReducer,
  forgotForm:forgotPasswordReducer,
});
