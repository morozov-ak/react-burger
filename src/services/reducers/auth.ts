import { SET_AUTHENTICATED, SET_ISLOADED } from "../actions/auth";

export type TAuthStore = {
  cookie: string,
  isLoaded: boolean,
  isAuthenticated: boolean,
}

export type SetIsLoadedAction = { type: typeof SET_ISLOADED }
export type SetAuthenticatedAction = { type: typeof SET_AUTHENTICATED,payload:boolean }



export type Actions =
    | SetIsLoadedAction
    | SetAuthenticatedAction



const initialState = {
  cookie: "",
  isLoaded: false,
  isAuthenticated: false,
};

export const authReducer = (state:TAuthStore = initialState, action:Actions) => {
  switch (action.type) {
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
