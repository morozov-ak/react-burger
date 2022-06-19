import { API_URL } from "../constants/constants";
import { checkReponse } from "../utils/checkResponse";
import { getCookie } from "../utils/getCoockie";

export const changeUserInfo = async (field) => {
  console.log(field);
  return await fetch(`${API_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify(field),
  }).then(checkReponse);
};
