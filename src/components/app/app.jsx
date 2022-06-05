import React, { useEffect } from 'react';
import NavigationPanel from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import styles from './app.module.css'
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIngredientsReducer } from '../../services/actions/bun';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {

  const ingredients = useSelector(state => state.bun.ingredients);
  const error = useSelector(state => state.bun.error);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchIngredientsReducer())
  },[dispatch])

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
      <DndProvider backend={HTML5Backend}>
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
      </DndProvider>
    </main>
  );
}

export default App;
