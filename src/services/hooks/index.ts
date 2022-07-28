import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
  } from 'react-redux';
import { AppDispatch, RootState } from '../..';

  
  // Теперь этот хук «знает» структуру хранилища
  export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
  
  // Хук не даст отправить экшен, который ему не знаком
  export const useDispatch = () => dispatchHook<AppDispatch>(); 