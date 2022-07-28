import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_SEND_MESSAGE, WS_START_WITH_CUSTOM_URL } from "../actions/ws";

export type WsInitAction = { type: typeof WS_CONNECTION_START ,payload:string}
export type wsInitCustomAction = { type: typeof WS_START_WITH_CUSTOM_URL ,payload:string}
export type wsSendMessageAction = { type: typeof WS_SEND_MESSAGE ,payload:string}
export type onOpenAction = { type: typeof WS_CONNECTION_SUCCESS ,payload:string}
export type onCloseAction = { type: typeof WS_CONNECTION_CLOSED ,payload:string}
export type onErrorAction = { type: typeof WS_CONNECTION_ERROR ,payload:string}
export type onMessageAction = { type: typeof WS_GET_MESSAGE ,payload:TWsOrdersState}

export type Actions =
    | WsInitAction 
    | wsInitCustomAction 
    | wsSendMessageAction
    | onOpenAction
    | onCloseAction
    | onErrorAction
    | onMessageAction

export type TModifiedIngredient = {
  id: string;
  img: string;
  name: string;
  price: number;
  qty: number;
};

export type TOrder = {
  _id: string;
  status: string | "pending" | "done";
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
  price?: number;
  modifiedIngredients?: TModifiedIngredient[];
};

export type TWsOrdersState = {
  orders: TOrder[] ;
  ordersById: {[key: string]: TOrder};
  total: number | undefined;
  totalToday: number | undefined;
}

export const initialState: TWsOrdersState = {
  orders: [],
  ordersById: {},
  total: undefined,
  totalToday: undefined,
};


export const wsOrdersReducer = (state:TWsOrdersState = initialState, action:Actions) => {
    switch (action.type) {
      case WS_CONNECTION_START: {
        return {
          ...state,
          code: action.payload,
        };
      }

      case WS_GET_MESSAGE: {
        return {
          ...state,
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
          ordersById: action.payload?.orders.reduce(
            (prev, order) => {return {...prev, [order._id]:order}}
            , {} as TOrder
            )
        };
      }

      case WS_CONNECTION_CLOSED: {
        return initialState;
      }
  
      
  
      default: {
        return state;
      }
    }
  };
