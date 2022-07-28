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
import { TWsOrdersState, wsOrdersReducer } from "./ws";
import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "../middleware/socketMiddleware";
import { wsActions } from "../actions/ws";


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
});

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     ingredientDetails: ingredientDetailsReducer,
//     loginForm: loginReducer,
//     registrationForm: registrationReducer,
//     resetPasswordForm: resetPasswordReducer,
//     profileForm: profileReducer,
//     burgerConstructor: burgerConstructorReducer,
//     order: orderReducer,
//     ingredients: ingredientReducer,
//     //wsOrders:wsOrdersReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(
//       socketMiddleware(
//         "wss://norma.nomoreparties.space/orders/all",
//         wsActions
//       )
//     ),
// });

// export type Store = typeof store;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
