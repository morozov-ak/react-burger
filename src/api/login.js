import { API_URL } from "../constants/constants";
import { checkReponse } from "../utils/checkResponse";

export const login = async (form) => {
  return await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }).then(checkReponse);
};
