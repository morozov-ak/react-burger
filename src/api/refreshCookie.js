import { API_URL } from "../constants/constants";
import { checkReponse } from "../utils/checkResponse";

export const refreshCookie = async () => {
  return await fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkReponse);
};
