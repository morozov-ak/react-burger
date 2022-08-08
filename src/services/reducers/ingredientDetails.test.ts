import { CLOSE_NUTRITIONS_MODAL, OPEN_NUTRITIONS_MODAL } from '../actions';
import { ingredientDetailsReducer, TIngredientDetailsStore } from './ingredientDetails';

describe('ingredient detailsx reducer', () => {
  const initialState:TIngredientDetailsStore = {
    showedIngredientId: "",
  };

  it('should return the initial state', () => {
    expect(ingredientDetailsReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should open modal', () => {
    const expected = {
      showedIngredientId: "qwerty",
    }

    const action = {type: OPEN_NUTRITIONS_MODAL, showedIngredientId:'qwerty'}

    expect(ingredientDetailsReducer(initialState as any, action as any)).toEqual(expected)
  })

  it('should close modal', () => {
    const state = {
      showedIngredientId: "qwerty",
    }

    const action = {type: CLOSE_NUTRITIONS_MODAL, showedIngredientId:'qwerty'}

    expect(ingredientDetailsReducer(state as any, action as any)).toEqual(initialState)
  })
})