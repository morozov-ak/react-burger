import { API_URL } from "../constants/constants"
import { checkReponse } from "../utils/checkResponse"

export const fetchIngredients = ({setIngredients,setError}) => {
    fetch(`${API_URL}/ingredients`)
    .then(checkReponse)
    .then(res => setIngredients(res.data))
    .catch(error => setError('Ошибка выполнения запроса'))
}