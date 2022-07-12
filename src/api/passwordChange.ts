import { API_URL } from "../constants/constants";
import { TChangePassword } from "../services/actions";
import { checkReponse } from "../utils/checkResponse";

export const passwordChange = async (form:TChangePassword) => {
  return await fetch(`${API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }).then(checkReponse);
};
