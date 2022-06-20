import { API_URL } from "../constants/constants";
import { checkReponse } from "../utils/checkResponse";
import { getCookie } from "../utils/getCookie";

export const postOrder = async (ingredientsArray) => {
  return await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({ ingredients: ingredientsArray }),
  }).then(checkReponse);
};
