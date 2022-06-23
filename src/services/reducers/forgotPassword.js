import { CLEAR_FORGOT, SET_EMAIL_FORGOT } from "../actions/auth";

const initialState = {
  email: "",
};

export const resetPasswordReducer = (state = initialState, action) => {
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
