import { ADD_INGREDIENT, MOVE_INGREDIENT, REMOVE_INGREDIENT } from '../actions';
import { burgerConstructorReducer, TBurgerConstructor } from "./burgerConstructor";

const SpaceSauce = {
    _id: '60d3b41abdacab0026a733cd',
    name: 'Соус фирменный Space Sauce',
    type: 'sauce',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
    __v: 0,
    uid: 1659808041278
  }

  const SpicyX = {
    _id: '60d3b41abdacab0026a733cc',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0,
    uid: 1659808042698
  }

  const Galaxy = {
    _id: '60d3b41abdacab0026a733ce',
    name: 'Соус традиционный галактический',
    type: 'sauce',
    proteins: 42,
    fat: 24,
    carbohydrates: 42,
    calories: 99,
    price: 15,
    image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
    __v: 0,
    uid: 1659810971831
  }

describe('burger constructor reducer', () => {
  const initialState: TBurgerConstructor = {
    bun: undefined,
    filling: [],
    fillingIds: [],
    bunId: [],
  };

  it('should return the initial state', () => {
    expect(burgerConstructorReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should add ingredient', () => {
    const expected = {
        ...initialState,
        filling: [
            SpaceSauce
          ],    
          fillingIds: [
            '60d3b41abdacab0026a733cd'
          ],
    }

    const action = {type: ADD_INGREDIENT, item:SpaceSauce}

    expect(burgerConstructorReducer(initialState as any, action as any)).toEqual(expected)
  })

  it('should remove ingredient', () => {
    const state = {
        ...initialState,
        filling: [
            SpaceSauce,
            SpicyX,
            Galaxy
          ],    
          fillingIds: [
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cc',
            '60d3b41abdacab0026a733ce'
          ],
    }

    const expected = {
        ...initialState,
        filling: [
            SpaceSauce,
            Galaxy
          ],    
          fillingIds: [
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733ce'
          ],
    }

    const action = {type: REMOVE_INGREDIENT, payload:SpicyX}

    expect(burgerConstructorReducer(state as any, action as any)).toEqual(expected)
  })

  it('should move ingredient', () => {
    const state = {
        ...initialState,
        filling: [
            SpaceSauce,
            SpicyX
          ],    
          fillingIds: [
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cc'
          ],
    }

    const expected = {
        ...initialState,
        filling: [
            SpicyX,
            SpaceSauce,
          ],    
          fillingIds: [
            '60d3b41abdacab0026a733cd',
            '60d3b41abdacab0026a733cc'
          ],
    }

    const action = {type: MOVE_INGREDIENT, sourceItem:SpicyX, targetItem:SpaceSauce}

    expect(burgerConstructorReducer(state as any, action as any)).toEqual(expected)
  })
})