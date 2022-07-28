import {
  SET_NAME_REGISTRATION,
  SET_EMAIL_REGISTRATION,
  SET_PASSWORD_REGISTRATION,
  TOGGLE_PASSWORD_REGISTRATION,
  CLEAR_REGISTRATION,
} from "../actions/auth";

export type TRegistrationStore = {
  name: string,
  email: string,
  password: string,
  isHidePassword: boolean,
}

export type SetNameAction = { type: typeof SET_NAME_REGISTRATION ,payload:string}
export type SetEmailAction = { type: typeof SET_EMAIL_REGISTRATION ,payload:string}
export type SetPasswordAction = { type: typeof SET_PASSWORD_REGISTRATION ,payload:string}
export type TogglePasswordAction = { type: typeof TOGGLE_PASSWORD_REGISTRATION }
export type ClearAction = { type: typeof CLEAR_REGISTRATION }



export type RegistrationActions =
    | SetNameAction
    | SetEmailAction
    | SetPasswordAction
    | TogglePasswordAction
    | ClearAction

const initialState = {
  name: "",
  email: "",
  password: "",
  isHidePassword: true,
};

export const registrationReducer = (state:TRegistrationStore = initialState, action:RegistrationActions) => {
  switch (action.type) {
    case SET_NAME_REGISTRATION: {
      return {
        ...state,
        name: action.payload,
      };
    }
    case SET_EMAIL_REGISTRATION: {
      return {
        ...state,
        email: action.payload,
      };
    }

    case SET_PASSWORD_REGISTRATION: {
      return {
        ...state,
        password: action.payload,
      };
    }

    case TOGGLE_PASSWORD_REGISTRATION: {
      return {
        ...state,
        isHidePassword: !state.isHidePassword,
      };
    }

    case CLEAR_REGISTRATION: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
