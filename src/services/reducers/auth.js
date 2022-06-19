import { SET_COOKIE, SET_AUTHENTICATED } from "../actions/auth";

const initialState = {
  name: "",
  email: "",
  password: "",
  cookie: "",
  isHidePassword: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COOKIE: {
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    }

    case SET_AUTHENTICATED: {
      return {
        ...state,
        cookie: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
