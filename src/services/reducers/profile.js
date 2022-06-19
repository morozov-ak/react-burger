import {
  SET_NAME_PROFILE,
  SET_EMAIL_PROFILE,
  SET_PASSWORD_PROFILE,
  CLEAR_PROFILE,
  SET_PROFILE,
  SET_COOCKIE,
} from "../actions/auth";

const initialState = {
  name: "",
  email: "",
  password: "",
  coockie: "",
  isHidePassword: true,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COOCKIE: {
      return {
        ...state,
        coockie: action.payload,
      };
    }
    case SET_NAME_PROFILE: {
      return {
        ...state,
        name: action.payload,
      };
    }
    case SET_PROFILE: {
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
      };
    }
    case SET_EMAIL_PROFILE: {
      return {
        ...state,
        email: action.payload,
      };
    }

    case SET_PASSWORD_PROFILE: {
      return {
        ...state,
        password: action.payload,
      };
    }

    case CLEAR_PROFILE: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
