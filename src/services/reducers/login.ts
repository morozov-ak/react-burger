import {
  SET_EMAIL_LOGIN,
  SET_PASSWORD_LOGIN,
  TOGGLE_PASSWORD_LOGIN,
  CLEAR_LOGIN,
} from "../actions/auth";

export type TLoginStore = {
  email: string,
  password: string,
  isHidePassword: boolean,
}

export type SetEmailLoginAction = { type: typeof SET_EMAIL_LOGIN ,payload:string}
export type SetPasswordLoginAction = { type: typeof SET_PASSWORD_LOGIN ,payload:string}
export type ClearAction = { type: typeof CLEAR_LOGIN }
export type TogglePasswordAction = { type: typeof TOGGLE_PASSWORD_LOGIN }



export type Actions =
    | SetEmailLoginAction
    | SetPasswordLoginAction
    | ClearAction
    | TogglePasswordAction


const initialState = {
  email: "",
  password: "",
  isHidePassword: true,
};

export const loginReducer = (state:TLoginStore = initialState, action:Actions) => {
  switch (action.type) {
    case SET_EMAIL_LOGIN: {
      return {
        ...state,
        email: action.payload,
      };
    }

    case SET_PASSWORD_LOGIN: {
      return {
        ...state,
        password: action.payload,
      };
    }

    case CLEAR_LOGIN: {
      return initialState;
    }

    case TOGGLE_PASSWORD_LOGIN: {
      return {
        ...state,
        isHidePassword: !state.isHidePassword,
      };
    }

    default: {
      return state;
    }
  }
};
