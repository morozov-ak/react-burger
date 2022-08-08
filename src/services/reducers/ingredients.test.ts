import { TIngredient } from '../../types/types';
import {  FETCH_INGREDIENTS } from '../actions';
import { ingredientReducer } from './ingredients';
import { ingredients, ingredientsById } from './mocks';

describe('ingredients reducer', () => {
  const initialState = {
    ingredients: [] as Array<TIngredient>,
    ingredientsById: {} as {[key: string]: TIngredient},
  };

  it('should return the initial state', () => {
    expect(ingredientReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should set ingredients', () => {
    const expected = {
      ingredients: ingredients,
      ingredientsById:ingredientsById
    }

    const action = {type: FETCH_INGREDIENTS, payload:ingredients}

    expect(ingredientReducer(initialState as any, action as any)).toEqual(expected)
  })
})