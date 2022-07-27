import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/index';
import thunk from 'redux-thunk';
import { BrowserRouter as Router} from "react-router-dom";
import { socketMiddleware } from './services/middleware/socketMiddleware';
import { wsActions } from './services/actions/ws';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

let composeEnhancers = null;
if (process.env.NODE_ENV === 'development') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
    composeEnhancers = compose;
}

const enhancer = composeEnhancers(applyMiddleware(thunk,socketMiddleware(
  "wss://norma.nomoreparties.space/orders/all",
  wsActions
)));

const store = createStore(rootReducer, enhancer);


root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
    
);

reportWebVitals();
