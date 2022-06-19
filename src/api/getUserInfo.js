import { API_URL } from "../constants/constants";
import { checkReponse } from "../utils/checkResponse";
import { getCookie } from "../utils/getCoockie";

export const getUserInfo = async (form) => {
  return await fetch(`${API_URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify(form),
  }).then(checkReponse);
};
