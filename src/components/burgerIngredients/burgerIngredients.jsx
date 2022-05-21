import { Logo, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo, useState } from 'react';
import styles from './burgerIngredients.module.css'
import PropTypes from 'prop-types';
import { ingredient } from '../../types';
import BurgerIngredient from '../burgerIngredient/burgerIngredient';

function BurgerIngredients({ingredients}) {
  const [current, setCurrent] = useState('bun');


  const handleChangeTab = (e) => {
    const scrolledElement = document.getElementById(e)
    setCurrent(e)
    scrolledElement.scrollIntoView({block: "start", behavior: "smooth"});
  }

  const ingredientsByCategories = useMemo(()=>{
    return ingredients.reduce((acc, ingredient)=>{
      return {...acc, [ingredient.type]:[...acc[ingredient.type], ingredient]}
    },{bun:[],main:[],sauce:[]})
  },[ingredients])

  return (
      <section className={`${styles.ingredients}`}>
        <nav className={styles.ingredient_tabs}>
          <Tab value="bun" active={current === 'bun'} onClick={handleChangeTab}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={handleChangeTab}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={handleChangeTab}>
            Начинки
          </Tab>
        </nav>
        {
          ingredients.length === 0 ? 
          <div className={`${styles.loader}`}>
            <Logo/>
          </div>
           :
          <main className={`custom-scroll ${styles.scroll}`}> 
            <p id='bun' className="text text_type_main-medium mt-10 mb-6" >Булки</p>
            <div className={`pl-4 ${styles.ingredients_wrapper}`}>
              {ingredientsByCategories.bun.map((ingredient)=><BurgerIngredient key={ingredient._id} ingredient={ingredient} count={Math.floor(Math.random() * 5)}/>)}
            </div>
            <p id='sauce' className="text text_type_main-medium mt-10 mb-6" >Соусы</p>
            <div className={`pl-4 ${styles.ingredients_wrapper}`}>
              {ingredientsByCategories.sauce.map((ingredient)=><BurgerIngredient key={ingredient._id} ingredient={ingredient} count={Math.floor(Math.random() * 5)}/>)}
            </div>
            <p id='main' className="text text_type_main-medium mt-10 mb-6" >Начинки</p>
            <div className={`pl-4 ${styles.ingredients_wrapper}`}>
              {ingredientsByCategories.main.map((ingredient)=><BurgerIngredient key={ingredient._id} ingredient={ingredient} count={Math.floor(Math.random() * 5)}/>)}
            </div>

          </main>
        }
      </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredient)
}

export default BurgerIngredients;
