import { Dispatch } from 'redux';
import { changeUserInfo } from "../../api/changeUserInfo";
import { getUserInfo } from "../../api/getUserInfo";
import { login } from "../../api/login";
import { logout } from "../../api/logout";
import { passwordChange } from "../../api/passwordChange";
import { passwordReset } from "../../api/passwordReset";
import { refreshCookie } from "../../api/refreshCookie";
import { registerUser } from "../../api/registerUser";
import { deleteCookie } from "../../utils/deleteCookie";
import { setCookie } from "../../utils/setCookie";
import { SET_ERROR } from "./bun";

export const SET_COOKIE = "SET_COOKIE";
export const SET_ISLOADED = "SET_ISLOADED";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const CLEAR_COOKIE = "CLEAR_COOKIE";

export const SET_EMAIL_LOGIN = "SET_EMAIL_LOGIN";
export const SET_PASSWORD_LOGIN = "SET_PASSWORD_LOGIN";
export const CLEAR_LOGIN = "CLEAR_LOGIN";
export const TOGGLE_PASSWORD_LOGIN = "TOGGLE_PASSWORD_LOGIN";

export const SET_NAME_REGISTRATION = "SET_NAME_REGISTRATION";
export const SET_EMAIL_REGISTRATION = "SET_EMAIL_REGISTRATION";
export const SET_PASSWORD_REGISTRATION = "SET_PASSWORD_REGISTRATION";
export const TOGGLE_PASSWORD_REGISTRATION = "TOGGLE_PASSWORD_REGISTRATION";
export const CLEAR_REGISTRATION = "CLEAR_REGISTRATION";

export const SET_PROFILE = "SET_PROFILE";
export const SET_NAME_PROFILE = "SET_NAME_PROFILE";
export const SET_EMAIL_PROFILE = "SET_EMAIL_PROFILE";
export const SET_PASSWORD_PROFILE = "SET_PASSWORD_PROFILE";
export const TOGGLE_PASSWORD_PROFILE = "TOGGLE_PASSWORD_PROFILE";
export const RESET_PROFILE = "RESET_PROFILE";
export const CLEAR_PROFILE = "CLEAR_PROFILE";

export const SET_CODE_RESET = "SET_CODE_RESET";
export const SET_IS_RESETED = "SET_IS_RESETED";
export const SET_PASSWORD_RESET = "SET_PASSWORD_RESET";
export const CLEAR_RESET = "CLEAR_RESET";
export const TOGGLE_PASSWORD_RESET = "TOGGLE_PASSWORD_RESET";

export const SET_EMAIL_FORGOT = "SET_EMAIL_FORGOT";
export const CLEAR_FORGOT = "CLEAR_FORGOT";

export type TChangePassword = {
  password: string,
  token: string,
}
export type TLogin = {
  password: string,
  email: string,
}
export type TRegistration = TLogin & {
  name: string,
}
export type TChangeProfile = {
  name: string,
  password?: string,
  email: string,
}

export function initialReducer() {
  return async (dispatch: Dispatch) => {
    const token = localStorage.getItem("refreshToken");
    if (token) {
      getUserInfo()
        .then((res) => {
          if (res.success) {
            dispatch({ type: SET_AUTHENTICATED, payload: true });
            dispatch({ type: SET_ISLOADED });
          }
        })
        .catch((e) => {
          if (!e.success) {
            refreshCookie()
              .then((res) => {
                if (res.success) {
                  const cookie = res.accessToken.split("Bearer ")[1];
                  deleteCookie("accessToken");
                  setCookie("accessToken", cookie);
                  localStorage.setItem("refreshToken", res.refreshToken);
                  dispatch({ type: SET_COOKIE, payload: cookie });
                  dispatch({ type: SET_AUTHENTICATED, payload: true });
                  dispatch({ type: SET_ISLOADED });
                } else {
                  dispatch({
                    type: SET_ERROR,
                    error: "Ошибка выполнения запроса",
                  });
                  dispatch({ type: SET_ISLOADED });
                }
              })
              .catch((e) => {
                deleteCookie("accessToken");
                localStorage.removeItem("refreshToken");
                dispatch({ type: SET_ISLOADED });
              });
          }
        });
    } else {
      dispatch({ type: SET_ISLOADED });
    }
  };
}
export function resetPasswordReducer(email:string, cb:()=> void) {
  return async (dispatch: Dispatch) => {
    try {
      const res = await passwordReset(email);
      if (res.success) {
        dispatch({ type: SET_IS_RESETED });
        cb();
      } else {
        dispatch({ type: SET_ERROR, error: "Ошибка выполнения запроса" });
      }
    } catch (e) {
      dispatch({ type: SET_ERROR, error: "Ошибка выполнения запроса" });
    }
  };
}

