import React, { useEffect, useState } from 'react';
import NavigationPanel from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import styles from './app.module.css'
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import { fetchIngredients } from '../../api/fetchIngredients';

function App() {

  const [ingredients, setIngredients] = useState([])
  const [error, setError] = useState('')

  useEffect(()=>{
    fetchIngredients({setIngredients,setError})
  },[])

  useEffect(
    ()=>{
      if(error){
        alert(error)
      }
    }
    ,[error]
  )

  return (
    <main className={styles.app}>
      <NavigationPanel/>
      <section className={styles.content}>
        <p className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </p> 
        <div className={styles.constructor_wrapper}>
          <BurgerIngredients ingredients={ingredients}/>
          <BurgerConstructor ingredients={ingredients}/>
        </div>
      </section>
      <div id='modal'/>
    </main>
  );
}

export default App;
