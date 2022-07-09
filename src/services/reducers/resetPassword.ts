import {
  SET_CODE_RESET,
  SET_PASSWORD_RESET,
  TOGGLE_PASSWORD_RESET,
  CLEAR_RESET,
  SET_IS_RESETED,
} from "../actions/auth";

export type TResetStore = {
  code: string,
  password: string,
  isReseted: boolean,
  isHidePassword: boolean,
}

export type SetCodeAction = { type: typeof SET_CODE_RESET ,payload:string}
export type SetPasswordAction = { type: typeof SET_PASSWORD_RESET ,payload:string}
export type TogglePasswordAction = { type: typeof TOGGLE_PASSWORD_RESET }
export type ClearAction = { type: typeof CLEAR_RESET }
export type SetIsResettedAction = { type: typeof SET_IS_RESETED }



export type Actions =
    | SetCodeAction
    | SetPasswordAction
    | TogglePasswordAction
    | ClearAction
    | SetIsResettedAction

const initialState = {
  code: "",
  password: "",
  isReseted: false,
  isHidePassword: true,
};

export const resetPasswordReducer = (state:TResetStore = initialState, action:Actions) => {
  switch (action.type) {
    case SET_CODE_RESET: {
      return {
        ...state,
        code: action.payload,
      };
    }

    case SET_IS_RESETED: {
      return {
        ...state,
        isReseted: true,
      };
    }

    case SET_PASSWORD_RESET: {
      return {
        ...state,
        password: action.payload,
      };
    }

    case CLEAR_RESET: {
      return initialState;
    }

    case TOGGLE_PASSWORD_RESET: {
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
