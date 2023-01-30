import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { cartReducer } from './slices/';

const store = configureStore({
  reducer: combineReducers({ cart: cartReducer }),
});

type StoreState = ReturnType<typeof store.getState>;

const useTypedSelector: TypedUseSelectorHook<StoreState> = useSelector;
export { store, useTypedSelector };
export type { StoreState };
