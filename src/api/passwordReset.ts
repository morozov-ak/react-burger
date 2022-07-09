import { API_URL } from "../constants/constants";
import { checkReponse } from "../utils/checkResponse";

export const passwordReset = async (email:string) => {
  return await fetch(`${API_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  }).then(checkReponse);
};
