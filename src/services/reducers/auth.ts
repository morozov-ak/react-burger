import { SET_AUTHENTICATED, SET_ISLOADED } from "../actions/auth";

export type TAuthStore = {
  isLoaded: boolean,
  isAuthenticated: boolean,
}

export type SetIsLoadedAction = { type: typeof SET_ISLOADED }
export type SetAuthenticatedAction = { type: typeof SET_AUTHENTICATED,payload:boolean }



export type AuthActions =
    | SetIsLoadedAction
    | SetAuthenticatedAction



const initialState = {
  isLoaded: false,
  isAuthenticated: false,
};

export const authReducer = (state:TAuthStore = initialState, action:AuthActions) => {
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
