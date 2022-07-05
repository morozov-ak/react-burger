import { API_URL } from "../constants/constants";
import { checkReponse } from "../utils/checkResponse";

export const passwordReset = async (mail) => {
  return await fetch(`${API_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: mail }),
  }).then(checkReponse);
};
