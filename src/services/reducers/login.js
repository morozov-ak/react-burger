import {
  SET_EMAIL_LOGIN,
  SET_PASSWORD_LOGIN,
  TOGGLE_PASSWORD_LOGIN,
  CLEAR_LOGIN,
} from "../actions/auth";

const initialState = {
  email: "",
  password: "",
  isHidePassword: true,
};

export const loginReducer = (state = initialState, action) => {
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
