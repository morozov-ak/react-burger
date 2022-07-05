import {
  SET_CODE_RESET,
  SET_PASSWORD_RESET,
  TOGGLE_PASSWORD_RESET,
  CLEAR_RESET,
  SET_IS_RESETED,
} from "../actions/auth";

const initialState = {
  code: "",
  password: "",
  isReseted: false,
  isHidePassword: true,
};

export const resetPasswordReducer = (state = initialState, action) => {
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
