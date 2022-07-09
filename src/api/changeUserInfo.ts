import { API_URL } from "../constants/constants";
import { TChangeProfile } from "../services/actions";
import { checkReponse } from "../utils/checkResponse";
import { getCookie } from "../utils/getCookie";

export const changeUserInfo = async (fields: TChangeProfile) => {
  return await fetch(`${API_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify(fields),
  }).then(checkReponse);
};
