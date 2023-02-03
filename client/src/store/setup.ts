import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { cartReducer, clientInfoReducer } from './slices/';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { productApi } from './api/product';

const store = configureStore({
  reducer: combineReducers({
    cart: cartReducer,
    clientInfo: clientInfoReducer,
    [productApi.reducerPath]: productApi.reducer,
  }),
  devTools: !!import.meta.env.DEV,
  //used the type `any` for getDefaults because typescript is breaking the inferring process
  middleware: (getDefaults: any) => getDefaults().concat(productApi.middleware),
});

setupListeners(store.dispatch);
type StoreState = ReturnType<typeof store.getState>;
const useTypedSelector: TypedUseSelectorHook<StoreState> = useSelector;
export { store, useTypedSelector };
export type { StoreState };
