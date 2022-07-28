import { CLEAR_FORGOT, SET_EMAIL_FORGOT } from "../actions/auth";

export type TForgotStore = {
  email: string,
}

export type SetEmailForgotAction = { type: typeof SET_EMAIL_FORGOT, payload:string}
export type ClearForgotAction = { type: typeof CLEAR_FORGOT }



export type ForgotActions =
    | SetEmailForgotAction
    | ClearForgotAction




const initialState = {
  email: "",
};

export const forgotPasswordReducer = (state:TForgotStore = initialState, action:ForgotActions) => {
  switch (action.type) {
    case SET_EMAIL_FORGOT: {
      return {
        ...state,
        email: action.payload,
      };
    }

    case CLEAR_FORGOT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
