import { API_URL } from "../constants/constants";
import { checkReponse } from "../utils/checkResponse";

export const fetchIngredients = async () => {
  return await fetch(`${API_URL}/ingredients`).then(checkReponse);
};
