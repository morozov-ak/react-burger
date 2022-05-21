export const fetchIngredients = ({setIngredients}) => {
    fetch('https://norma.nomoreparties.space/api/ingredients')
    .then(res=>res.json())
    .then(res=>setIngredients(res.data))
    .catch(error=>{console.log(error)})
}