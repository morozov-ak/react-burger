import {
  SET_NAME_REGISTRATION,
  SET_EMAIL_REGISTRATION,
  SET_PASSWORD_REGISTRATION,
  TOGGLE_PASSWORD_REGISTRATION,
  CLEAR_REGISTRATION,
} from "../actions/auth";

const initialState = {
  name: "",
  email: "",
  password: "",
  isHidePassword: true,
};

export const registrationReducer = (state = initialState, action) => {
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
