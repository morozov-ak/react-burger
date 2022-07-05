import { API_URL } from "../constants/constants";
import { checkReponse } from "../utils/checkResponse";
import { getCookie } from "../utils/getCookie";

export const getUserInfo = async () => {
  return await fetch(`${API_URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  }).then(checkReponse);
};
