import { API_URL } from "../constants/constants";
import { TRegistration } from "../services/actions";
import { checkReponse } from "../utils/checkResponse";

export const registerUser = async (form:TRegistration) => {
  return await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }).then(checkReponse);
};
