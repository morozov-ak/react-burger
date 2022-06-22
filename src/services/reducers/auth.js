import { SET_COOKIE, SET_AUTHENTICATED, SET_ISLOADED } from "../actions/auth";

const initialState = {
  cookie: "",
  isLoaded: false,
  isAuthenticated: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SET_COOKIE: {
    //   return {
    //     ...state,
    //     isAuthenticated: action.payload,
    //   };
    // }

    case SET_ISLOADED: {
      return {
        ...state,
        isLoaded: true,
      };
    }

    case SET_AUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
