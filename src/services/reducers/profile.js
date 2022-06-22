import {
  SET_NAME_PROFILE,
  SET_EMAIL_PROFILE,
  SET_PASSWORD_PROFILE,
  CLEAR_PROFILE,
  SET_PROFILE,
  RESET_PROFILE,
} from "../actions/auth";

const initialState = {
  isChanged: false,
  nameOld: "",
  emailOld: "",
  name: "",
  email: "",
  password: "",
  isHidePassword: true,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME_PROFILE: {
      return {
        ...state,
        name: action.payload,
        isChanged: true,
      };
    }

    case SET_PROFILE: {
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        nameOld: action.payload.name,
        emailOld: action.payload.email,
      };
    }

    case SET_EMAIL_PROFILE: {
      return {
        ...state,
        email: action.payload,
        isChanged: true,
      };
    }

    case SET_PASSWORD_PROFILE: {
      return {
        ...state,
        password: action.payload,
        isChanged: true,
      };
    }

    case RESET_PROFILE: {
      return {
        ...state,
        name: state.nameOld,
        email: state.emailOld,
        password: "",
        isChanged: false,
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