export function changePasswordReducer(form:TChangePassword, cb:()=> void) {
  return async (dispatch: Dispatch) => {
    try {
      const res = await passwordChange(form);
      if (res.success) {
        dispatch({ type: CLEAR_FORGOT });
        cb();
      } else {
        dispatch({ type: SET_ERROR, error: "Ошибка выполнения запроса" });
      }
    } catch (e) {
      dispatch({ type: SET_ERROR, error: "Ошибка выполнения запроса" });
    }
  };
}

export function loginReducer(form:TLogin) {
  return async (dispatch: Dispatch) => {
    try {
      const res = await login(form);
      if (res.success) {
        const cookie = res.accessToken.split("Bearer ")[1];
        dispatch({ type: CLEAR_LOGIN });
        dispatch({ type: SET_AUTHENTICATED, payload: true });
        dispatch({ type: SET_ISLOADED, payload: true });
        setCookie("accessToken", cookie);
        localStorage.setItem("refreshToken", res.refreshToken);
      } else {
        dispatch({ type: SET_ERROR, error: "Ошибка выполнения запроса" });
      }
    } catch (e) {
      dispatch({ type: SET_ERROR, error: "Ошибка выполнения запроса" });
    }
  };
}

export function registerUserReducer(form:TRegistration) {
  return async (dispatch: Dispatch) => {
    try {
      const res = await registerUser(form);
      if (res.success) {
        dispatch({ type: CLEAR_REGISTRATION });
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        localStorage.setItem("refreshToken", res.refreshToken);
      } else {
        dispatch({ type: SET_ERROR, error: "Ошибка выполнения запроса" });
      }
    } catch (e) {
      dispatch({ type: SET_ERROR, error: "Ошибка выполнения запроса" });
    }
  };
}

export function refreshCookieReducer() {
  return async (dispatch: Dispatch) => {
    try {
      const res = await refreshCookie();
      if (res.success) {
        const cookie = res.accessToken.split("Bearer ")[1];
        setCookie("accessToken", cookie);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({ type: SET_COOKIE, payload: cookie });
      } else {
        dispatch({ type: SET_ERROR, error: "Ошибка выполнения запроса" });
      }
    } catch (e:any) {
      if (e.message === "Token is invalid") {
        deleteCookie("accessToken");
        localStorage.removeItem("refreshToken");
      }
      dispatch({ type: SET_ERROR, error: "Ошибка выполнения запроса" });
    }
  };
}

export function getUserInfoReducer() {
  return async (dispatch: Dispatch) => {
    try {
      const res = await getUserInfo();
      if (res.success) {
        dispatch({ type: SET_PROFILE, payload: res.user });
      } else {
        dispatch({ type: SET_ERROR, error: "Ошибка выполнения запроса" });
      }
    } catch (e) {
      dispatch({ type: SET_ERROR, error: "Ошибка выполнения запроса" });
    }
  };
}

export function changeUserInfoReducer(field:TChangeProfile) {
  return async (dispatch: Dispatch) => {
    try {
      const res = await changeUserInfo(field);
      dispatch({ type: SET_PROFILE, payload: res.user });
    } catch (e) {
      dispatch({ type: SET_ERROR, error: "Ошибка выполнения запроса" });
    }
  };
}

export function logoutReducer() {
  return async (dispatch: Dispatch) => {
    try {
      await logout();
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: CLEAR_FORGOT });
      dispatch({ type: SET_AUTHENTICATED, payload: false });
      deleteCookie("accessToken");
      localStorage.removeItem("refreshToken");
    } catch (e) {
      dispatch({ type: SET_ERROR, error: "Ошибка выполнения запроса" });
    }
  };
}
